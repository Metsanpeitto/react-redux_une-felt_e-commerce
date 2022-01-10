import React, { Component } from "react";
import { connect } from "react-redux";
import PaypalExpressBtn from "react-paypal-express-checkout";
import SimpleReactValidator from "simple-react-validator";
import { Elements } from "react-stripe-elements";
import Checkbox from "@material-ui/core/Checkbox";
import { withTranslate } from "react-redux-multilingual";
import { withRouter } from "react-router-dom";
import LayoutBackground from "../../../../icons/LayoutBackground";
import CheckoutForm from "./CheckoutForm";
import StepIndex from "../../common/StepIndex";

import {
  removeFromWishlist,
  placeOrder,
  clearCart,
  signup,
} from "../../../../actions/Index";
import { getCartTotal } from "../../../../services";

class CheckoutCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: "stripe",
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      country: "",
      address_1: "",
      city: "",
      state: "",
      postcode: "",
      cart: [],
      total: null,
      create_account: false,
    };
    this.validator = new SimpleReactValidator();
    this.checkHandle = this.checkHandle.bind(this);
    this.mountScript = this.mountScript.bind(this);
  }

  componentDidMount() {
    this.mountScript();
    var propsString = this.props.location.pathname;
    const email = propsString.replace("/cart-payment/", "");
    if (this.props.cartItems.length > 0) {
      this.setState(() => {
        return {
          email: email,
          orderData: this.props.location.orderData,
          cart: this.props.cartItems,
          total: this.props.total,
        };
      });
    }

    if (this.props.user.log) {
      if (this.props.user.log.username) {
        this.fillFields(this.props);
      }
    }
  }

  mountScript() {
    const existingScript = document.getElementById("stripe-js");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.id = "stripe-js";
      script.async = false;
      document.body.appendChild(script);
      script.onload = () => this.scriptLoaded();
    }
  }

  fillFields = (props) => {
    const {
      first_name,
      last_name,
      phone,
      email,
      country,
      address_1,
      city,
      state,
      postcode,
    } = props.user.log;
    const cart = props.cartItems;
    const total = props.total;

    this.setState(() => {
      return {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        email: email,
        country: country,
        address_1: address_1,
        city: city,
        state: state,
        postcode: postcode,
        cart: cart,
        total: total,
      };
    });
  };

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  setStateFromCheckbox = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.checked;
    this.setState(obj);
    if (!this.validator.fieldValid(event.target.name)) {
      this.validator.showMessages();
    }
  };

  checkHandle(event) {
    const value = event.target.name;
    if (value === "stripe") {
      this.setState({
        payment: "stripe",
      });
    } else {
      this.setState({
        payment: "paypal",
      });
    }
  }

  doOrder = () => {
    this.props.placeOrder(this.state.orderData);
  };

  render() {
    const { cartItems, symbol, total, translate } = this.props;
    // Paypal Integration
    const onSuccess = (payment) => {
      this.props.history.push({
        pathname: "/cart-done",
        state: {
          payment: payment,
          items: cartItems,
          orderTotal: total,
          symbol: symbol,
        },
      });
    };

    const onCancel = (data) => {
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    const client = {
      sandbox:
        "AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_",
      production:
        "AZ4S98zFa01vym7NVeo_qthZyOnBhtNvQDsjhaZSMH-2_Y9IAJFbSD3HPueErYqN8Sa8WYRbjP7wWtd_",
    };

    return (
      <div className="c-checkout ">
        <LayoutBackground />
        <h3 className="c-checkout__title h2-didot-reg">{"Cart"}</h3>
        <StepIndex index="3" />
        <div className="payment-box b-layout-card">
          <h5 className="h5-didot-reg">Payment details</h5>
          <div className="upper-box">
            <div className="payment-options">
              <div className="radio-option stripe">
                <Checkbox
                  name="stripe"
                  id="payment-2"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  checked={this.state.payment === "stripe" ? true : false}
                  onClick={this.checkHandle}
                />
                <label htmlFor="payment-2">Stripe</label>
              </div>

              <div className="radio-option paypal">
                <Checkbox
                  name="paypal"
                  id="payment-1"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  checked={this.state.payment === "paypal" ? true : false}
                  onClick={this.checkHandle}
                />
                <label htmlFor="payment-1">Paypal</label>
              </div>
            </div>
          </div>
          {total !== 0 ? (
            <div className="text-right">
              {this.state.payment === "stripe" ? (
                <Elements>
                  <CheckoutForm
                    selectedProduct={cartItems}
                    history={this.props.history}
                    total={total}
                    email={this.state.email}
                    doOrder={this.doOrder}
                    clientData={this.state}
                    translate={translate}
                  />
                </Elements>
              ) : (
                <PaypalExpressBtn
                  env={"sandbox"}
                  client={client}
                  currency={"USD"}
                  total={total}
                  onError={onError}
                  onSuccess={onSuccess}
                  onCancel={onCancel}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
  cartItems: state.cartList.cart,
  symbol: state.data.symbol,
  total: getCartTotal(state.cartList.cart),
});

export default connect(mapStateToProps, {
  removeFromWishlist,
  placeOrder,
  clearCart,
  signup,
})(withRouter(withTranslate(CheckoutCard)));
