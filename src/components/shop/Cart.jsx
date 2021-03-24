import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withTranslate } from "react-redux-multilingual";
import { getCartTotal } from "../../services";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../../actions/Index";
import Empty from "./common/Empty";
import StepIndex from "./common/StepIndex";
import LayoutBackground from "../../icons/LayoutBackground";
import ButtonNew from "../../components/ButtonNew";
import ButtonNewLight from "../ButtonNewLightBack";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goBack = this.goBack.bind(this);
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { symbol, total, translate } = this.props;
    var item = {
      id: "2",
      stock: "12",
      qty: "13",
      sum: " 12",
      pictures: [``],
      name: "Lady Yurta",
      category: "Pieces",
      price: "23",
    };

    var cartItems = [item, item, item, item];

    cartItems = this.props.cartItems;

    var productsToShow = [];
    if (this.props.state.data.products.length > 1) {
      var products = this.props.state.data.products;
      for (var i = 0; i <= 4; i++) {
        productsToShow.push(products[i]);
      }
    }
    return (
      <div>
        {cartItems.length > 0 && translate !== undefined ? (
          <section className="c-cart">
            <LayoutBackground />

            <h1 className="h2-didot-reg">{translate("shopping_cart")}</h1>
            <StepIndex index="1" />
            <div className="c-cart__table b-layout-card">
              <h5 className="h5-didot-reg">Cart Details</h5>
              <div className="table-head">
                <h4 className="label">{translate("image")}</h4>
                <h4 className="label">{translate("product_name")}</h4>
                <h4 className="label">{translate("price")}</h4>
                <h4 className="label">{translate("quantity")}</h4>
                <h4 className="label">{translate("action")}</h4>
                <h4 className="label">{translate("total")}</h4>
              </div>

              {cartItems.map((item, index) => {
                return (
                  <div key={index} className="table-item">
                    <div>
                      <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
                        <img src={item.pictures[0]} alt="product" />
                      </Link>
                    </div>
                    <div>
                      <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
                        <h2 className="cart-item-name parraf-reg">
                          {item.name}
                        </h2>
                      </Link>
                    </div>
                    <div>
                      <h2 className="price">
                        {symbol}
                        {item.price}
                      </h2>
                    </div>

                    <div>
                      <div className="qty-box">
                        <button
                          className="qty-box__btn left-minus invisible-button"
                          onClick={() =>
                            item.qty > 1
                              ? this.props.decrementQty(item.id)
                              : this.props.removeFromCart(item)
                          }
                          data-type="minus"
                          data-field=""
                        >
                          <i className="fas fa-minus"></i>{" "}
                        </button>

                        <h2 className="qty-box__number parraf-reg">
                          {item.qty}
                        </h2>

                        <button
                          className="qty-box__btn right-plus invisible-button"
                          onClick={() => this.props.incrementQty(item, 1)}
                          data-type="plus"
                          disabled={item.qty >= item.stock ? true : false}
                        >
                          <i className="fas fa-plus"></i>{" "}
                        </button>
                      </div>

                      {item.qty >= item.stock ? "out of Stock" : ""}
                    </div>

                    <div>
                      <button
                        className="remove invisible-button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        <i className="fa fa-times" />
                      </button>
                    </div>

                    <div>
                      <h2 className="div-color price">
                        <NumberFormat
                          value={item.sum}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"€"}
                          renderText={(formattedValue) => (
                            <span>{formattedValue}</span>
                          )} // <--- Don't forget this!
                        />
                      </h2>
                    </div>
                  </div>
                );
              })}
              <div className="total">
                <h2 className="total__text">{translate("total_price")}</h2>

                <h2 className="total__number price">
                  <NumberFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"€"}
                    renderText={(formattedValue) => (
                      <span>{formattedValue}</span>
                    )} // <--- Don't forget this!
                  />
                </h2>
              </div>
              <div className="c-cart__buttons">
                <ButtonNew
                  label={"Continue"}
                  href={`${process.env.PUBLIC_URL}/cart-shipping`}
                />

                <ButtonNewLight
                  label={"Go Back"}
                  handler={this.goBack}
                  href={`${process.env.PUBLIC_URL}/`}
                />
              </div>
            </div>
          </section>
        ) : (
          <Empty text="Cart" longText="Empty cart" />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cartList.cart,
  symbol: state.data.symbol,
  total: getCartTotal(state.cartList.cart),
  state,
});

export default connect(mapStateToProps, {
  removeFromCart,
  incrementQty,
  decrementQty,
})(withRouter(withTranslate(Cart)));
