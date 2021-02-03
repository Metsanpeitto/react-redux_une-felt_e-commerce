import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import { withRouter } from "react-router-dom";
import Login from "../components/register/Login";
import Signup from "../components/register/Signup";
import Account from "../components/register/Account";
import Loader from "../effects/loader/Loader";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: null,
      logged: null,
    };
    this.setLoader = this.setLoader.bind(this);
  }

  componentDidMount() {
    if (this.props.state.user.log) {
      if (this.props.state.user.log.userId) {
        if (!this.state.logged) {
          this.setState(() => {
            return { logged: this.props.state.user.log.userId };
          });
        }
      }
    }
  }

  componentDidUpdate() {
    if (this.props.state.user.log) {
      if (this.state.loader == true) {
        if (this.props.state.user.log == "error") {
          this.setState(() => {
            return { loader: null };
          });
        }
      }

      if (this.props.state.user.log.userId) {
        // alert(this.state.username + " you are currently logged in !");
        //  this.props.history.push("/");

        if (!this.state.logged) {
          this.setState(() => {
            return { logged: this.props.state.user.log.userId };
          });
          this.props.history.push(`${process.env.PUBLIC_URL}/`);
        }
      }
    }
  }

  setLoader(data) {
    if (data === "visible") {
      this.setState(() => {
        return { loader: true };
      });
    } else {
      this.setState(() => {
        return { loader: null };
      });
    }
  }

  Logged = () => {
    return (
      <div className="l-register">
        <div className="l-register__logged">Logged In</div>
      </div>
    );
  };

  render() {
    const { loader, logged } = this.state;
    return loader ? (
      <Loader />
    ) : logged ? (
      <Account />
    ) : (
      <div className="l-register">
        <Login setLoader={this.setLoader} />
        <Signup setLoader={this.setLoader} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(withTranslate(Register)));
