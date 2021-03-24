import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import LazyLoad from "react-lazyload";
import NumberFormat from "react-number-format";
import store from "../../app/store";
import {
  addToCart,
  addSelectedProducts,
  addToWishlist,
  removeFromWishlist,
  getProducts,
  getAllCategories,
} from "../../actions/Index";
import Button from "../ButtonNew";
import Frame from "../Frame";
import BlankHeart from "../../icons/BlankHeart";
import FilledHeart from "../../icons/FilledHeart";
import LayoutBackground from "../../icons/LayoutBackground";

import RelatedProducts from "../../components/shop/common/RelatedProducts";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      item: null,
      itemId: null,
      inWishList: null,
      modalImage: null,
      reversedCategories: null,
      category: null,
      product: null,
      productsToShow: null,
      requesting: null,
    };
    this.modalTrigger = this.modalTrigger.bind(this);
    this.fetchSameCategoryProducts = this.fetchSameCategoryProducts.bind(this);
    this.checkWish = this.checkWish.bind(this);
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

  UNSAFE_componentWillMount() {
    if (this.props.item) {
      if (this.props.item.id) {
        this.fetchSameCategoryProducts();
        const categories = this.props.item.categories;
        const categoriesCopy = categories.map((x) => x);
        this.setState(() => {
          return {
            reversedCategories: categoriesCopy,
          };
        });
      }
    } else if (this.props.parentId) {
      this.props.getProducts(this.props.parentId);
    } else if (this.props.location.category !== undefined) {
      this.props.getProducts(this.props.parentId);
    } else {
      if (this.props.itemId && this.props.itemId !== undefined) {
        if (this.props.state.data2) {
          if (this.props.state.data2.categoryTree) {
            const categoryTree = this.props.state.data2.categoryTree;

            var parentId = null;
            if (categoryTree) {
              var length = (Math.log(this.props.itemId) * Math.LOG10E + 1) | 0;
              if (length > 2) {
                this.setState(() => {
                  return {
                    requesting: true,
                  };
                });
                this.props.getProducts("products");
              } else {
                categoryTree.forEach((c) => {
                  if (c.id === this.props.itemId) {
                    parentId = c.parent;
                    this.setState(() => {
                      return {
                        requesting: true,
                      };
                    });
                    this.props.getProducts(parentId);
                  }
                });
              }
            } else {
              this.setState(() => {
                return {
                  requesting: true,
                };
              });
              this.props.getCategories();
              this.props.getProducts("products");
            }
          }
        }
      }
    }
  }

  componentDidMount() {
    this.fetchSameCategoryProducts();
    if (this.props.item) {
      if (this.props.item.length > 0) {
        if (this.props.item !== undefined) {
          if (this.props.item !== this.state.item) {
            const categories = this.props.item.categories;
            if (categories) {
              var categoriesFiltered = [];
              categories.forEach((c) => {
                if (c.name !== "products") {
                  categoriesFiltered.push(c);
                }
              });
              var categoriesCopy = categoriesFiltered.map((x) => x);
              categoriesCopy.reverse();

              this.setState(() => {
                return {
                  item: this.props.item,
                  reversedCategories: categoriesCopy,
                };
              });
            } else {
              this.setState(() => {
                return {
                  item: this.props.item,
                };
              });
            }
          }
        }
      }
    }
    //this.checkWish();
  }

  componentDidUpdate() {
    if (!this.state.item) {
      if (this.props.state.data.products.length > 0) {
        var item = null;
        // This search for the itemId whithin products and fetch the item

        this.props.state.data.products.forEach((p) => {
          p.categories.forEach((c) => {
            if (c.id === this.props.itemId) {
              item = p;
              this.setState(() => {
                return {
                  item: p,
                  requesting: null,
                };
              });
            }
          });
        });

        // This get the categories that the item belongs to
        // and reverse they order. Then it fetches them.\
        if (item) {
          if (item.categories) {
            if (item.categories !== undefined) {
              const categories = item.categories;
              var categoriesFiltered = [];
              categories.forEach((c) => {
                if (c.name !== "products") {
                  categoriesFiltered.push(c);
                }
              });
              const categoriesCopy = categoriesFiltered.map((x) => x);
              this.setState(() => {
                return {
                  reversedCategories: categoriesCopy,
                };
              });
            }
          }
        } else if (!this.state.item && this.props.item !== this.state.item) {
          const categories = this.props.item.categories;
          categoriesFiltered = [];
          categories.forEach((c) => {
            if (c.name !== "products") {
              categoriesFiltered.push(c);
            }
          });
          const categoriesCopy = categoriesFiltered.map((x) => x);

          this.setState(() => {
            return {
              item: this.props.item,
              reversedCategories: categoriesCopy,
              requesting: null,
            };
          });
        }
      } else {
        if (
          this.props.itemId &&
          this.props.itemId !== undefined &&
          !this.state.requesting
        ) {
          this.setState(() => {
            return {
              requesting: true,
            };
          });
          this.props.getProducts(this.props.itemId);
        }

        if (this.props.item !== this.state.item) {
          this.setState(() => {
            return {
              item: this.props.item,
              requesting: null,
            };
          });
        }
      }
    } else {
      if (
        this.state.item.categoryId !== this.props.itemId &&
        this.state.productsToShow
      ) {
        this.state.productsToShow.forEach((p) => {
          if (p.categoryId === this.props.itemId) {
            this.setState(() => {
              return {
                item: p,
                requesting: null,
              };
            });
          }
        });
      } else if (
        this.state.item.categoryId !== this.props.itemId &&
        !this.state.requesting
      ) {
        const categoryTree = this.props.state.data2.categoryTree;
        var parentId = null;
        if (categoryTree) {
          categoryTree.forEach((c) => {
            if (c.id === this.props.itemId) {
              parentId = c.parent;

              this.props.getProducts(parentId);
              this.setState(() => {
                return {
                  requesting: true,
                };
              });
            }
          });
        } else {
          this.props.getCategories();
        }
      }
    }
    this.checkWish();
  }

  checkWish = () => {
    if (this.props.state.wishlist.list[0]) {
      const product = this.state.item;

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
          if (
            this.state.inWishlist === null ||
            this.state.inWishlist === undefined
          ) {
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

  fetchSameCategoryProducts = () => {
    if (this.props.state.data.products.length > 0 && !this.state.requesting) {
      if (!this.state.productsToShow || this.state.productsToShow.length > 0) {
        var productsToShow = this.props.state.data.products;
        this.setState(() => {
          return {
            productsToShow: productsToShow,
            requesting: null,
          };
        });
      }
    }
    return null;
  };

  onClickHandle(img) {
    this.setState({ image: img });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { translate } = this.props;
    const { modalImage, item, reversedCategories, inWishlist } = this.state;
    var productsToShow = this.state.productsToShow;
    if (reversedCategories && item) {
      return (
        <section className="c-product">
          <h1 className="h2-didot-reg">{translate("product_details")}</h1>
          <LayoutBackground />
          <div className="product  b-layout-card">
            <div className="product__left-panel">
              <div className="frame">
                <button
                  className="invisible-button"
                  onClick={this.modalTrigger}
                  img={item.pictures.length > 0 ? item.pictures[0] : null}
                >
                  <Frame img={item.pictures[0]} />
                </button>
              </div>
              <div className="images">
                {item.pictures.map((picture, index) => {
                  if (index <= 2) {
                    return (
                      <button
                        className="invisible-button"
                        key={index}
                        onClick={this.modalTrigger}
                        img={picture}
                        name={index}
                      >
                        <LazyLoad>
                          <img
                            src={picture}
                            className="product-variant images--1"
                            alt=""
                          />
                        </LazyLoad>
                      </button>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
            <div className="product__right-panel">
              <div className="right-panel__address">
                {reversedCategories.map((c, index) => (
                  <Link
                    to={this.newTo(c.id)}
                    key={c.name ? c.name : c.id}
                    name={c.name ? c.name : c.id}
                  >
                    <h6 className="parraf-lg" key={index}>
                      {c.name}
                    </h6>
                  </Link>
                ))}
              </div>
              <h2 className="right-panel__name h3-didot-reg">{item.name}</h2>
              <h3 className="right-panel__price price">
                <NumberFormat
                  value={item.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"€"}
                  renderText={(formattedValue) => <span>{formattedValue}</span>} // <--- Don't forget this!
                />
              </h3>
              <p className="right-panel__description parraf-lg">
                {item.description}
              </p>
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
                    if (!this.state.inWishlist) {
                      return this.props.addToWishlist(item);
                    } else {
                      return this.props.removeFromWishlist(item);
                    }
                  }}
                  className="button-wishlist"
                >
                  <button className="invisible-button">
                    {!inWishlist ? <BlankHeart /> : <FilledHeart />}
                  </button>
                </div>
              </div>
              <span className="right-panel__size label"></span>
            </div>
          </div>

          <div className="c-product__modal">
            <div className="modal-margin">
              <button className="invisible-button" onClick={this.modalTrigger}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>

              <div className="modal-image">
                <LazyLoad>
                  {" "}
                  <img alt="" src={`${modalImage}`} />
                </LazyLoad>
              </div>
            </div>
          </div>
          <RelatedProducts productsToShow={productsToShow} />
        </section>
      );
    } else {
      return (
        <section className="c-product">
          <h1 className="h2-didot-reg">{translate("product_details")}</h1>
          <LayoutBackground />
        </section>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  var itemId = parseInt(ownProps.match.params.id);
  var parentId = parseInt(ownProps.location.parentId);
  var item = null;
  // Here lets make a difference between itemCategoryId,
  //parentId and item itself
  if (state.data.product.length > 0) {
    item = state.data.product;
  }
  //var item = state.data.products.find((el) => el.id === productId);
  state.data.products.forEach((p) => {
    if (p.id === itemId) {
      item = p;
      return item;
    }
    if (p.name === ownProps.match.params.id) {
      item = p;
      return item;
    }
  });

  if (itemId) {
    return {
      item: item,
      itemId: itemId,
      symbol: state.data.symbol,
      parentId: parentId,
      state,
    };
  } else {
    return {
      item: null,
      itemId: null,
      parentId: null,
      symbol: state.data.symbol,
      state,
    };
  }
};

export default connect(mapStateToProps, {
  addToCart,
  addSelectedProducts,
  addToWishlist,
  removeFromWishlist,
  getProducts,
  getAllCategories,
})(withTranslate(Product));
