import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  addSelectedProducts,
} from "../../actions/Index";
import ProductListItem from "./ProductListItem";
import Loader from "../../effects/loader/Loader";

var category = null;
var mounted = null;

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 6,
      page: 1, //  Page will indicate the index of groups of 6 products
      collection: [], // Here all the products are going to be stored in pages
      hasMoreItems: true,
      category: null,
      productsToShow: null,
    };
    this.goToPage = this.goToPage.bind(this);
  }

  componentWillUnmount() {
    mounted = null;
  }

  componentWillMount() {
    mounted = true;
    var products = null;
    if (this.props.state.data.products.length > 0) {
      products = this.props.state.data.products;
      var collection = [];

      if (products.length > 6) {
        const len = products.length;
        const numberOfPages = len / 6;
        for (var i; i <= numberOfPages; i++) {
          var extractedPage = products.splice(0, 6);
          collection.push(extractedPage);
        }
      }
      this.setState(() => {
        return { productsToShow: products, collection: collection, page: 1 };
      });
    }
  }

  componentDidUpdate() {
    if (mounted) {
      if (this.props.category !== this.state.category) {
        category = this.props.category;
        this.setState(() => {
          return { category: category };
        });
      }
    }
    if (
      !this.state.productsToShow ||
      this.state.productsToShow !== this.props.state.data.products
    ) {
      if (this.props.state.data.products.length > 0) {
        var products = this.props.state.data.products;
        var collection = [];

        if (products.length > 6) {
          const len = products.length;
          const numberOfPages = Math.ceil(len / 6);

          for (var i = 0; i <= numberOfPages; i++) {
            if (products.length > 0) {
              var extractedPage = products.splice(0, 6);
              collection.push(extractedPage);
            }
          }
        }
        if (products.length === 0) {
          products = collection[0];
        }

        this.setState(() => {
          return { productsToShow: products, collection: collection, page: 1 };
        });
      }
    }
  }
  goToPage(e) {
    var page_to = parseInt(e.currentTarget.id);
    var productsToShow = this.state.collection[page_to - 1];
    window.scrollTo(0, 0);
    this.setState(() => {
      return { productsToShow: productsToShow, page: page_to - 1 };
    });
  }

  render() {
    const { addToCart, symbol, addToWishlist } = this.props;
    var theProducts = null;
    const collection = this.state.collection;

    if (this.state.productsToShow) {
      if (this.state.productsToShow.length > 0) {
        theProducts = this.state.productsToShow;
      }
    }

    if (theProducts) {
      if (theProducts.length > 0) {
        return (
          <div className="c-collection__product-list">
            {" "}
            {theProducts.length > 0
              ? theProducts
                  .slice(0, this.state.limit)
                  .map((product, index) => (
                    <ProductListItem
                      product={product}
                      symbol={symbol}
                      onAddToCompareClicked={() => addToCompare(product)}
                      onAddToWishlistClicked={() => addToWishlist(product)}
                      onAddToCartClicked={addToCart}
                      key={index}
                    />
                  ))
              : null}
            <div className="index">
              {collection.length > 1
                ? collection.map((p, index) => {
                    var page = this.state.page;

                    if (page === index + 1) {
                      return (
                        <button
                          className="invisible-button Label current-page"
                          key={index + 1}
                          id={index + 1}
                          onClick={this.goToPage}
                        >
                          {index + 1}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className="invisible-button Label"
                          key={index + 1}
                          id={index + 1}
                          onClick={this.goToPage}
                        >
                          {index + 1}
                        </button>
                      );
                    }
                  })
                : null}
            </div>
          </div>
        );
      }
    } else {
      return <Loader />;
    }
  }
}
const mapStateToProps = (state) => {
  var products = null;
  if (state.data.products.length > 0) {
    products = state.data.products;
  }

  return {
    products,
    state,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  addToWishlist,
  addToCompare,
  addSelectedProducts,
})(withTranslate(ProductListing));
