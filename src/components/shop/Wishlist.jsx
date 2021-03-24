import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withTranslate } from "react-redux-multilingual";
import Empty from "./common/Empty";
import {
  addToCartAndRemoveWishlist,
  removeFromWishlist,
} from "../../actions/Index";
import LayoutBackground from "../../icons/LayoutBackground";
import ButtonNewLightBack from "../../components/ButtonNewLightBack";
import ButtonNew from "../../components/ButtonNew";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  render() {
    const { translate } = this.props;
    var Items = [];
    Items = this.props.Items;

    return (
      <div>
        {Items.length > 0 ? (
          <section className="c-wishlist">
            <LayoutBackground />

            <h1 className="h2-didot-reg"> {translate("wishlist")}</h1>
            <div className="c-wishlist__table b-layout-card">
              <div className="table-head">
                <h4>{translate("image")}</h4>
                <h4>{translate("product_name")}</h4>
                <h4>{translate("price")}</h4>
                <h4>{translate("availability")}</h4>
                <h4>{translate("action")}</h4>
              </div>
              {Items.map((item, index) => {
                return (
                  <div key={index} className="table-item">
                    <div>
                      <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
                        <img
                          src={item.pictures[0]}
                          alt="Model posing long coat jacket"
                          className=""
                        />
                      </Link>
                    </div>
                    <div>
                      <Link to={`${process.env.PUBLIC_URL}/product/${item.id}`}>
                        <h2 className="cart-item-name">{item.name}</h2>
                      </Link>
                    </div>
                    <div>
                      <NumberFormat
                        value={item.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"€ "}
                        renderText={(formattedValue) => (
                          <h2>
                            <span>{formattedValue}</span>
                          </h2>
                        )} // <--- Don't forget this!
                      />
                    </div>

                    <div>
                      {item.qty >= item.stock ? (
                        <h2>Out of Stock</h2>
                      ) : (
                        <h2>Yes</h2>
                      )}
                    </div>

                    <div>
                      <button
                        className="qty-box__btn right-plus invisible-button"
                        onClick={() =>
                          this.props.addToCartAndRemoveWishlist(item, 1)
                        }
                        data-type="plus"
                        disabled={item.qty >= item.stock ? true : false}
                      >
                        <i className="fas fa-plus"></i>{" "}
                      </button>{" "}
                      <button
                        className="remove invisible-button"
                        onClick={() => this.props.removeFromWishlist(item)}
                      >
                        <i className="fa fa-times" />
                      </button>
                    </div>
                  </div>
                );
              })}{" "}
              <div className="c-wishlist__buttons">
                <ButtonNewLightBack
                  href={`${process.env.PUBLIC_URL}/collection`}
                  label={translate("back_shop")}
                />

                <ButtonNew
                  href={`${process.env.PUBLIC_URL}/cart`}
                  label={translate("cart")}
                />
              </div>
            </div>
          </section>
        ) : (
          <Empty text="Whislist" longText="Empty wishlist" />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  state: state,
  Items: state.wishlist.list,
  symbol: state.data.symbol,
});

export default connect(mapStateToProps, {
  addToCartAndRemoveWishlist,
  removeFromWishlist,
})(withTranslate(Wishlist));
