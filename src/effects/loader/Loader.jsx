import React, { Component } from "react";

import "./demo.css";
import "./loaders.css";

class Loader extends Component {
  constructor(props) {
    super(props);
  }

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
