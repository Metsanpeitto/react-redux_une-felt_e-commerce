import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import Pace from "react-pace-progress";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { changeCurrency, searchProduct, logout } from "../../actions/Index";
import Input from "../../effects/input/Input";
import Cart from "../../icons/Cart";
import FilledCart from "../../icons/FilledGift";
import Logo from "../../icons/Logo";
import Member from "../../icons/Member";
import FilledMember from "../../icons/FilledMember";
import Menu from "../../icons/Menu";
import Search from "../../icons/Search";
import Heart from "../../icons/BlankHeart";
import FilledHeart from "../../icons/FilledHeart";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevScrollpos: window.pageYOffset,
      visible: true,
      menuOpen: null,
      menuReadOpen: null,
      menuShopOpen: null,
      sideMenu1: null,
      sideMenu2: null,
      sideMenu3: null,
      productName: undefined,
      productId: null,
    };
    this.menuTrigger = this.menuTrigger.bind(this);
    this.menuShop = this.menuShop.bind(this);
    this.menuRead = this.menuRead.bind(this);
    this.menuSearch = this.menuSearch.bind(this);
    this.closeMenuTrigger = this.closeMenuTrigger.bind(this);
    this.closeSubmenu = this.closeSubmenu.bind(this);
    this.parseProps = this.parseProps.bind(this);
    this.hoverItem = this.hoverItem.bind(this);
    //  this.handleChange = this.handleChange.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll); // Adds an event listener when the component is mount.
  }

  componentDidUpdate() {
    this.parseProps(); // Avoids parsing the props each time it updates if isnt needed
    if (this.props.state.data) {
      const data = this.props.state.data;

      // Find out if there is any product in the search and navigate to it if it's one.
      if (data.product_details === "notFound") {
      } else if (data.product_details.length > 0) {
        if (
          data.product_details.name
            .toUpperCase()
            .includes(this.state.productName.toUpperCase())
        ) {
          if (this.state.productId !== data.product_details.id) {
            this.setState(() => {
              return { productId: data.product_details.id };
            });
            document.querySelector(".menu-search").classList.remove("visible");
            this.props.history.push(
              `${process.env.PUBLIC_URL}/product/${data.product_details.id}`
            );
          }
        }
      }
    }
    //  Find out if the customer is logged in.
    if (this.props.state) {
      if (this.props.state.user.log) {
        if (this.props.state.user.log.userId) {
          const name = this.props.state.user.log.email;
          if (name !== this.state.name) {
            this.setState(() => {
              return {
                name: name,
              };
            });
          }
        }
      }
    }
  }

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // This helps to open the selected produt in a dedicated window
  newTo(key, source) {
    if (key && key !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/${source}/${key}`,
        category: key,
      };
    }
  }

  // Check for new items in the categorytree and if found, stores them in state
  parseProps() {
    if (this.props.state.data2.categoryTree !== this.state.categoryTree) {
      const categoryTree = this.props.state.data2.categoryTree;

      this.setState(() => {
        return {
          categoryTree: categoryTree,
        };
      });
    }

    if (
      this.props.state.posts.categoryTreePosts !== this.state.categoryTreePosts
    ) {
      const categoryTreePosts = this.props.state.posts.categoryTreePosts;

      this.setState(() => {
        return {
          categoryTreePosts: categoryTreePosts,
        };
      });
    }
  }

  handleChange = (e) => {
    if (e.target) {
      if (e.target.value) {
        const name = e.target.value;

        if (name !== undefined) {
          this.setState(() => {
            return { productName: name };
          });
        }
      }
    }
  };

  handleSubmit = () => {
    if (this.state.productName) {
      return this.props.searchProduct(this.state.productName);
    }
  };

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    var visible = prevScrollpos > currentScrollPos;

    if (prevScrollpos >= currentScrollPos || currentScrollPos === 0) {
      visible = true;
    }

    if (this.state.menuOpen) {
      visible = true;
    }

    const delay1 = 0.5;

    setTimeout(
      () =>
        this.setState({
          prevScrollpos: currentScrollPos,
          visible,
        }),
      delay1
    );
  };

  // Display the menu with SHOP and READ
  menuTrigger() {
    document.querySelector(".subitem__read").classList.add("visible");
    document.querySelector(".subitem__shop").classList.add("visible");
  }

  menuRead() {
    if (this.state.categoryTreePosts.length > 1) {
      this.state.categoryTreePosts.map((item) => {
        if (item.id === "posts") {
          // Products  id is 55
          this.setState(() => {
            return { sideMenu1: item.items, posts: item };
          });
        }
      });
    }
    this.menu1Trigger();
    this.setState(() => {
      return { menuOpen: true, menuRead: true };
    });
  }

  menuShop() {
    /* loading menus 
      1 - 1st menu loads all the products direct children  
    */
    if (this.state.categoryTree) {
      this.state.categoryTree.map((item) => {
        if (item.id === "shop") {
          // Products  id is 55
          this.setState(() => {
            return { sideMenu1: item.items, shop: item };
          });
        }
      });
    }
    this.menu1Trigger();
    this.setState(() => {
      return { menuOpen: true, menuShop: true };
    });
  }

  // Displays the first side-menu from the right
  menu1Trigger() {
    document.querySelector(".menu-slide__1").classList.add("visible");
  }
  // Displays the second side-menu from the right

  menu2Trigger() {
    document.querySelector(".menu-slide__2").classList.add("visible");
  }
  // Displays the third side-menu from the right
  menu3Trigger() {
    document.querySelector(".menu-slide__3").classList.add("visible");
  }

  closeSubmenu() {
    document.querySelector(".menu-slide__2").classList.remove("visible");
    document.querySelector(".menu-slide__3").classList.remove("visible");
  }

  // Displays the search side-menu, 1st from the right
  menuSearch() {
    this.closeMenuTrigger();
    this.closeSubmenu();
    document.querySelector(".menu-search").classList.add("visible");
    this.setState(() => {
      return {
        menuOpen: true,
        menuShopOpen: null,
        menuReadOpen: null,
      };
    });
  }

  // Closes any sidemenu open
  closeMenuTrigger() {
    document.querySelector(".menu-slide").classList.remove("visible");
    document.querySelector(".subitem__shop").classList.remove("visible");
    document.querySelector(".subitem__read").classList.remove("visible");
    document.querySelector(".menu-slide__1").classList.remove("visible");
    document.querySelector(".menu-slide__2").classList.remove("visible");
    document.querySelector(".menu-slide__3").classList.remove("visible");
    document.querySelector(".menu-search").classList.remove("visible");

    this.setState(() => {
      return { menuOpen: null, menuShopOpen: null, menuReadOpen: null };
    });
  }

  // When mouse hover over a item in the sidemenu it display the items it contents
  hoverItem(e) {
    const name = e.target.name;
    const level = e.target.getAttribute("value");

    var id = null;
    var items = [];
    var postFlag = null;

    this.state.categoryTree.map((item) => {
      if (item.name) {
        if (item.name === name) {
          id = item.id;
        }
      }
    });

    if (!id) {
      this.state.categoryTreePosts.map((item) => {
        if (item.name) {
          if (item.name === name) {
            id = item.id;
            postFlag = true;
          }
        }
      });
    }

    if (id) {
      if (postFlag) {
        this.state.categoryTreePosts.map((item) => {
          if (item.parent === id) {
            items.push(item);
          }
        });
        if (!items == []) {
          this.props.state.posts.posts.map((item) => {
            const len = item.categories.length;
            if (len > 1) {
              item.categories.map((c) => {
                if (c == id) {
                  items.push(item);
                }
              });
            } else {
              if (item.categories == id) {
                items.push(item);
              }
            }

            // if (item.parent === id) {
            //   items.push(item);
            // }
          });
        }
      } else {
        this.state.categoryTree.map((item) => {
          if (item.parent === id) {
            items.push(item);
          }
        });
      }

      if (level == 1) {
        this.setState(() => {
          return {
            sideMenu2: items,
          };
        });
        this.closeSubmenu();
        this.menu2Trigger();
      }

      if (level == 2) {
        this.setState(() => {
          return {
            sideMenu3: items,
          };
        });
        this.menu3Trigger();
      }
    }
  }

  // Loads the items required to display in an specific sidemnu
  DynamicMenu = (data) => {
    var menu = null;
    var search = true;
    var functionToParse = null;

    if (data.level == 1) {
      menu = this.state.sideMenu1;
      functionToParse = this.menu2Trigger;
    }
    if (data.level == 2) {
      menu = this.state.sideMenu2;
      functionToParse = this.menu3Trigger;
    }
    if (data.level == 3) {
      menu = this.state.sideMenu3;
      functionToParse = this.menu3Trigger;
    }
    if (menu) {
      if (menu.length > 0) {
        return (
          <ul>
            {menu[0].key ? (
              <Link
                to={`${process.env.PUBLIC_URL}/posts`}
                onClick={this.closeMenuTrigger}
                onMouseOver={this.hoverItem}
                key="all_posts"
                id="all_posts"
              >
                All Posts
              </Link>
            ) : null}
            {menu.map((item, index) => {
              if (item.id) {
                return (
                  <li key={`${item.id}${index}`}>
                    <Link
                      to={this.newTo(
                        item.name ? item.name : item.id,
                        data.level > 2 ? "product" : "collection"
                      )}
                      onClick={this.closeMenuTrigger}
                      onMouseOver={this.hoverItem}
                      key={item.name ? item.name : item.id}
                      name={item.name ? item.name : item.id}
                      value={data.level}
                    >
                      {item.name ? item.name : item.id}
                    </Link>
                  </li>
                );
              }
              if (item.id_post) {
                return (
                  <li key={`${item.id}${index}`}>
                    <Link
                      to={this.newTo(
                        item.name ? item.name : item.id_post,
                        data.level > 1 ? "post" : "posts"
                      )}
                      onClick={this.closeMenuTrigger}
                      onMouseOver={this.hoverItem}
                      key={item.id_post}
                      name={item.id_post}
                      value={data.level}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  render() {
    const { translate } = this.props;
    var emptyCart = true;
    var emptyWishlist = true;
    var logged = null;
    if (this.props.state.cartList) {
      if (this.props.state.cartList.cart[0]) {
        emptyCart = null;
      }
    }
    if (this.props.state.wishlist) {
      if (this.props.state.wishlist.list[0]) {
        emptyWishlist = null;
      }
    }
    if (this.state.name) {
      logged = true;
    }
    return (
      <div className="c-header" value={9}>
        <header
          className={this.state.visible ? "header" : "header header-close"}
        >
          {this.state.isLoading ? <Pace color="#27ae60" /> : null}

          <nav className="navbar">
            <Link to={`${process.env.PUBLIC_URL}/`} data-lng="en">
              <div className={this.state.visible ? "logo  rotate" : "logo"}>
                <Logo />
              </div>
            </Link>
            <ul className="menu  fade-in two">
              <li className="menu__item  fade-in subitem subitem__shop">
                <a href="#" onClick={this.menuShop}>
                  {translate("shop")}
                </a>
              </li>
              <li className="menu__item  fade-in subitem subitem__read">
                <a href="#" onClick={this.menuRead}>
                  {translate("read")}
                </a>
              </li>
              <li className="menu__item  fade-in search">
                <a href="#" onClick={this.menuSearch}>
                  <Search />
                </a>
              </li>
              <li className="menu__item fade-in member">
                <Link to={`${process.env.PUBLIC_URL}/register`} data-lng="en">
                  {logged ? (
                    <div className="animation-emerge">
                      <FilledMember />
                    </div>
                  ) : (
                    <Member />
                  )}
                </Link>
              </li>
              <li className="menu__item fade-in whislist">
                <Link to={`${process.env.PUBLIC_URL}/wishlist`} data-lng="en">
                  {emptyWishlist ? (
                    <Heart />
                  ) : (
                    <div className="animation-emerge">
                      <FilledHeart />
                    </div>
                  )}
                </Link>
              </li>
              <li className="menu__item fade-in cart ">
                <Link to={`${process.env.PUBLIC_URL}/cart`} data-lng="en">
                  {emptyCart ? (
                    <Cart />
                  ) : (
                    <div className="animation-emerge">
                      <FilledCart />
                    </div>
                  )}
                </Link>
              </li>
              <li className="menu__item fade-in menu ">
                {this.state.menuOpen ? (
                  <a href="#" onClick={this.closeMenuTrigger}>
                    X
                  </a>
                ) : (
                  <a href="#" onClick={this.menuTrigger}>
                    <Menu />
                  </a>
                )}
              </li>
            </ul>
            <div className="burger">
              <Menu />
            </div>
          </nav>
        </header>
        <div>
          <ul className="menu-slide">
            <li className="menu-slide__1 slide " level={1}>
              <this.DynamicMenu level={1} functionToParse={this.menu2Trigger} />
            </li>
            <li className="menu-slide__2 slide" level={2}>
              <this.DynamicMenu level={2} functionToParse={this.menu3Trigger} />
            </li>
            <li className="menu-slide__3 slide" level={3}>
              <this.DynamicMenu level={3} functionToParse={this.menu3Trigger} />
            </li>
          </ul>
        </div>

        <div className="menu-search">
          <div>
            <form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                id="productName"
                name="productName"
                label="Search a Product"
                value={this.state.productName}
                handleChange={this.handleChange}
              />
              <a href="#" type="submit" onClick={this.handleSubmit}>
                <Search />
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {
  changeCurrency,
  logout,
  searchProduct,
})(withTranslate(withRouter(Header)));
