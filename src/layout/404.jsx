import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import Page404 from "../icons/Page404";
import Search from "../components/Search";

class PageNotFound extends Component {
  render() {
    return (
      <section className="l-404">
        <div className="illustration">
          <Page404 />
        </div>
        <Search />
      </section>
    );
  }
}

export default withTranslate(PageNotFound);
