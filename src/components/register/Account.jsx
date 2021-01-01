import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { withTranslate } from "react-redux-multilingual";
import { updateAccount } from "../../actions/Index";
import Button from "../Button";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: "stripe",
      id: "",
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
    };

    this.validator = new SimpleReactValidator();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.state.user.log) {
      if (this.props.state.user.log.userId) {
        console.log(this.props.state.user);
        if (this.props.state.user.log.userId !== "error") {
          this.fillFields(this.props.state.user);
          this.setState({
            name: this.props.state.user.log.userId,
          });
        }
      }
    }
  }

  fillFields = (props) => {
    console.log(props);
    if (props.log) {
      if (props.log.userId) {
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
        } = props.log;

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
          };
        });
      }
    }
  };

  setStateFromInput = (event) => {
    var obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  };

  callUpdate = () => {
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
      this.props.updateAccount(userData);
    }
  };

  /**
 * 
 *  componentDidUpdate() {
    console.log(this.props);
    console.log(this.props.state.user.log);

    if (this.props.state.user.log.username) {
      alert(this.state.first_name + " you are currently logged in !");
      this.fillFields();
    } else {
      this.props.history.push("/");
    }
  } 
 * 
 */

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    if (this.state.email.length > 0) {
      const {
        id,
        username,
        first_name,
        password,
        last_name,
        phone,
        email,
        country,
        address_1,
        city,
        state,
        postcode,
      } = this.state;
      //id, updatedUser, updatedShipping
      const userData = {
        id: id,
        username: username,
        first_name: first_name,
        password: password,
        last_name: last_name,
        phone: phone,
        email: email,
        country: country,
        address_1: address_1,
        city: city,
        state: state,
        postcode: postcode,
      };
      const userOldData = this.props.state.user.log;
      console.log(userOldData, userData);
      this.props.updateAccount(userData, userOldData);
    }
  }

  Username = () => {
    if (this.state.create_account) {
      return (
        <div className="d-c">
          <div className="form-group col-md-6 col-sm-6 col-xs-12">
            <div className="field-label">User Name</div>
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
            <div className="field-label">Password</div>
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
    const { translate } = this.props;
    return (
      <div className="l-register__account">
        <h3>Account Manager</h3>
        <div className="left-menu">
          <div className="left-menu--title">
            <h3>{translate("billing")}</h3>
          </div>
          <form className="form">
            <div className="form-group ">
              <div className="field-label">{translate("first_name")}</div>
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
              <div className="field-label">{translate("last_name")}</div>
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
              <div className="field-label">{translate("phone")}</div>
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
              <div className="field-label">{translate("email")}</div>
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
              <div className="field-label">{translate("country")}</div>
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
              <div className="field-label">{translate("address")}</div>
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
              <div className="field-label">{translate("city")}</div>
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
              <div className="field-label">{translate("state")}</div>
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
              <div className="field-label">{translate("postal")}</div>
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

            <div className="form-group ">
              <Button
                label="Update"
                type="submit"
                handler={this.handleSubmit}
                href="#"
              />
            </div>
          </form>{" "}
        </div>
      </div>
    );
  }
}

//export default Register;

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {
  updateAccount,
})(withTranslate(Account));
