import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../actions/Index";
import ProductListing from "./ProductListing";
import PathAnimated from "../../layout/PathAnimated";
import LittleHeart from "../../icons/LittleHeart";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      categories: null,
      productsToShow: [],
      requesting: null,
    };
    this.checkProps = this.checkProps.bind(this);
  }

  componentWillUnmount() {
    this.setState(() => {
      return {
        category: null,
        categories: null,
        productsToShow: [],
      };
    });
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  checkProps() {
    if (this.props.location.category !== undefined) {
      if (this.props.location.category !== this.state.category) {
        const category = this.props.location.category;
        var categoryName = null;
        var type = category.type;
        if (type === "number") {
          this.props.state.data2.categorieTree.forEach((c) => {
            if (c.id === category) {
              categoryName = c.name;
            }
          });
        } else if (type === undefined) {
          type = typeof category;

          if (type === "number") {
            this.props.state.data2.categoryTree.forEach((c) => {
              if (c.id === category) {
                categoryName = c.name;
              }
            });
          }
        }
        // Tools.category = 81
        // Pieces.category = 56
        var categoryId = null;
        if (category === "tools") {
          categoryId = 81;
        } else if (category === "pieces") {
          categoryId = 56;
        } else {
          categoryId = category;
        }
        this.props.getProducts(categoryId);
        this.setState(() => {
          return {
            category: category,
            categoryName: categoryName,
            requesting: true,
          };
        });
        //  this.setState({...category});
      }
    } else {
      if (this.props.state.data3.productsToShow) {
        if (this.props.state.data3.productsToShow.length) {
          if (this.props.state.data3.productsToShow.length > 1) {
            const items = this.props.state.data3.productsToShow;
            var category = null;
            var categories = [];

            if (items.length > 0) {
              if (items !== this.state.productsToShow) {
                items[0].categories.map((c) => {
                  if (!category) {
                    return (category = c.name);
                  }
                  return categories.push(c);
                });
                this.setState(() => {
                  return {
                    productsToShow: items,
                    category: category,
                    categories: categories,
                    requesting: null,
                  };
                });
              }
            }
          }
        }
      } // Don't allow the page to stay empty if an error happens and there is not
      // any product expected.
      if (!this.state.requesting) {
        if (!this.state.category && !this.state.categoryName) {
          this.props.getProducts("56");
          this.setState(() => {
            return {
              requesting: true,
            };
          });
        }
      }
    }
  }

  render() {
    const categoryName = this.state.categoryName;
    const category = this.state.category;

    return (
      <section className="c-collection">
        <PathAnimated />
        <LittleHeart />
        <h1 className="h2-didot-reg">
          {categoryName ? categoryName : category}
        </h1>
        <ProductListing
          colSize={this.state.layoutColumns}
          category={this.state.category}
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps, { getProducts })(Collection);
