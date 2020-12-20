import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import Page404 from "../icons/Page404";

class PageNotFound extends Component {
  render() {
    const { translate } = this.props;
    return (
      <section className="l-404">
        <Page404 />
        <h2>{translate("page_not_found")}</h2>
        <a href="/" className="btn btn-solid">
          {translate("back_home")}
        </a>
      </section>
    );
  }
}

export default withTranslate(PageNotFound);
