import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import Button from "../../components/ButtonNew";
import Card from "../../components/ProductCard";
import Cloudia from "../../icons/landingHero/Cloudia";
import PlantCloudia from "../../icons/PlantCloudia";
import BigHeart from "../../icons/BigHeart";
import Shop from "./Shop";
import PathAnimated from "../PathAnimated";
import Contact from "./Contact";
import "./style.css";

const Hero = (data) => {
  return (
    <div className="hero grid-16">
      <div className="left-canvas">
        <h1 className="h1-didot-reg">Art made with felt</h1>
        <p className="parraf-lg">
          Une creates all kind of sculptures with felt and does workshops where
          you can learn how to do felt art yourself. In the blog you can see all
          the pieces and discover the story behind them. Don't forget visit the
          shop and get in there the perfect gift.
        </p>
        <Button label="Learn more" href={`${process.env.PUBLIC_URL}/story`} />
      </div>
      <section className="right-canvas">
        <Cloudia />
      </section>
    </div>
  );
};

const Layout1 = (data) => {
  return (
    <div className="layout1 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 1801 1190"
        className="background"
      >
        <linearGradient
          id="PSgrad_0"
          x1="23.9"
          x2="1923.4"
          y1="105.931"
          y2="1435.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#DCA18C"></stop>
          <stop offset="1" stopColor="#DCA18C" stopOpacity="1"></stop>
        </linearGradient>
        <path fill="url(#PSgrad_0)">
          <animate
            repeatCount="indefinite"
            attributeName="d"
            // fill="freeze"
            dur="25s"
            // from="M756 85C512 9.094 444-47 0 58.647V1180.61c208 0 261.596-55.47 524-55.47 304 0 469.038 79.18 784 119.86 251.97 32.54 400.25-87.81 493-119.86V9.094C1552 121 1024.54 168.54 756 85z"
            //to="M1068 60.6464C835.421 126.803 500.088 92.4141 0 60.6465V1182.61C264 1155.49 452 1254.44 712 1219C866.176 1197.99 1131.63 1114.81 1446.59 1155.49C1698.56 1188.03 1708.25 1159.19 1801 1127.14V11.0939C1636.58 -13.3022 1273.32 2.24407 1068 60.6464Z"
            values="M756 85C512 9.094 444-47 0 58.647V1180.61c208 0 261.596-55.47 524-55.47 304 0 469.038 79.18 784 119.86 251.97 32.54 400.25-87.81 493-119.86V9.094C1552 121 1024.54 168.54 756 85z;
	                  	M1068 60.6464C835.421 126.803 500.088 92.4141 0 60.6465V1182.61C264 1155.49 452 1254.44 712 1219C866.176 1197.99 1131.63 1114.81 1446.59 1155.49C1698.56 1188.03 1708.25 1159.19 1801 1127.14V11.0939C1636.58 -13.3022 1273.32 2.24407 1068 60.6464Z;
                      M756 85C512 9.094 444-47 0 58.647V1180.61c208 0 261.596-55.47 524-55.47 304 0 469.038 79.18 784 119.86 251.97 32.54 400.25-87.81 493-119.86V9.094C1552 121 1024.54 168.54 756 85z
  ;"
          />
        </path>
      </svg>
      <Shop translate={data.translate} />
    </div>
  );
};

const Layout2 = (data) => {
  return (
    <div className="layout2">
      <div className="cards">
        <h2 className="h2-didot-reg">Discover my pieces of art</h2>
        <div className="card-wrapper">
          <Card
            src={process.env.PUBLIC_URL + "assets/img/ladies/Lady_DesertP.jpg"}
            name={"Lady Desert"}
            text={"landing_text_desert"}
            translate={data.translate}
            href={`${process.env.PUBLIC_URL}/product/61`}
          />
        </div>
        <div className="card-wrapper">
          {" "}
          <Card
            src={process.env.PUBLIC_URL + "assets/img/ladies/Lady_ForestP.jpg"}
            name={"Lady Forest"}
            text={"landing_text_forest"}
            translate={data.translate}
            href={`${process.env.PUBLIC_URL}/product/62`}
          />
        </div>
        <div className="card-wrapper">
          {" "}
          <Card
            src={process.env.PUBLIC_URL + "assets/img/ladies/Lady_TundraP.jpg"}
            name={"Lady Tundra"}
            text={"landing_text_tundra"}
            translate={data.translate}
            href={`${process.env.PUBLIC_URL}/product/59`}
          />
        </div>
      </div>
      <PathAnimated />
      <PlantCloudia />
      <BigHeart />
      <Contact />
    </div>
  );
};

class Landing extends Component {
  render() {
    const { translate } = this.props;

    return (
      <div className="l-landing-section-1">
        <Hero translate={translate} />
        <Layout1 translate={translate} />
        <Layout2 translate={translate} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(withTranslate(Landing));
