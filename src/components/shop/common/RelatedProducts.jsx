import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import Wave from "../../../icons/Wave";

class RelatedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { translate } = this.props;
    // Get the name of the product and from categories match the name to get
    // the desired Id.
    if (this.props.productsToShow) {
      if (this.props.productsToShow.length > 0) {
        return (
          <div className="c-product__related-products card-empty b-layout-card">
            <h2 className="h5-didot-reg">{translate("related_product")}</h2>

            <Wave />
            <div className="related-products__images">
              {this.props.productsToShow.map((p, index) =>
                index <= 3 ? (
                  <Link
                    to={`${process.env.PUBLIC_URL}/product/${p.categoryId}`}
                    className="btn btn-solid"
                    key={index}
                  >
                    <div className="product-box__image">
                      <img alt="" src={p.pictures[0]} />
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        );
      } else return null;
    } else return null;
  }
}

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, {})(withTranslate(RelatedProducts));
