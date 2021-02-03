import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { changeCurrency, searchProduct, logout } from "../actions/Index";
import Input from "../effects/input/Input";
import SearchIcon from "../icons/Search";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productId: null,
    };
  }

  componentDidUpdate() {
    // this.parseProps(); // Avoids parsing the props each time it updates if isnt needed
    if (this.props.state.data) {
      const data = this.props.state.data;

      // Find out if there is any product in the search and navigate to it if it's one.
      if (data.product_details === "notFound") {
      } else if (data.product_details.length > 0) {
        if (
          data.product_details.name
            .toUpperCase()
            .includes(this.state.productName.toUpperCase())
        ) {
          if (this.state.productId !== data.product_details.id) {
            this.setState(() => {
              return { productId: data.product_details.id };
            });
            document.querySelector(".menu-search").classList.remove("visible");
            this.props.history.push(
              `${process.env.PUBLIC_URL}/product/${data.product_details.id}`
            );
          }
        }
      }
    }
  }

  handleChange = (e) => {
    if (e.target.value) {
      if (e.target.value) {
        const name = e.target.value;
        this.setState(() => {
          return { productName: name };
        });
      }
    } else {
      this.setState(() => {
        return { productName: "" };
      });
    }
  };

  handleSubmit = () => {
    if (this.state.productName) {
      return this.props.searchProduct(this.state.productName);
    }
  };

  render() {
    const { translate } = this.props;

    return (
      <section className="c-search">
        <form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            id="productName"
            name="productName"
            label="Search a Product"
            value={this.state.productName}
            handleChange={this.handleChange}
          />
          <a href="#" type="submit" onClick={this.handleSubmit}>
            <SearchIcon />
          </a>
        </form>
      </section>
    );
  }
}

//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {
  changeCurrency,
  logout,
  searchProduct,
})(withTranslate(withRouter(Search)));
