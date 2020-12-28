import React, { Component } from "react";
import Input from "../../effects/input/Input";
import Button from "../Button";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { signup } from "../../actions/Index";
import { withTranslate } from "react-redux-multilingual";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: "stripe",
      username: "",
      password: "",
    };

    this.validator = new SimpleReactValidator();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.state.user.log) {
      if (this.props.state.user.log.username) {
        alert(this.state.username + " you are currently logged in !");
        this.props.history.push("/");
      }
    }
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
    event.preventDefault();
    if (this.state.username.length > 0 && this.state.password > 0) {
      const { username, password } = this.state;

      const userData = {
        username: username,
        password: password,
        email: username,
      };
      this.props.signup(userData);
    }
  }
  render() {
    const { translate } = this.props;
    return (
      <div className="l-register__register">
        <h3>{translate("register")}</h3>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="username"
            id="mail"
            label="mail"
            value={this.state.username}
            handleChange={this.handleChange}
          />

          <Input
            type="password"
            name="password"
            id="password"
            label="password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
        </form>

        <div className="action">
          <Button
            label="Register"
            type="submit"
            handler={this.handleSubmit}
            href="#"
          />
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
  signup,
})(withTranslate(Signup));
