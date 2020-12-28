import React, { Component } from "react";
import { connect } from "react-redux";
import { clearCart } from "../../../actions/Index";
import { withTranslate } from "react-redux-multilingual";

class CheckoutSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: "",
      items: null,
      symbol: "",
      orderTotal: null,
      receipt: "",
    };
  }

  componentWillMount() {
    /*
    if (this.props.history.location.data) {
      if (this.props.history.location.data) {
        var receipt = this.props.history.location.data[0].charge;
        var order = this.props.state.order.rec;

        var payment = {
          payerID: receipt.fingerprint,
          paymentID: receipt.id,
          paymentToken: receipt.payment_method,
          orderId: order ? order.id : null,
        };

        this.setState(() => {
          return {
            payment,
            items: order.line_items,
            symbol: order.currency,
            orderTotal: order.total,
            order: order,
          };
        });
      }
    }
    */
  }

  componentDidUpdate() {
    /*
    if (this.props.history.location.data) {
      if (this.state.orderTotal !== this.props.state.order.rec.total) {
        if (this.props.history.location.data) {
          var receipt = this.props.history.location.data[0].charge;
          var order = this.props.state.order.rec;

          var payment = {
            payerID: receipt.source.fingerprint,
            paymentID: receipt.id,
            paymentToken: receipt.payment_method,
            orderId: order.id,
          };

          this.setState(() => {
            return {
              payment,
              items: order.line_items,
              symbol: order.currency,
              orderTotal: order.total,
              order: order,
            };
          });
        }
      }
    }
    */
  }

  render() {
    var { payment, items, symbol, orderTotal, order } = this.state;
    var { translate } = this.props;
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var current = new Date();
    var next5days = new Date(Date.now() + 5 * 86400000);
    var CheckDate = current.toLocaleDateString("en-US", options).toString();
    var deliveryDate = next5days
      .toLocaleDateString("en-US", options)
      .toString();

    items = [
      {
        name: "Pako",
        quantity: "3",
        price: "60",
        total: "180",
        symbol: "eur",
        subtotal: "90",
        shipping: "20",
        tax: "3",
        total: "500",
      },
    ];

    payment = {
      paymentID: "9998888",
      payerID: "28384823",
      paymentToken: "93452345",
      id: "2345235",
      orderId: "12",
    };

    order = {
      billing: {
        first_name: "juako",
        last_name: "Molono",
        address_1: "Askola",
        state: "SADAS",
        postcode: "33444",
        phone: "83898789834",
      },
    };

    deliveryDate = "12-23-23";

    return payment.orderId ? (
      <div className="c-checkout-success">
        <div className="c-checkout-success__head">
          <i className="fa fa-check-circle" aria-hidden="true" />

          <h2 className="thanks">{translate("thank_you")}</h2>
          <p>{translate("payment_received")}</p>
          <p>
            {translate("transaction_id")}
            {payment.paymentID ? payment.paymentID : payment.id}
          </p>
        </div>

        <section className="c-checkout-success__body">
          <div className="product-order">
            <h3 className="title">{translate("order_details")}</h3>
            {items
              ? items.map((item, index) => {
                  return (
                    <div className=" product-order-detail" key={index}>
                      <div className=" order_detail">
                        <h4>{translate("product_name")}</h4>
                        <h5>{item.name}</h5>
                      </div>
                      <div className=" order_detail ">
                        <h4>{translate("quantity")}</h4>
                        <h5>{item.quantity}</h5>
                      </div>
                      <div className=" order_detail">
                        <h4 className="text-end">{translate("price")}</h4>
                        <h5>
                          {item.total} {symbol}
                        </h5>
                      </div>
                    </div>
                  );
                })
              : null}
            <div className="total-sec">
              <div className=" order_detail ">
                <h4>{translate("subtotal")}</h4>
                <h5>
                  {" "}
                  <span>
                    {orderTotal} {symbol}
                  </span>
                </h5>
              </div>
              <div className=" order_detail">
                <h4>{translate("shipping")}</h4>
                <h5>
                  <span>$0</span>
                </h5>
              </div>
              <div className=" order_detail">
                <h4>{translate("tax")}</h4>
                <h5>Patata</h5>
              </div>
            </div>
            <div className="final-total">
              <h3 className="title">
                {translate("total")}
                <span>
                  {symbol}
                  {orderTotal}
                </span>
              </h3>
            </div>
          </div>

          <div className=" order-success-sec">
            <h4>{translate("payment_information")}</h4>
            <div className="order-detail">
              {payment.paymentID ? (
                <div>
                  <div className=" order_detail">
                    <h4>{translate("payer_id")}</h4>
                    <h5>{payment.payerID}</h5>
                  </div>
                  <div className="order_detail">
                    <h4> {translate("payment_id")}</h4>
                    <h5>{payment.payerID}</h5>
                  </div>
                  <div className=" order_detail">
                    <h4>{translate("payment_token")}</h4>
                    <h5>{payment.paymentToken}</h5>
                  </div>
                </div>
              ) : (
                <div className="order_detail">
                  <h4>{translate("order_id")}</h4>
                  <h5>{payment.id}</h5>
                </div>
              )}

              <div className="order_detail">
                <h4> {translate("order_date")}</h4>
                <h5>{CheckDate}</h5>
              </div>
              <div className="order_detail">
                <h4> {translate("order_total")}</h4>
                <h5>
                  {" "}
                  {orderTotal} {symbol}
                </h5>
              </div>
            </div>
          </div>
          <div className="shipping">
            <h3 className="title"> {translate("shipping_address")}</h3>

            <h4>
              {order.billing.first_name} {order.billing.last_name}{" "}
            </h4>
            <h4>{order.billing.address_1}</h4>
            <h4>
              {order.billing.state} {order.billing.postcode}
            </h4>

            <div className="order_detail">
              <h4> {translate("contact_phone")} </h4>
              <h5>{order.billing.phone}</h5>
            </div>
          </div>

          <div className="order_detail ">
            <h4>{translate("payment_method")}</h4>
            <h5>{translate("banking_acceptance")}</h5>
          </div>

          <div className="order_detail ">
            <h4>{translate("delivery_date")}</h4>
            <h5>{deliveryDate}</h5>
          </div>
        </section>
      </div>
    ) : (
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
      /*<section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="error-section">
                <h1>404</h1>
                <h2>page not found</h2>
                <a href="index.html" className="btn btn-solid">
                  back to home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>*/
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {
  clearCart,
})(withTranslate(CheckoutSuccess));
