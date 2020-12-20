import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProducts } from "../../actions/Index";
import ProductListing from "./ProductListing";
import BlankHeart from "../../icons/BlankHeart";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      categories: null,
      productsToShow: [],
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
        this.setState(() => {
          return { category: category };
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
                  };
                });
              }
            }
          }
        }
      }
    }
  }

  render() {
    var title = this.state.category;

    return (
      <section className="c-collection">
        <h1 className="c-collection__header">{this.state.category}</h1>
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

export default connect(mapStateToProps, { getAllProducts })(Collection);
