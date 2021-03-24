import React, { Component } from "react";
import { connect } from "react-redux";
import LayoutBackground from "../icons/LayoutBackground";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // This helps to open the selected produt in a dedicated window
  newTo(key) {
    if (key && key !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/post/${key}`,
        category: key,
      };
    }
  }

  render() {
    return (
      <section className="l-layout">
        <LayoutBackground />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

export default connect(mapStateToProps, {})(Layout);
