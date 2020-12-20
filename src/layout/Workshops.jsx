import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";

import Video from "../layout/landing/pon.webm";

class Workshops extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props);
    if (this.props) {
    }
  }

  render() {
    const videoSource = { Video };

    return (
      <div className="l-workshops">
        <h1 className="l-workshops__header">Workshops</h1>
        <div className="l-workshops__content">
          <p className="description">Description here</p>

          <div className="bg-video">
            <video
              autoPlay="autoplay"
              loop="loop"
              muted
              className="bg-video__content"
            >
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="l-workshops__information"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(withTranslate(Workshops));
