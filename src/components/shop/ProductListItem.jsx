import React, { Component } from "react";
import { Link } from "react-router-dom";
import withTranslate from "react-redux-multilingual/lib/withTranslate";
import { connect } from "react-redux";
import { addToWishlist } from "../../actions/Index";

import FilledHeart from "../../icons/FilledHeart";
import BlankHeart from "../../icons/BlankHeart";

class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      stock: "InStock",
      quantity: 1,
      image: "",
      grid: true,
      inWishlist: null,
    };
  }

  componentDidMount() {
    this.checkWish();
  }

  componentDidUpdate() {
    this.checkWish();
  }

  componentWillReceiveProps() {
    if (this.props.filters.grid !== this.state.grid) {
      this.setState(() => {
        return {
          grid: this.props.filters.grid,
        };
      });
    }
  }

  checkWish = () => {
    if (this.props.state.wishlist.list[0]) {
      const product = this.props.product;
      const list = this.props.state.wishlist.list;
      if (list[0].name) {
        list.map((p) => {
          if (p.name === product.name) {
            if (this.state.inWishlist === null) {
              this.setState(() => {
                return {
                  inWishlist: true,
                };
              });
            }
          }
        });
      }
    }
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }

  render() {
    const { product, translate } = this.props;

    const { inWishlist } = this.state;

    return (
      <div className="product-box">
        <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>
          <div className="product-box__image">
            <img src={product.pictures[0]} />
          </div>
        </Link>
        <div className="product-box__title">
          <h5>{product.name}</h5>
          <a
            href="#"
            onClick={() => {
              this.props.addToWishlist(product);
            }}
          >
            {!inWishlist ? <BlankHeart /> : <FilledHeart />}
          </a>
        </div>
        <div className="product-box__description">
          <p>{product.colors[0]}</p>
          <p>{product.price}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
  state: state,
});

export default connect(mapStateToProps, { addToWishlist })(
  withTranslate(ProductListItem)
);
