import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class AutoPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true,
    };
    this.delay = this.delay.bind(this);
  }

  delay() {
    setTimeout(() => this.setState({ autoplay: true }), 200);
  }
  componentDidMount() {
    this.delay();
  }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 10000,
      autoplaySpeed: 10,
      cssEase: "linear",
      autoplay: this.state.autoplay,
    };

    return (
      <div className="slider-canvas">
        <Slider {...settings}>
          <div className="slider-item">
            <img
              className="item__1"
              src={
                process.env.PUBLIC_URL + "assets/img/caterpillar/caterFront.jpg"
              }
            />
          </div>
          <div className="slider-item">
            <img
              className="item__2"
              src={process.env.PUBLIC_URL + "assets/img/hopper/portrait.jpg"}
            />
          </div>

          <div className="slider-item">
            <img
              className="item__3"
              src={
                process.env.PUBLIC_URL +
                "assets/img/miss_desert/Lady_DesertP.jpg"
              }
            />
          </div>

          <div className="slider-item">
            <img
              className="item__4"
              src={process.env.PUBLIC_URL + "assets/img/blanky/blanky.jpg"}
            />
          </div>
          <div className="slider-item">
            <img
              className="item__5"
              src={
                process.env.PUBLIC_URL +
                "assets/img/miss_wetland/ladyWetTop.jpg"
              }
            />
          </div>
          <div className="slider-item">
            <img
              className="item__6"
              src={
                process.env.PUBLIC_URL +
                "assets/img/miss_ocean/Lady_OceanLeft.jpg"
              }
            />
          </div>
        </Slider>
      </div>
    );
  }
}
