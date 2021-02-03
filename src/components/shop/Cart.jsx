import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withTranslate } from "react-redux-multilingual";
import Button from "../Button";
import { getCartTotal } from "../../services";
import {
  removeFromCart,
  incrementQty,
  decrementQty,
} from "../../actions/Index";

import Hugger from "../../icons/CartEmpty";

class cartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cartItems, symbol, total, translate } = this.props;
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
            {" "}
            <h1>{translate("shopping_cart")}</h1>
            <div className="c-cart__table ">
              <div className="table-head">
                <h4>{translate("image")}</h4>
                <h4>{translate("product_name")}</h4>
                <h4>{translate("price")}</h4>
                <h4>{translate("quantity")}</h4>
                <h4>{translate("action")}</h4>
                <h4>{translate("total")}</h4>
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
                        <h2 className="cart-item-name">{item.name}</h2>
                      </Link>
                    </div>
                    <div>
                      <h2>
                        {symbol}
                        {item.price}
                      </h2>
                    </div>

                    <div>
                      <div className="qty-box">
                        <a
                          href="#"
                          className="qty-box__btn left-minus"
                          onClick={() =>
                            item.qty > 1
                              ? this.props.decrementQty(item.id)
                              : this.props.removeFromCart(item)
                          }
                          data-type="minus"
                          data-field=""
                        >
                          <i className="fas fa-minus"></i>{" "}
                        </a>

                        <h2 className="qty-box__number">{item.qty}</h2>

                        <a
                          href="#"
                          className="qty-box__btn right-plus"
                          onClick={() => this.props.incrementQty(item, 1)}
                          data-type="plus"
                          disabled={item.qty >= item.stock ? true : false}
                        >
                          <i className="fas fa-plus"></i>{" "}
                        </a>
                      </div>

                      {item.qty >= item.stock ? "out of Stock" : ""}
                    </div>

                    <div>
                      <a
                        href="#"
                        className="remove"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        <i className="fa fa-times" />
                      </a>
                    </div>

                    <div>
                      <h2 className="div-color">
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

                <h2 className="total__number">
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
            </div>
            <div className="c-cart__buttons">
              <Button
                label={"check_out"}
                href={`${process.env.PUBLIC_URL}/checkout`}
              />

              <Button
                label={"Back to Shop"}
                href={`${process.env.PUBLIC_URL}/collection`}
              />
            </div>
          </section>
        ) : (
          <section className="c-cart__empty">
            <h1>{translate("empty_cart")}</h1>
            <Hugger />

            <section className="c-product__related-products">
              <h2>{translate("related_product")}</h2>
              <div className="related-products__images">
                {productsToShow.length > 1
                  ? productsToShow.map((p, index) => (
                      <Link
                        to={`${process.env.PUBLIC_URL}/product/${p.id}`}
                        className="btn btn-solid"
                        key={index}
                      >
                        <div className="product-box__image">
                          <img src={p.pictures[0]} />
                        </div>
                      </Link>
                    ))
                  : null}
              </div>
            </section>
          </section>
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
})(withRouter(withTranslate(cartComponent)));
