import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { withTranslate } from "react-redux-multilingual";

import {
  addToCart,
  addToWishlist,
  addToCompare,
  addSelectedProducts,
} from "../../actions/Index";

import { getVisibleproducts } from "../../services/index";
import ProductListItem from "./ProductListItem";

var category = null;
var mounted = null;

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      hasMoreItems: true,
      category: null,
      productsToShow: null,
    };
  }

  componentWillUnmount() {
    mounted = null;
  }

  componentWillMount() {
    mounted = true;
    if (this.props.category !== this.state.category) {
      category = this.props.category;
      this.setState(() => {
        return { category: category };
      });
      this.fetchSameCategoryProducts();
    }
    var products = null;

    if (this.props.data3.productsToShow) {
      if (this.props.data3.productsToShow.length > 0) {
        products = this.props.data3.productsToShow;
      } else {
        products = this.props.products;
      }
    } else {
      products = this.props.products;
    }

    this.fetchMoreItems(products);
  }

  componentDidUpdate() {
    if (mounted) {
      if (this.props.category !== this.state.category) {
        category = this.props.category;
        this.setState(() => {
          return { category: category };
        });
        this.fetchSameCategoryProducts();
      }
    }

    if (this.props.data3.productsToShow !== this.state.productsToShow) {
      this.setState(() => {
        return { productsToShow: this.props.data3.productsToShow };
      });
    }
  }

  fetchSameCategoryProducts = () => {
    if (mounted) {
      if (this.props.category !== this.state.category) {
        category = this.props.category;

        this.setState(() => {
          return { category: category };
        });

        var productsToShow = [];
        var products = this.props.products[0];
        if (this.props.products[1].length > 0) {
          products = this.props.products[0];
        }
        products.map((product) => {
          product.categories.map((productCategory) => {
            if (productCategory.name === category) {
              productsToShow.push(product);
            }
            return null;
          });
          return null;
        });
      }
      if (this.state.productsToShow !== productsToShow) {
        this.setState(() => {
          return { productsToShow: productsToShow };
        });
        this.props.addSelectedProducts(productsToShow);
      }
      category = this.props.category;
    }
  };

  countDone = (products) => {
    if (mounted) {
      this.setState(() => {
        return { limit: this.state.limit + 5 };
      });
      if (this.state.limit >= products[0].length) {
        this.setState({ hasMoreItems: false });
      }
    }
  };

  fetchMoreItems = (products) => {
    if (mounted) {
      // a fake async api call
      setTimeout(() => {
        this.countDone(products);
      }, 3000);
    }
  };

  render() {
    const {
      products,
      addToCart,
      symbol,
      addToWishlist,
      translate,
    } = this.props;

    var theProducts = products[0];
    if (this.state.productsToShow) {
      theProducts = this.state.productsToShow;
    }
    if (products[1].length > 0) {
      theProducts = products[1];
    }

    if (category) {
      if (mounted) {
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
          </div>
        );
      }
    } else {
      return <h6>Loading</h6>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    products: getVisibleproducts(
      state.data,
      state.filters,
      state.data2,
      state.data3
    ),
    data2: state.data2,
    data3: state.data3,
    symbol: state.data.symbol,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  addToWishlist,
  addToCompare,
  addSelectedProducts,
})(withTranslate(ProductListing));
