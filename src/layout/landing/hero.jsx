import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import Slider from "../../components/Slider";
import Logo from "../../icons/FilledHeart";
import Button from "../../components/Button";

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

        {extras ? (
          extras[0] ? (
            <section className="c-banner">
              <div className="c-banner__left">
                <div className="c-banner-text">
                  <p className="c-banner-text__header">LASTEST CREATIONS</p>
                  <h1 className="c-banner-text__big">{extras[0].name}</h1>
                  <p className="c-banner-text__long">
                    {extras[0].short_description}
                  </p>{" "}
                  <Button
                    label="LEARN MORE"
                    key="learn"
                    href={`${process.env.PUBLIC_URL}/lastest`}
                  />
                </div>
              </div>

              <div className="c-banner-img">
                <div className="c-banner-figure">
                  <div className="c-banner-src">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "assets/img/hopper/landSide.jpg"
                      }
                      alt="lastest picture"
                      className="c-banner-src__scale"
                    />
                  </div>
                  <div className="c-banner-src">
                    <img
                      src={
                        process.env.PUBLIC_URL + "assets/img/hopper/land.jpg"
                      }
                      alt="lastest picture"
                    />
                  </div>
                </div>
              </div>
            </section>
          ) : null
        ) : null}
      </section>
    </section>
  );
}

export default withRouter(Hero);
