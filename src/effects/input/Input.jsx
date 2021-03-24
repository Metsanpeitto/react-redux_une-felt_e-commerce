import React, { Component } from "react";
import "./set2.css";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const existingScript = document.getElementById("classie");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `${process.env.PUBLIC_URL}  /js/classie.js`;
      script.id = "classie";
      script.async = false;
      document.body.appendChild(script);
      //script.onload = () => this.scriptLoaded();
    }
  }

  render() {
    return (
      <section className="content bgcolor-1">
        <div className="input input--nao">
          <input
            className="input__field input__field--nao input"
            type={this.props.type}
            id={this.props.id}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.handleChange}
          />
          <label
            className="input__label input__label--nao label"
            htmlFor="input-1"
          >
            <p className="input__label-content input__label-content--nao">
              {this.props.label}
            </p>
          </label>
          <svg
            className="graphic graphic--nao"
            width="300%"
            height="100%"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
          >
            <path
              id="bar"
              d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
            />
          </svg>
        </div>
      </section>
    );
  }
}
export default Input;
