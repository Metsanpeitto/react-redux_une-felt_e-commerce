import React, { Component } from "react";
import withTranslate from "react-redux-multilingual/lib/withTranslate";
import { connect } from "react-redux";
import { addToWishlist } from "../../actions/Index";
import Card from "../ProductCardAction";

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

  UNSAFE_componentWillReceiveProps() {
    if (this.props.filters.grid !== this.state.grid) {
      this.setState(() => {
        return {
          grid: this.props.filters.grid,
        };
      });
    }
  }

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
    const { product } = this.props;
    const { inWishlist } = this.state;
    const { translate } = this.props;

    return (
      <div className="product-box">
        <Card
          src={product.pictures[0]}
          name={product.name}
          text={product.shortDetails}
          translate={translate}
          price={`${product.price}$`}
          inWishlist={inWishlist}
          product={product}
          href={`${process.env.PUBLIC_URL}/product/${product.id}`}
        />
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
