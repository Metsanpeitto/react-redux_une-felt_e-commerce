import React, { Component } from "react";
import { connect } from "react-redux";
import { clearCart } from "../../../../actions/Index";
import { withTranslate } from "react-redux-multilingual";
import StepIndex from "../../common/StepIndex";
import LayoutBackground from "../../../../icons/LayoutBackground";
import LittleHeartHappy from "../../../../icons/LittleHeartHappy";
import ButtonNewLight from "../../../ButtonNewLightBack";

class CheckoutSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.goBack = this.goBack.bind(this);
  }

  render() {
    return (
      <div className="c-checkout-success">
        <LayoutBackground />
        <h3 className="h2-didot-reg title">
          {/*translate("succesfully_ordered")*/}
          Done!
        </h3>
        <StepIndex index="4" />

        <div className="b-layout-card">
          <LittleHeartHappy />
          <h3 className="h5-didot-reg">
            {/*translate("succesfully_ordered")*/}
            Succesfully ordered
          </h3>
          <p className="parraf-reg">
            Thank you for your order, you should receive an e-mail confirmation
            soon :)
          </p>
          <ButtonNewLight label="Go Back" href={`${process.env.PUBLIC_URL}/`} />
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
