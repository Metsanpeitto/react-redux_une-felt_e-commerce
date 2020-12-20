import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

import { connect } from "react-redux";

class Tutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      modalOpen: null,
      menuOpen: null,
      shopOpen: null,
      productName: "",
      navigateTo: "",
    };
  }
  render() {
    return {};
  }
}
//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(
  mapStateToProps,
  {}
)(withTranslate(Tutorial));
