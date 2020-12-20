import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import store from "../../app/store";
import {
  addToCart,
  addSelectedProducts,
  addToWishlist,
} from "../../actions/Index";
import Button from "../ButtonLight";
import Frame from "../Frame";
import BlankHeart from "../../icons/BlankHeart";
import FilledHeart from "../../icons/FilledHeart";
import { translate } from "react-redux-multilingual/lib/utils";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nav1: null,
      nav2: null,
      item: null,
      inWishList: null,
      modalImage: null,
      reversedCategories: null,
      category: null,
      productsToShow: null,
    };
    this.modalTrigger = this.modalTrigger.bind(this);
    this.fetchSameCategoryProducts = this.fetchSameCategoryProducts.bind(this);
  }

  // This helps to open the selected produt in a dedicated window
  newTo(key) {
    if (key && key !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/collection`,
        category: key,
      };
    }
  }

  handleClick(item) {
    store.addToCart(item, 1);
  }

  modalTrigger(e) {
    document.querySelector(".c-product__modal").classList.toggle("visible");
    const img = e.currentTarget.getAttribute("img");
    this.setState(() => {
      return { menuOpen: true, modalImage: img };
    });
  }

  componentWillMount() {
    if (this.props.product) {
      if (this.props.product.id) {
        this.fetchSameCategoryProducts();
        const categories = this.props.item.categories;
        const categoriesCopy = categories.map((x) => x);
        this.setState(() => {
          return {
            rating_count: this.props.product.rating_count,
            average_rating: this.props.product.average_rating,
            reversedCategories: categoriesCopy,
          };
        });
      }
    }
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
    this.fetchSameCategoryProducts();

    if (this.props.item) {
      if (this.props.item !== undefined) {
        if (this.props.item !== this.state.item) {
          const categories = this.props.item.categories;
          var categoriesCopy = categories.map((x) => x);
          categoriesCopy.reverse();

          this.setState(() => {
            return {
              item: this.props.item,
              reversedCategories: categoriesCopy,
            };
          });
        }
      }
    }
  }

  componentDidUpdate() {
    this.fetchSameCategoryProducts();
    if (this.props.item) {
      if (this.props.item !== undefined) {
        if (this.props.item !== this.state.item) {
          const categories = this.props.item.categories;
          const categoriesCopy = categories.map((x) => x);
          this.setState(() => {
            return {
              nav1: this.slider1,
              nav2: this.slider2,
              item: this.props.item,
              reversedCategories: categoriesCopy,
            };
          });
        }
      }
    }
  }

  onClickHandle(img) {
    this.setState({ image: img });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  fetchSameCategoryProducts = () => {
    if (this.props.item) {
      if (!this.state.productsToShow || this.state.productsToShow == []) {
        var category = null;

        if (this.props.item.category !== this.state.category) {
          category = this.props.item.category;
        }

        var productsToShow = [];
        if (this.props.state.data.products) {
          var products = this.props.state.data.products;
          if (products.length > 0) {
            products.map((product) => {
              product.categories.map((productCategory) => {
                if (productCategory.name) {
                  if (productCategory.name === category) {
                    productsToShow.push(product);
                  }
                  return null;
                }
              });
              return null;
            });
            if (this.state.productsToShow !== productsToShow) {
              this.setState(() => {
                return { productsToShow: productsToShow };
              });
              // this.props.addSelectedProducts(productsToShow);
            }
          }
        }

        return (category = this.props.category);
      }
    }
  };

  render() {
    const { product, item, state, translate } = this.props;
    const { modalImage, reversedCategories } = this.state;
    var inWishlist = null;
    if (this.props.state.wishlist.list) {
      if (this.props.state.wishlist.list[0]) {
        const list = this.props.state.wishlist.list;
        const item = this.props.item;
        list.map((i) => {
          if (i.name === item.name) {
            inWishlist = true;
          }
        });
      }
    }

    var productsToShow = this.state.productsToShow;
    if (reversedCategories) {
      return (
        <section className="c-product">
          <div className="c-product__left-panel">
            <div className="frame">
              <a href="#" onClick={this.modalTrigger} img={item.pictures[0]}>
                <Frame img={item.pictures[0]} />
              </a>
            </div>
            <div className="images">
              {item.pictures.map((picture, index) => {
                if (index <= 2) {
                  return (
                    <a
                      href="#"
                      key={index}
                      onClick={this.modalTrigger}
                      img={picture}
                      name={index}
                    >
                      <img
                        src={picture}
                        className="product-variant images--1"
                      />
                    </a>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
          <div className="c-product__right-panel">
            <div className="right-panel__address">
              {reversedCategories.map((c, index) => (
                <Link
                  to={this.newTo(c.name ? c.name : c.id)}
                  key={c.id}
                  name={c.name ? c.name : c.id}
                >
                  <h6 key={index}>{c.name}</h6>
                </Link>
              ))}
            </div>
            <h2 className="right-panel__name">{item.name}</h2>
            <h3 className="right-panel__price">
              {item.colors[0]} / {item.price}
            </h3>
            <p className="right-panel__description">{item.description}</p>
            <div className="right-panel__action">
              <div
                onClick={() => {
                  this.props.addToCart(item, 1);
                }}
              >
                <Button label="Add to cart" />{" "}
              </div>
              <div
                onClick={() => {
                  this.props.addToCart(item, 1);
                }}
              ></div>
              <div
                onClick={() => {
                  this.props.addToWishlist(item);
                }}
                className="button-wishlist"
              >
                <a href="#">{!inWishlist ? <BlankHeart /> : <FilledHeart />}</a>
              </div>
            </div>
            <h3 className="right-panel__size">Length/{item.size[0]}</h3>
          </div>

          <div className="c-product__modal">
            <div className="modal-margin">
              <a href="#" onClick={this.modalTrigger}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </a>

              <div className="modal-image">
                <img src={`${modalImage}`} />
              </div>
            </div>
          </div>

          <section className="c-product__related-products">
            <h2>{translate("related_product")}</h2>
            <div className="related-products__images">
              {productsToShow
                ? productsToShow.map((p, index) => (
                    <Link
                      to={`${process.env.PUBLIC_URL}/product/${p.id}`}
                      className="btn btn-solid"
                      key={index}
                    >
                      <div className="product-box__image">
                        <img src={p.pictures[0]} />
                      </div>
                    </Link>
                  ))
                : null}
            </div>
          </section>
        </section>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  var productId = parseInt(ownProps.match.params.id);
  var item = null;

  //var item = state.data.products.find((el) => el.id === productId);
  state.data.products.map((p) => {
    if (p.id === productId) {
      item = p;
      return item;
    }
    if (p.name === ownProps.match.params.id) {
      item = p;
      return item;
    }
  });

  var test = item;

  if (!test) {
    test = state.data.products.find((el) => el.id === productId);
    item = test;
  }

  if (item) {
    return {
      item: item,
      symbol: state.data.symbol,
      state,
    };
  } else {
    return {
      item: null,
      symbol: state.data.symbol,
      state,
    };
  }
};

export default connect(mapStateToProps, {
  addToCart,
  addSelectedProducts,
  addToWishlist,
})(withTranslate(Product));
