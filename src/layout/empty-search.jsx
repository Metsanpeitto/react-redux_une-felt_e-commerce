import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import LazyLoad from "react-lazyload";

import Banner from "../elements/element-banner";

class EmptySearch extends Component {
  render() {
    const { translate } = this.props;
    return (
      <div>
        <section className="p-0">
          <div className="container">
            <Banner />
            <div className="row">
              <div className="col-sm-12">
                <div className="error-section">
                  <div className="empty-search-img">
                    <LazyLoad>
                      {" "}
                      <img
                        src={`${process.env.PUBLIC_URL}/assets/images/empty-search.jpg`}
                        className="img-fluid empty-search-img"
                        alt=""
                      />
                    </LazyLoad>
                  </div>
                  <div className="empty-search-button">
                    <button className="btn btn-solid">
                      {translate("back_home")}
                    </button>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withTranslate(EmptySearch);
