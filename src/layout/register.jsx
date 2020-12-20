import React, { Component } from "react";
import Login from "../components/register/Login";
import Signup from "../components/register/Signup";

class Register extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="l-register">
        <Login />
        <Signup />
      </div>
    );
  }
}

export default Register;
