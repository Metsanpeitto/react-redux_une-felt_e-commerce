import React, { Component } from "react";
import MouseTooltip from "react-sticky-mouse-tooltip";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import Button from "../../components/Button";
import Hero from "./hero";
import Moving from "./Frames";

function Landing(props) {
  const { translate } = props;

  return (
    <div>
      <section className="section__2">
        <Hero data={props} />
      </section>
      <section>
        <Moving />
      </section>
      <section className="section__3">
        <BackgroundVideo translate={translate} />
      </section>
    </div>
  );
}

const BackgroundVideo = (props) => {
  const { translate } = props;
  return (
    <div className="l-landing-backgroundvideo">
      <img
        src={process.env.PUBLIC_URL + "assets/img/workshop.jpeg"}
        alt="lastest picture"
      />
      <MouseTooltip
        visible={true}
        offsetX={0}
        offsetY={0}
        className="mouse-tool-tip"
      >
        <Circle translate={translate} />
      </MouseTooltip>
      <div className="bg-text">
        <h1>{translate("online_workshops")}</h1>
        <p>{translate("take_look_blog")}</p>
        <p>{translate("or_get_gift")}</p>
        <Button
          label={translate("learn_more")}
          href={`${process.env.PUBLIC_URL}/workshops`}
        />
      </div>
    </div>
  );
};

const Circle = (props) => {
  const { translate } = props;

  return (
    <div id="container-circle">
      <div id="circle">
        <svg
          version="1.1"
          x="50px"
          y="0px"
          width="300px"
          height="300px"
          viewBox="0 0 300 300"
          enableBackground="new 0 0 300 300"
          space="preserve"
        >
          <defs>
            <path
              id="circlePath"
              d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
            />
          </defs>
          <circle cx="150" cy="100" r="75" fill="none" />
          <g>
            <use href="#circlePath" fill="none" />
            <text fill="#d28e77">
              <textPath href="#circlePath">{translate("circle_path")}</textPath>
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {})(withTranslate(Landing));
