import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
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
import SearchIcon from "../../icons/Search";
import Heart from "../../icons/BlankHeart";
import FilledHeart from "../../icons/FilledHeart";
import PlantTopCorner from "../../icons/PlantTopCorner";

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
      productName: "",
      productId: null,
      request: null,
      mobile: null,
    };
    this.openMenu = this.openMenu.bind(this);
    this.menuTrigger = this.menuTrigger.bind(this);
    this.menuShop = this.menuShop.bind(this);
    this.menuRead = this.menuRead.bind(this);
    this.menuSearch = this.menuSearch.bind(this);
    this.closeMenuTrigger = this.closeMenuTrigger.bind(this);
    this.closeMenuTriggerMobile = this.closeMenuTriggerMobile.bind(this);
    this.closeSubmenu = this.closeSubmenu.bind(this);
    this.parseProps = this.parseProps.bind(this);
    this.hoverItem = this.hoverItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    //  this.handleChange = this.handleChange.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOutside(event) {
    // const { sideMenu1, sideMenu2, sideMenu3 } = this.state;
    var closeMenus = true;
    if (event.toElement && event.toElement !== undefined) {
      const tag = event.toElement.tagName;
      if (tag === "LI" || tag === "UL" || tag === "A") {
        closeMenus = null;
      }
    }

    if (event.toElement) {
      let toElement = event.toElement;
      if (
        toElement.id === "sideMenu1" ||
        toElement.id === "sideMenu2" ||
        toElement.id === "sideMenu3"
      ) {
        closeMenus = null;
      }

      if (closeMenus) {
        this.closeMenuTrigger();
      }
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll); // Adds an event listener when the component is mount.
    const width = window.innerWidth;
    if (width <= 765) {
      this.setState(() => {
        return {
          visible: null,
          mobile: true,
        };
      });
    }
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
  UNSAFE_componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // This helps to open the selected produt in a dedicated window
  newTo(key, source, parentId) {
    if (key && key !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/${source}/${key}`,
        category: key,
        parentId: parentId,
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
    if (e.target.value) {
      if (e.target.value) {
        const name = e.target.value;
        this.setState(() => {
          return { productName: name };
        });
      }
    } else {
      this.setState(() => {
        return { productName: "" };
      });
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

  openMenu(e) {
    this.setState(() => {
      return { visible: true };
    });
  }

  // Display the menu with SHOP and READ
  menuTrigger() {
    //  document.querySelector(".subitem__read").classList.add("visible");
    //  document.querySelector(".subitem__shop").classList.add("visible");
  }

  menuRead() {
    if (this.state.categoryTreePosts) {
      if (this.state.categoryTreePosts.length > 1) {
        /*  this.state.categoryTreePosts.map((item) => {
          //if (item.id === "posts") {
          if (item) {
            // Products  id is 55
            this.setState(() => {
              return { sideMenu1: item.items, posts: item };
            });
          }
        });
        */
        this.setState(() => {
          return { sideMenu1: this.state.categoryTreePosts };
        });
      }
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
      this.state.categoryTree.forEach((item) => {
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
    document
      .querySelector(".menu-slide__1")
      .addEventListener("mouseout", this.handleClickOutside);
  }
  // Displays the second side-menu from the right

  menu2Trigger() {
    document.querySelector(".menu-slide__2").classList.add("visible");
    document
      .querySelector(".menu-slide__2")
      .addEventListener("mouseout", this.handleClickOutside);
  }
  // Displays the third side-menu from the right
  menu3Trigger() {
    document.querySelector(".menu-slide__3").classList.add("visible");
    document
      .querySelector(".menu-slide__3")
      .addEventListener("mouseout", this.handleClickOutside);
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
    //document.querySelector(".subitem__shop").classList.remove("visible");
    //document.querySelector(".subitem__read").classList.remove("visible");
    document.querySelector(".menu-slide__1").classList.remove("visible");
    document.querySelector(".menu-slide__2").classList.remove("visible");
    document.querySelector(".menu-slide__3").classList.remove("visible");
    document.querySelector(".menu-search").classList.remove("visible");

    this.setState(() => {
      return {
        menuOpen: null,
        menuShopOpen: null,
        menuReadOpen: null,
      };
    });
  }

  // Closes the menu in mobile version
  closeMenuTriggerMobile() {
    document.querySelector(".menu-slide").classList.remove("visible");
    //document.querySelector(".subitem__shop").classList.remove("visible");
    //document.querySelector(".subitem__read").classList.remove("visible");
    document.querySelector(".menu-slide__1").classList.remove("visible");
    document.querySelector(".menu-slide__2").classList.remove("visible");
    document.querySelector(".menu-slide__3").classList.remove("visible");
    document.querySelector(".menu-search").classList.remove("visible");

    this.setState(() => {
      return {
        menuOpen: null,
        menuShopOpen: null,
        menuReadOpen: null,
        visible: null,
      };
    });
  }

  // When mouse hover over a item in the sidemenu it display the items it contents
  hoverItem(e) {
    const name = e.target.name;
    var level = e.target.getAttribute("value");
    var id = null;
    var items = [];
    var postFlag = null;

    this.state.categoryTree.forEach((item) => {
      if (item.name) {
        if (item.name === name) {
          id = item.id;
        }
      }
    });

    if (!id) {
      this.state.categoryTreePosts.forEach((item) => {
        if (item.name) {
          if (item.name === name) {
            id = item.id;
            postFlag = true;
            level = 0;
          }
        }
      });
    }

    if (id) {
      if (postFlag) {
        this.state.categoryTreePosts.forEach((item) => {
          if (item.parent === id) {
            items.push(item);
          }
        });

        /*
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
   */
      } else {
        this.state.categoryTree.forEach((item) => {
          if (item.parent === id) {
            items.push(item);
          }
        });
      }

      if (level === 1) {
        this.setState(() => {
          return {
            sideMenu2: items,
          };
        });
        this.closeSubmenu();
        this.menu2Trigger();
      }

      if (level === 2) {
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
    // var functionToParse = null;

    if (data.level === 1) {
      menu = this.state.sideMenu1;
      // functionToParse = this.menu2Trigger;
    }
    if (data.level === 2) {
      menu = this.state.sideMenu2;
      // functionToParse = this.menu3Trigger;
    }
    if (data.level === 3) {
      menu = this.state.sideMenu3;
      // functionToParse = this.menu3Trigger;
    }
    if (menu) {
      if (menu.length > 0) {
        return (
          <ul>
            {menu.map((item, index) => {
              if (item) {
                if (item.id_post) {
                  return (
                    <li key={`${index}`}>
                      <Link
                        to={this.newTo(
                          item.id_post,
                          data.level > 1 ? "post" : "posts",
                          item.parent
                        )}
                        onClick={this.closeMenuTrigger}
                        onMouseOver={this.hoverItem}
                        key={item.name ? item.name : item.id_post}
                        name={item.name ? item.name : item.id_post}
                        value={data.level}
                      >
                        {item.title ? item.title : item.name}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={`${item.id}${index}`}>
                      <Link
                        to={this.newTo(
                          //  item.name ? item.name : item.id,
                          item.id,
                          data.level > 2 ? "product" : "collection",
                          item.parent
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
              } else return null;
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
        <div
          className={this.state.visible ? "burger__close" : "burger"}
          onClick={this.openMenu}
        >
          <Menu />
        </div>
        <Link
          to={`${process.env.PUBLIC_URL}/`}
          className="logo-link"
          data-lng="en"
        >
          <div className={"logo-mobile"}>
            <Logo />
          </div>
        </Link>

        <header
          className={
            this.state.visible
              ? "header grid-16"
              : "header header-close grid-16"
          }
        >
          <PlantTopCorner />
          <Link to={`${process.env.PUBLIC_URL}/`} data-lng="en">
            <div className={this.state.visible ? "logo  rotate" : "logo"}>
              <Logo />
            </div>
          </Link>

          <button
            className="invisible-button shop-link"
            onClick={this.menuShop}
          >
            {translate("shop")}
          </button>

          <button
            className="invisible-button shop-link"
            onClick={this.menuRead}
          >
            {translate("read")}
          </button>

          <button
            className="invisible-button shop-link"
            onClick={this.menuSearch}
            data-tip="Search"
          >
            <SearchIcon />
          </button>

          <Link to={`${process.env.PUBLIC_URL}/register`} data-lng="en">
            {logged ? (
              <div className="animation-emerge" data-tip={this.state.name}>
                <FilledMember />
              </div>
            ) : (
              <div data-tip="User Manager">
                <Member />
              </div>
            )}
          </Link>

          <Link to={`${process.env.PUBLIC_URL}/wishlist`} data-lng="en">
            {emptyWishlist ? (
              <div data-tip="Favourites Empty">
                <Heart />
              </div>
            ) : (
              <div className="animation-emerge" data-tip="Favourites">
                <FilledHeart />
              </div>
            )}
          </Link>

          <Link to={`${process.env.PUBLIC_URL}/cart`} data-lng="en">
            {emptyCart ? (
              <div data-tip="Cart Empty">
                <Cart />
              </div>
            ) : (
              <div className="animation-emerge" data-tip="Products in the Cart">
                <FilledCart />
              </div>
            )}
          </Link>

          {
            // When the app is in mobile version the scenario changes at the time of showing
            // the menu.
            // Mobile menu must always show the X 'close' button and give the option of open and
            // close when needed.

            !this.state.mobile ? (
              this.state.menuOpen ? (
                <button
                  className="invisible-button"
                  onClick={this.closeMenuTrigger}
                  data-tip="Close Menus"
                >
                  X
                </button>
              ) : null
            ) : this.state.visible ? (
              <button
                className="invisible-button"
                onClick={this.closeMenuTriggerMobile}
                data-tip="Close Menus"
              >
                X
              </button>
            ) : null
          }
        </header>
        <div>
          <ul className="menu-slide">
            <li id="sideMenu1" className="menu-slide__1 slide" level={1}>
              <this.DynamicMenu level={1} functionToParse={this.menu2Trigger} />
            </li>
            <li id="sideMenu2" className="menu-slide__2 slide" level={2}>
              <this.DynamicMenu level={2} functionToParse={this.menu3Trigger} />
            </li>
            <li id="sideMenu3" className="menu-slide__3 slide" level={3}>
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
              <button
                className="invisible-button"
                type="submit"
                onClick={this.handleSubmit}
              >
                <SearchIcon />
              </button>
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
