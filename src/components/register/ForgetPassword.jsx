import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

class ForgetPassword extends Component {
 constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      checked: false,
    };
    this.validator = new SimpleReactValidator();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.checked && localStorage.name !== "null") {
      if (localStorage.checked && localStorage.name !== "") {
        this.setState({
          checked: true,
          name: localStorage.name,
          password: localStorage.password,
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.props.state.user.log) {
      if (this.props.state.user.log.userId) {
        // alert(this.state.username + " you are currently logged in !");
        //  this.props.history.push("/");
        // console.log(this.props);
        this.props.history.push(`${process.env.PUBLIC_URL}/`);
      }
    }
  }

  handleChange = (e) => {
    const n = e.currentTarget.value;
    const name = e.currentTarget.name;
    if (name === "password") {
      this.setState(() => {
        return { password: n };
      });
    }
    if (name === "name") {
      this.setState(() => {
        return { name: n };
      });
    }

    if (name == undefined) {
      if (this.state.checked === true) {
        localStorage.name = null;
        localStorage.password = null;
        localStorage.checked = null;
        this.setState(() => {
          return { checked: false };
        });
      } else {
        this.setState(() => {
          return { checked: true };
        });
      }
    }
  };
  
    handleSubmit(event) {
    event.preventDefault();
    if (this.state.name.length > 0 && this.state.password > 0) {
      if (this.state.checked) {
        localStorage.name = this.state.name;
        localStorage.password = this.state.password;
        localStorage.checked = this.state.checked;
      } else {
        localStorage.name = null;
        localStorage.password = null;
        localStorage.checked = null;
      }
      const userData = {
        username: this.state.name,
        password: this.state.password,
      };
      this.props.setLoader("visible");
      this.props.login(userData);
    }
  }
  render() {
    const 
      return (
      <div className="l-register__login">
        <h3>{translate("forget_question")}</h3>
        <form onSubmit={this.handleSubmit}>
          <Input
            type="email"
            name="name"
            id="mail"
            label="mail"
            value={this.state.name}
            handleChange={this.handleChange}
          />

        </form>

        <div className="action">
          <div className="remember">
            <Button
              label="Send Request"
              type="submit"
              handler={this.handleSubmit}
              href="#"
            />


          </div>

   
        </div>


      </div>
    );


  }
}



const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {
  login,
})(withRouter(withTranslate(ForgetPassword)));


