import React from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from "react-stripe-elements";
import axios from "axios";

import ButtonNew from "../../../ButtonNew";

//4242424242424242

//const urlCharge =
//  process.env.NODE_ENV.trim() === "production"
//    ? `https://waldenberginc.com:7000/stripe`
//    : "http://localhost:7000/stripe";
//const urlCharge ='http://waldenberginc.com/api/stripe/charge'
const urlCharge = `https://une-felt.com/stripe`;

const newTo = (data) => {
  return {
    pathname: `${process.env.PUBLIC_URL}/checkout-success`,
    data: data,
  };
};

const CheckoutForm = ({
  selectedProduct,
  stripe,
  history,
  total,
  email,
  doOrder,
  clientData,
  translate,
}) => {
  if (selectedProduct === null) history.push("/");

  const handleSubmit = async (event) => {
    event.preventDefault();
    var amount = total * 100;
    amount = amount.toString();
    const { token } = await stripe.createToken();
    const order = await axios
      .post(urlCharge, {
        amount: amount,
        source: token.id,
        receipt_email: email,
      })
      .catch((e) => {
        console.log(e);
      });
    var receiptUrl = "";
    if (order) {
      receiptUrl = order.data;
      doOrder(true);
      const data = [receiptUrl, clientData];
      history.push(newTo(data));
    } else {
      console.log("error");
    }

    //history.push(`${process.env.PUBLIC_URL}/order-success`);
    //this.props.placeOrder(this.createOrderData());
  };

  return (
    <div className="checkout-form">
      <div className="checkout-form__form ">
        <h6 className="checkout--text">{translate("introduce_credit")}</h6>

        <div className="checkout--total">
          <p className="subtitle-lg">{translate("total")}</p>
          <p className="price"> {total} $ </p>
        </div>

        <div className="checkout--item">
          <p className="subtitle-lg">{translate("card_details")}</p>
          <CardNumberElement />
        </div>
        <div className="checkout--expiration">
          <div>
            <p className="subtitle-lg"> {"expiration_date"}</p>

            <CardExpiryElement />
          </div>
          <div>
            <p className="subtitle-lg">{translate("cvc")}</p>

            <CardCVCElement />
          </div>
        </div>
      </div>
      <div className="checkout-form__button">
        <ButtonNew
          type="button"
          className="btn-solid btn"
          handler={handleSubmit}
          label={translate("pay")}
        ></ButtonNew>
      </div>
    </div>
  );
};

//export default injectStripe(CheckoutForm);
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(
  injectStripe(withTranslate(CheckoutForm))
);
