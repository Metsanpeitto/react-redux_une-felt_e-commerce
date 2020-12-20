import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withTranslate } from "react-redux-multilingual";
import Button from "../Button";
import Empty from "../../icons/EmptyWishlist";
import {
  addToCartAndRemoveWishlist,
  removeFromWishlist,
} from "../../actions/Index";

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
    console.log(this.props);
    var Items = [];
    Items = this.props.Items;
    console.log(Items);

    return (
      <div>
        {Items.length > 0 ? (
          <section className="c-wishlist">
            {" "}
            <h1> {translate("wishlist")}</h1>
            <div className="c-wishlist__table ">
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
                      <a
                        href="#"
                        className="qty-box__btn right-plus"
                        onClick={() =>
                          this.props.addToCartAndRemoveWishlist(item, 1)
                        }
                        data-type="plus"
                        disabled={item.qty >= item.stock ? true : false}
                      >
                        <i class="fas fa-plus"></i>{" "}
                      </a>{" "}
                      <a
                        href="#"
                        className="remove"
                        onClick={() => this.props.removeFromWishlist(item)}
                      >
                        <i className="fa fa-times" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="c-wishlist__buttons">
              <Link to={`${process.env.PUBLIC_URL}/collection`}>
                <Button label={translate("back_shop")} />
              </Link>

              <Link to={`${process.env.PUBLIC_URL}/cart`}>
                <Button label={translate("cart")} />
              </Link>
            </div>
          </section>
        ) : (
          <section className="c-wishlist__empty">
            <h1> {translate("empty_wishlist")}</h1>
            <div className="panel">
              <Empty />
            </div>
          </section>
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
