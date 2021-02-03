import React, { Component } from "react";
import MouseTooltip from "react-sticky-mouse-tooltip";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import Button from "../../components/Button";
import Hero from "./hero";
import LastestSection from "./LastestSection";
import Moving from "./Frames";
import Shop from "./Shop";
import Loader from "../../effects/loader/Loader";

import Video from "./pon.mp4";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: null,
    };
    this.checkProps = this.checkProps.bind(this);
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  checkProps() {
    // console.log(this.props.state.extras);
    if (this.props.state.extras && !this.state.loaded) {
      // console.log(this.props.state.extras);

      if (this.props.state.extras.extras) {
        const extras = this.props.state.extras.extras;
        this.setState(() => {
          return { loaded: true };
        });
      }
    }

    /* if (this.props.state.data.products && !this.state.loaded) {
      if (this.props.state.data.products.length > 1) {
        const products = this.props.state.data.products;
        this.setState(() => {
          return { loaded: true };
        });
      }
    }
    */
  }

  render() {
    const { translate } = this.props;

    return (
      <div>
        <section className="section__2">
          <Hero data={this.props} />
        </section>
        <section className="section__3 frame-canvas">
          <Moving />
        </section>
        <section className="section__3">
          <Shop translate={translate} />
        </section>
        <section className="section__3">
          <LastestSection translate={translate} />
        </section>
        <section className="section__3">
          <BackgroundVideo translate={translate} />
        </section>
      </div>
    );
  }
}

const BackgroundVideo = (props) => {
  const { translate } = props;
  return (
    <div className="l-landing-backgroundvideo">
      {/*<img
        src={process.env.PUBLIC_URL + "assets/img/workshop.jpeg"}
        alt="picture"
      />*/}

      <div className="white-screen"></div>

      <video
        autoPlay="autoplay"
        loop="loop"
        muted
        className="bg-video__content"
      >
        <source src={Video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
        <p>{translate("spark")}</p>

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
