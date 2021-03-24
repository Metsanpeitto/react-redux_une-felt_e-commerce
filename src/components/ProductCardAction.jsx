import React, { Component } from "react";
import Frame from "../icons/Frame";
import withTranslate from "react-redux-multilingual/lib/withTranslate";
import { connect } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../actions/Index";
import ButtonNewLight from "./ButtonNewLight";
import FilledHeart from "../icons/FilledHeart";
import BlankHeart from "../icons/BlankHeart";

//  <p className="parraf-lg">{data.translate(data.text)}</p>
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inWishlist: null,
    };
    this.checkWish = this.checkWish.bind(this);
  }

  componentDidMount() {
    this.checkWish();
  }

  componentDidUpdate() {
    this.checkWish();
  }

  checkWish = () => {
    if (this.props.state.wishlist.list[0]) {
      const product = this.props.product;
      const list = this.props.state.wishlist.list;
      if (list[0].name) {
        var found = null;
        list.forEach((p) => {
          if (p.name === product.name) {
            found = true;
          }
        });

        if (!found) {
          if (this.state.inWishlist === true) {
            this.setState(() => {
              return {
                inWishlist: null,
              };
            });
          }
        } else {
          if (this.state.inWishlist === null) {
            this.setState(() => {
              return {
                inWishlist: true,
              };
            });
          }
        }
      }
    } else {
      if (this.state.inWishlist === true) {
        this.setState(() => {
          return {
            inWishlist: null,
          };
        });
      }
    }
  };

  render() {
    const data = this.props;
    if (data) {
      return (
        <div className="c-product-card-action">
          <Frame />
          <img src={data.src} alt="" className="card-img" />
          <h3 className="subtitle-lg"> {data.name}</h3>
          <h2 className="price">{data.price}</h2>
          <div
            className="heart"
            onClick={() => {
              if (!this.state.inWishlist) {
                return this.props.addToWishlist(data.product);
              } else {
                return this.props.removeFromWishlist(data.product);
              }
            }}
          >
            {this.state.inWishlist ? <FilledHeart /> : <BlankHeart />}
          </div>
          <p className="parraf-lg">{data.text}</p>
          <ButtonNewLight label="Know more" href={data.href} />
        </div>
      );
    } else return null;
  }
}

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, { addToWishlist, removeFromWishlist })(
  withTranslate(Card)
);
