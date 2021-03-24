import React, { Component } from "react";
import { connect } from "react-redux";
import { clearCart } from "../../../../actions/Index";
import { withTranslate } from "react-redux-multilingual";
import StepIndex from "../../common/StepIndex";
import LayoutBackground from "../../../../icons/LayoutBackground";
import LittleHeartHappy from "../../../../icons/LittleHeartHappy";
import ButtonNewLight from "../../../ButtonNewLightBack";

class CheckoutSuccess extends Component {
  render() {
    return (
      <div className="c-checkout-success">
        <LayoutBackground />
        <h3 className="h2-didot-reg title">
          {/*translate("succesfully_ordered")*/}
          Done!
        </h3>
        <StepIndex />

        <div className="l-layout-card">
          <LittleHeartHappy />
          <h3 className="h5-didot-reg">
            {/*translate("succesfully_ordered")*/}
            Succesfully ordered
          </h3>
          <p className="parraf-reg">
            Thank you for your order, you should receive an e-mail confirmation
            soon :)
          </p>
          <ButtonNewLight />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {
  clearCart,
})(withTranslate(CheckoutSuccess));
