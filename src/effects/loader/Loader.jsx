import React, { Component } from "react";

class Loader extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="b-effects-loader">
        <div className="loader-inner ball-pulse">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="tooltip"></span>
      </div>
    );
  }
}
export default Loader;
