import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import NumberFormat from "react-number-format";
import { withTranslate } from "react-redux-multilingual";
import { withRouter } from "react-router-dom";
import StepIndex from "../../common/StepIndex";
import LayoutBackground from "../../../../icons/LayoutBackground";
import ButtonNew from "../../../../components/ButtonNew";
import ButtonNewLight from "../../../../components/ButtonNewLightBack";

import Checkbox from "@material-ui/core/Checkbox";

import {
  removeFromWishlist,
  placeOrder,
  clearCart,
  signup,
} from "../../../../actions/Index";
import { getCartTotal } from "../../../../services";

class CheckOut extends Component {
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
      cart: [
        {
          id: "2",
          stock: "12",
          qty: "13",
          sum: " 12",
          pictures: [``],
          name: "Lady Yurta",
          category: "Pieces",
          price: "23",
        },
      ],
      free_shipping: true,
      local_pickup: false,
      total: null,
      create_account: false,
      formFilled: null,
    };
    this.validator = new SimpleReactValidator();
    this.createOrderData = this.createOrderData.bind(this);
    this.checkhandle = this.checkhandle.bind(this);
    this.goBack = this.goBack.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  componentDidMount() {
    if (this.props.cartItems.length > 0) {
      this.setState(() => {
        return {
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

  // This helps to open the selected produt in a dedicated window
  newTo(email) {
    if (email && email !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/cart-payment/${email}`,
        orderData: this.state.orderData,
      };
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

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

  createOrderData() {
    var orderData = {
      username: this.state.username,
      email: this.state.email,
      // password : this.state.password,
      address_1: this.state.address_1,
      city: this.state.city,
      country: this.state.country,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone: this.state.phone,
      postcode: this.state.postcode,
      state: this.state.state,
      cart: this.state.cart,
      total: this.state.total,
    };
    return orderData;
  }

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
    if (!this.validator.fieldValid(event.target.name)) {
      this.validator.showMessages();
    }
    this.checkForm();
  };

  setStateFromCheckbox = (event) => {
    const name = event.currentTarget.name;
    var obj = {};
    if (name === "free-shipping" || name === "local-pickup") {
      if (name === "free-shipping" && event.currentTarget.checked) {
        this.setState(() => {
          return {
            free_shipping: true,
            local_pickup: false,
          };
        });
      } else {
        this.setState(() => {
          return {
            free_shipping: false,
            local_pickup: true,
          };
        });
      }
    } else {
      obj[event.target.name] = event.target.checked;
      this.setState(obj);
    }

    if (!this.validator.fieldValid(event.target.name)) {
      this.validator.showMessages();
    }
    this.checkForm();
  };

  checkhandle(value) {
    this.setState({
      payment: value,
    });
  }

  doOrder = (flag) => {
    this.props.placeOrder(this.createOrderData());
  };

  checkForm = () => {
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
      create_account,
      username,
      password,
      total,
    } = this.state;

    if (
      first_name &&
      last_name &&
      phone &&
      email &&
      country &&
      address_1 &&
      city &&
      state &&
      postcode &&
      total
    ) {
      const orderData = this.createOrderData();

      this.setState(() => {
        return {
          formFilled: true,
          orderData: orderData,
        };
      });

      if (create_account) {
        if (username && password) {
          this.setState(() => {
            return {
              formFilled: true,
            };
          });
        } else {
          this.setState(() => {
            return {
              formFilled: false,
            };
          });
        }
      }
    } else {
      this.setState(() => {
        return {
          formFilled: false,
        };
      });
    }
  };

  callSignup = () => {
    if (this.state.create_account) {
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
      } = this.state;

      const userData = {
        username: this.state.username,
        first_name: first_name,
        password: this.state.password,
        last_name: last_name,
        phone: phone,
        email: email,
        country: country,
        address_1: address_1,
        city: city,
        state: state,
        postcode: postcode,
      };
      this.props.signup(userData);
    }
  };

  Username = () => {
    if (this.state.create_account) {
      return (
        <div className="d-c">
          <div className="form-group col-md-6 col-sm-6 col-xs-12">
            <div className="field-label label">User Name</div>
            <input
              type="text"
              name="username"
              className="form-control"
              value={this.state.username}
              onChange={this.setStateFromInput}
            />
            {this.validator.message(
              "username",
              this.state.username,
              "required|alpha"
            )}
          </div>
          <div className="form-group col-md-6 col-sm-6 col-xs-12">
            <div className="field-label label">Password</div>
            <input
              type="password"
              name="password"
              className="form-control"
              value={this.state.password}
              onChange={this.setStateFromInput}
            />
            {this.validator.message(
              "password",
              this.state.password,
              "required"
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { cartItems, total, translate } = this.props;

    return (
      <div className="c-checkout ">
        <LayoutBackground />
        <h3 className="c-checkout__title h2-didot-reg">{translate("cart")}</h3>
        <StepIndex index="2" />
        <div className="c-checkout__menus">
          <div className="left-menu b-layout-card">
            <div className="left-menu--title">
              <h3 className="h5-didot-reg">Shipping Information</h3>
            </div>
            <form className="form">
              <this.Username />
              <div className="form-group ">
                <div className="field-label label ">
                  {translate("first_name")}
                </div>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  required=""
                  className="form-control"
                  value={this.state.first_name}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "first_name",
                  this.state.first_name,
                  "required|alpha"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">
                  {translate("last_name")}
                </div>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  className="form-control"
                  value={this.state.last_name}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "last_name",
                  this.state.last_name,
                  "required|alpha"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">{translate("phone")}</div>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={this.state.phone}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "phone",
                  this.state.phone,
                  "required|phone"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">{translate("email")}</div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "email",
                  this.state.email,
                  "required|email"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">{translate("country")}</div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="form-control"
                  value={this.state.country}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "country",
                  this.state.country,
                  "required"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">{translate("address")}</div>
                <input
                  id="address_1"
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  required=""
                  name="address_1"
                  value={this.state.address_1}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "address_1",
                  this.state.address_1,
                  "required|min:2|max:120"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">{translate("city")}</div>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="form-control"
                  value={this.state.city}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "city",
                  this.state.city,
                  "required|alpha"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">{translate("state")}</div>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="form-control"
                  value={this.state.state}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "state",
                  this.state.state,
                  "required|alpha"
                )}
              </div>
              <div className="form-group ">
                <div className="field-label label">{translate("postal")}</div>
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postal Code"
                  className="form-control"
                  value={this.state.postcode}
                  onChange={this.setStateFromInput}
                />
                {this.validator.message(
                  "postcode",
                  this.state.postcode,
                  "required|integer"
                )}
              </div>

              <div className="form-group account  ">
                <Checkbox
                  name="create_account"
                  id="account-option"
                  inputProps={{ "aria-label": "primary checkbox" }}
                  defaultChecked={this.state.create_account}
                  onChange={this.setStateFromCheckbox}
                />
                &ensp;{" "}
                <label htmlFor="account-option parraf-sm">
                  {translate("create_account")}
                </label>
              </div>
            </form>
          </div>

          <div className="right-menu b-layout-card">
            <div className="right-menu--title">
              <h3 className="h5-didot-reg">Cart details</h3>
            </div>
            <div className="checkout-details">
              <div className="order-box">
                <div className="title-box">
                  <p className="subtitle-lg">{translate("products")}</p>
                </div>
                <ul className="qty">
                  {cartItems.map((item, index) => {
                    return (
                      <li key={index}>
                        <h6 className="parraf-reg">{item.name}</h6>
                        <h6 className="parraf-reg">×</h6>
                        <h6 className="parraf-reg">{item.qty}</h6>
                        <NumberFormat
                          value={item.sum}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"€"}
                          renderText={(formattedValue) => (
                            <span className="price">{formattedValue}</span>
                          )} // <--- Don't forget this!
                        />
                      </li>
                    );
                  })}
                </ul>
                <div className="title-box">
                  <p className="subtitle-lg">{translate("total")}</p>
                </div>

                <div className="sub-total">
                  <div className="sub-total__number">
                    <p className="subtitle-reg">{translate("subtotal")}</p>

                    <div className="label">
                      <NumberFormat
                        value={total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"€"}
                        renderText={(formattedValue) => (
                          <p className="price">{formattedValue}</p>
                        )} // <--- Don't forget this!
                      />
                    </div>
                  </div>

                  <div className="total">
                    <p className="subtitle-reg">{translate("total")}</p>
                    <span className="count2">
                      <NumberFormat
                        value={total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"€"}
                        renderText={(formattedValue) => (
                          <p className="price">{formattedValue}</p>
                        )} // <--- Don't forget this!
                      />
                    </span>
                  </div>
                  <div className="sub-total__shipping">
                    <p className="subtitle-reg">{translate("shipping")}</p>

                    <div className="shipping">
                      <div className="shopping-option">
                        <Checkbox
                          name="free-shipping"
                          id="free-shipping"
                          inputProps={{ "aria-label": "primary checkbox" }}
                          onChange={this.setStateFromCheckbox}
                          checked={this.state.free_shipping}
                        />
                        <p className="parraf-reg">
                          {" "}
                          {translate("free_shipping")}
                        </p>
                      </div>
                      <div className="shopping-option">
                        <Checkbox
                          id="local-pickup"
                          name="local-pickup"
                          inputProps={{ "aria-label": "primary checkbox" }}
                          onChange={this.setStateFromCheckbox}
                          checked={this.state.local_pickup}
                        />
                        <p className="parraf-reg">
                          {" "}
                          {translate("local_pickup")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons">
              <ButtonNew
                label={"Payment"}
                href={this.newTo(this.state.email)}
                class={
                  this.state.formFilled
                    ? "f-bp-new"
                    : "f-bp-new button-disabled"
                }
              />

              <ButtonNewLight label={"Go Back "} handler={this.goBack} />
            </div>
          </div>
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
})(withRouter(withTranslate(CheckOut)));
