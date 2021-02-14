import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import Button from "../../components/Button";

class LastestSection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var extras = this.props.state.extras.extras;
    return (
      <section>
        <section className="c-banner">
          <div className="c-banner__left">
            <div className="c-banner-text">
              <p className="c-banner-text__header">LASTEST CREATIONS</p>
              <h1 className="c-banner-text__big">Most recent creation</h1>
              <p className="c-banner-text__long"></p>
              <p className="c-banner-text__long">
                Here you can see the newest pieces added to the collection
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
                    process.env.PUBLIC_URL + "assets/img/hopper/landSide.jpg"
                  }
                  alt="lastest picture"
                  className="c-banner-src__scale"
                />
              </div>
              <div className="c-banner-src">
                <img
                  src={process.env.PUBLIC_URL + "assets/img/hopper/land.jpg"}
                  alt="lastest picture"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(
  mapStateToProps,
  {}
)(withTranslate(withRouter(LastestSection)));
