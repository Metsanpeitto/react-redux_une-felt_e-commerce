import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import Slider from "../../components/Slider";
import Logo from "../../icons/FilledHeart";

class SplitText extends Component {
  render() {
    return (
      <span arialabel={this.props.copy} role={this.props.role}>
        {this.props.copy.split("").map(function (char, index) {
          let style = { animationDelay: 5 + index / 10 + "s" };
          return (
            <span aria-hidden="true" key={index} style={style}>
              {char}
            </span>
          );
        })}
      </span>
    );
  }
}

function Hero(data) {
  var extras = null;

  if (data) {
    if (data.data.state) {
      if (data.data.state.extras) {
        if (data.data.state.extras.extras) {
          extras = data.data.state.extras.extras;
        }
      }
    }
  }

  return (
    <section>
      <section className="l-landing">
        <img
          src={process.env.PUBLIC_URL + "assets/img/pattern.png"}
          alt="picture"
          className="section__pattern "
        />
        <section className="l-landing__canvas" id="trigger">
          <div>
            <div className="l-landing__logo">
              {" "}
              <Logo />
            </div>{" "}
            <p>a pulse for creation</p>
          </div>

          <h1 className="text__1">
            <SplitText copy="DELICATE ART" role="heading" />
          </h1>
          <h1 className="text__2">
            <SplitText copy="made with" role="heading" />
          </h1>
          <h1 className="text__3">
            <SplitText copy="NATURAL FELT" role="heading" />
          </h1>
        </section>
        <section className="landing__slider">
          <Slider />
        </section>
        {/** This banner component must to get values from the extras file from the api and set variables in each field
         *
         */}
      </section>
    </section>
  );
}

export default withRouter(Hero);
