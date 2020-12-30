import React, { Component } from "react";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { withTranslate } from "react-redux-multilingual";
import { updateAccount } from "../../actions/Index";
import Input from "../../effects/input/Input";
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
        if (this.props.state.user.log.userId !== "error") {
          this.setState({
            name: this.props.state.user.log.userId,
          });
        }
      }
    }
  }
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

  componentWillReceiveProps() {
    console.log(this.props);
  }

  fillFields() {
    const {
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
      userId,
    } = this.props.state.user.log;
    console.log(this.props.state.user.log);
    this.setState(() => {
      return {
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
        id: userId,
      };
    });
  }

  handleChange = (e) => {
    var value = e.currentTarget.value;
    const name = e.currentTarget.name;
    if (e.currentTarget.name) {
      if (name === "postcode" || name === "phone") {
        this.setState(() => {
          return { [name]: value.replace(/\D/, "") };
        });
      } else {
        this.setState(() => {
          return { [name]: value };
        });
      }
    } else return null;
  };

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    if (this.state.first_name.length > 0) {
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
  render() {
    const { translate } = this.props;
    return (
      <div className="l-register__account">
        <h3>Account Manager</h3>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="name"
            id="mail"
            label="mail"
            value={this.state.name}
            handleChange={this.handleChange}
          />
          {this.validator.message(
            "name",
            this.state.username,
            "required|alpha"
          )}

          <Input
            type="text"
            name="first_name"
            id="first_name"
            label="first name"
            value={this.state.first_name}
            handleChange={this.handleChange}
          />
          {this.validator.message(
            "first_name",
            this.state.first_name,
            "required|alpha"
          )}

          <Input
            type="text"
            name="last_name"
            id="last_name"
            label="last name"
            value={this.state.last_name}
            handleChange={this.handleChange}
          />
          {this.validator.message(
            "last_name",
            this.state.last_name,
            "required|alpha"
          )}

          <h3>Billing Details{translate("")}</h3>
          <Input
            type="text"
            name="country"
            id="country"
            label="country"
            value={this.state.country}
            handleChange={this.handleChange}
          />
          {this.validator.message(
            "country",
            this.state.country,
            "required|alpha"
          )}

          <Input
            id="phone"
            type="tel"
            pattern="[0-9]{9}"
            maxLength="9"
            required=""
            name="phone"
            label="Enter phone number"
            value={this.state.phone}
            handleChange={this.handleChange}
          />
          {this.validator.message(
            "phone",
            this.state.country,
            "required|alpha"
          )}

          <Input
            id="address_1"
            type="text"
            label="Address"
            required=""
            name="address_1"
            value={this.state.address_1}
            handleChange={this.handleChange}
          />
          {this.validator.message(
            "address_1 ",
            this.state.address_1,
            "required|alpha"
          )}

          <Input
            id="city"
            type="text"
            className="form-control"
            label="City"
            required=""
            name="city"
            value={this.state.city}
            handleChange={this.handleChange}
          />
          {this.validator.message("city", this.state.city, "required|alpha")}

          <Input
            id="state"
            type="text"
            label="State / Province "
            required=""
            name="state"
            value={this.state.state}
            handleChange={this.handleChange}
          />
          {this.validator.message("state ", this.state.state, "required|alpha")}

          <Input
            id="state"
            type="text"
            label="State / Province "
            required=""
            name="state"
            value={this.state.state}
            handleChange={this.handleChange}
          />
          {this.validator.message("state ", this.state.state, "required|alpha")}

          <Input
            id="postcode"
            type="tel"
            pattern="[0-9]{5}"
            maxLength="5"
            label="Postal"
            required=""
            name="postcode"
            value={this.state.postcode}
            handleChange={this.handleChange}
          />
          {this.validator.message(
            "postal",
            this.state.postcode,
            "required|alpha"
          )}

          <Button
            label="Update"
            type="submit"
            handler={this.handleSubmit}
            href="#"
          />
        </form>
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
