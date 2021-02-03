import React, { Component } from "react";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import { withTranslate } from "react-redux-multilingual";
import Loader from "../effects/loader/Loader";

class Lastest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null,
      id: null,
      name: null,
      pictures: [],
    };
    this.processProps = this.processProps.bind(this);
  }

  componentDidMount() {
    this.processProps();
  }

  componentDidUpdate() {
    this.processProps();
  }

  processProps = () => {
    if (this.props) {
      if (this.props.state.extras) {
        const extras = this.props.state.extras.extras;
        if (extras[0]) {
          if (extras[0].id !== this.state.id) {
            this.setState(() => {
              return {
                description: extras[0].description,
                id: extras[0].id,
                name: extras[0].name,
                pictures: extras[0].pictures,
              };
            });
          }
        }
      }
    }
  };

  render() {
    if (this.state.id) {
      return (
        <div className="l-lastest">
          <h1 className="l-lastest__header">{this.state.name}</h1>

          <div className="l-lastest__content">
            <p className="description">{this.state.description}</p>
            {this.state.pictures
              ? this.state.pictures.map((picture, index) => (
                  <LazyLoad>
                    <img key={index} alt="picures" src={picture}></img>
                  </LazyLoad>
                ))
              : null}
          </div>
        </div>
      );
    } else return <Loader />;
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(withTranslate(Lastest));
