import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import "./effect/css/demo.css";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.scriptLoaded = this.scriptLoaded.bind(this);
    this.mountScript = this.mountScript.bind(this);
    this.initEvents = this.initEvents.bind(this);
    this.getAnimeObj = this.getAnimeObj.bind(this);
    this.animate = this.animate.bind(this);

    this.state = {
      svg1: null,
      path1: null,
      paths1: null,
      deco1: null,
      image1: null,
      title1: null,
      subtitle1: null,
      CONFIG1: null,
      isActive1: null,
      mouseTimeout1: null,
      svg2: null,
      path2: null,
      paths2: null,
      deco2: null,
      image2: null,
      title2: null,
      subtitle2: null,
      CONFIG2: null,
      isActive2: null,
      mouseTimeout2: null,
      loaded: null,
    };
  }

  componentDidMount() {
    this.mountScript();
  }

  componentWillUnmount() {
    this.setState(() => {
      return {
        svg1: null,
        path1: null,
        paths1: null,
        deco1: null,
        image1: null,
        title1: null,
        subtitle1: null,
        CONFIG1: null,
        isActive1: null,
        mouseTimeout1: null,
        svg2: null,
        path2: null,
        paths2: null,
        deco2: null,
        image2: null,
        title2: null,
        subtitle2: null,
        CONFIG2: null,
        isActive2: null,
        mouseTimeout2: null,
        loaded: null,
      };
    });
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

  mountScript() {
    const existingScript = document.getElementById("anime");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `${process.env.PUBLIC_URL}  /js/anime.min.js`;
      script.id = "anime";
      script.async = false;
      document.body.appendChild(script);
      script.onload = () => this.scriptLoaded();
    }
  }

  // All the path animations and effects are managed from these functions.
  scriptLoaded() {
    var svgs = Array.from(document.querySelectorAll(".item__svg"));
    var items = Array.from(document.querySelectorAll(".item"));

    if (svgs.length > 1) {
      svgs.forEach((svg, index) => {
        let thisElement = null;
        if (index === 0) {
          thisElement = items[0];
        } else {
          thisElement = items[1];
        }

        var path = svg.querySelector("path");
        var paths = {};
        paths.start = path.getAttribute("d");
        paths.end = thisElement.dataset.morphPath;
        var deco = svg.querySelector(".item__deco");
        var image = svg.querySelector("image");
        var title = thisElement.querySelector(".item__meta > .item__title");
        var subtitle = thisElement.querySelector(
          ".item__meta > .item__subtitle"
        );

        var CONFIG = {
          // Defaults:
          animation: {
            path: {
              duration: thisElement.dataset.animationPathDuration || 1500,
              delay: thisElement.dataset.animationPathDelay || 0,
              easing:
                thisElement.dataset.animationPathEasing || "easeOutElastic",
              elasticity: thisElement.dataset.pathElasticity || 400,
              scaleX: thisElement.dataset.pathScalex || 1,
              scaleY: thisElement.dataset.pathScaley || 1,
              translateX: thisElement.dataset.pathTranslatex || 0,
              translateY: thisElement.dataset.pathTranslatey || 0,
              rotate: thisElement.dataset.pathRotate || 0,
            },
            image: {
              duration: thisElement.dataset.animationImageDuration || 2000,
              delay: thisElement.dataset.animationImageDelay || 0,
              easing:
                thisElement.dataset.animationImageEasing || "easeOutElastic",
              elasticity: thisElement.dataset.imageElasticity || 400,
              scaleX: thisElement.dataset.imageScalex || 1.1,
              scaleY: thisElement.dataset.imageScaley || 1.1,
              translateX: thisElement.dataset.imageTranslatex || 0,
              translateY: thisElement.dataset.imageTranslatey || 0,
              rotate: thisElement.dataset.imageRotate || 0,
            },
            deco: {
              duration: thisElement.dataset.animationDecoDuration || 2500,
              delay: thisElement.dataset.animationDecoDelay || 0,
              easing: thisElement.dataset.animationDecoEasing || "easeOutQuad",
              elasticity: thisElement.dataset.decoElasticity || 400,
              scaleX: thisElement.dataset.decoScalex || 0.9,
              scaleY: thisElement.dataset.decoScaley || 0.9,
              translateX: thisElement.dataset.decoTranslatex || 0,
              translateY: thisElement.dataset.decoTranslatey || 0,
              rotate: thisElement.dataset.decoRotate || 0,
            },
          },
        };

        if (index === 0) {
          this.setState(() => {
            return {
              svg1: svg,
              path1: path,
              paths1: paths,
              deco1: deco,
              image1: image,
              title1: title,
              subtitle1: subtitle,
              CONFIG1: CONFIG,
            };
          });
        } else {
          this.setState(() => {
            return {
              svg2: svg,
              path2: path,
              paths2: paths,
              deco2: deco,
              image2: image,
              title2: title,
              subtitle2: subtitle,
              CONFIG2: CONFIG,
            };
          });
        }
        this.initEvents(thisElement, index);
      });
    }
  }

  initEvents(el, index) {
    if (index === 0) {
      this.mouseenterFn = () => {
        var mouseTimeout = setTimeout(() => {
          this.setState(() => {
            return {
              isActive1: true,
            };
          });

          this.animate(el, 0);
        }, 75);
        this.setState(() => {
          return {
            mouseTimeout1: mouseTimeout,
          };
        });
      };

      this.mouseleaveFn = () => {
        clearTimeout(this.state.mouseTimeout1);
        if (this.state.isActive1) {
          this.setState(() => {
            return {
              isActive1: null,
            };
          });
          this.animate(el, 0);
        }
      };
    } else {
      this.mouseenterFn = () => {
        var mouseTimeout = setTimeout(() => {
          this.setState(() => {
            return {
              isActive2: true,
            };
          });

          this.animate(el, 1);
        }, 75);
        this.setState(() => {
          return {
            mouseTimeout2: mouseTimeout,
          };
        });
      };
      this.mouseleaveFn = () => {
        clearTimeout(this.state.mouseTimeout2);
        if (this.state.isActive2) {
          this.setState(() => {
            return {
              isActive2: null,
            };
          });
          this.animate(el, 1);
        }
      };
    }

    el.addEventListener("mouseenter", this.mouseenterFn);
    el.addEventListener("mouseleave", this.mouseleaveFn);
    el.addEventListener("touchstart", this.mouseenterFn);
    el.addEventListener("touchend", this.mouseleaveFn);
  }

  getAnimeObj(targetStr, index, el) {
    var CONFIG = null;
    var isActive = null;
    var paths = null;

    if (index === 0) {
      CONFIG = this.state.CONFIG1;
      isActive = this.state.isActive1;
      paths = this.state.paths1;
    } else {
      CONFIG = this.state.CONFIG2;
      isActive = this.state.isActive2;
      paths = this.state.paths2;
    }

    var target = null;
    if (targetStr === "item__deco") {
      target = el.getElementsByClassName(".item__deco");
    } else {
      target = el.getElementsByTagName(targetStr);
    }
    if (CONFIG.animation && window.anime) {
      let animeOpts = {
        targets: target,
        duration: CONFIG.animation[targetStr].duration,
        delay: CONFIG.animation[targetStr].delay,
        easing: CONFIG.animation[targetStr].easing,
        elasticity: CONFIG.animation[targetStr].elasticity,
        scaleX: isActive ? CONFIG.animation[targetStr].scaleX : 1,
        scaleY: isActive ? CONFIG.animation[targetStr].scaleY : 1,
        translateX: isActive ? CONFIG.animation[targetStr].translateX : 0,
        translateY: isActive ? CONFIG.animation[targetStr].translateY : 0,
        rotate: isActive ? CONFIG.animation[targetStr].rotate : 0,
      };
      if (targetStr === "path") {
        animeOpts.d = isActive ? paths.end : paths.start;
      }

      window.anime.remove(target);
      return animeOpts;
    } else return null;
  }

  animate(el, index) {
    if (window.anime) {
      // Animate the path, the image and deco.
      window.anime(this.getAnimeObj("path", index, el));
      window.anime(this.getAnimeObj("image", index, el));
      window.anime(this.getAnimeObj("deco", index, el));
      // Title and Subtitle animation
      var title = null;
      var isActive = null;
      var subtitle = null;
      if (index === 0) {
        title = this.state.title1;
        isActive = this.state.isActive1;
        subtitle = this.state.subtitle;
      }
      window.anime.remove(title);
      window.anime({
        targets: title,
        easing: "easeOutQuad",
        translateY: isActive
          ? [
              { value: "-50%", duration: 200 },
              { value: ["50%", "0%"], duration: 200 },
            ]
          : [
              { value: "50%", duration: 200 },
              { value: ["-50%", "0%"], duration: 200 },
            ],
        opacity: [
          { value: 0, duration: 200 },
          { value: 1, duration: 200 },
        ],
      });
      window.anime.remove(subtitle);
      window.anime({
        targets: subtitle,
        easing: "easeOutQuad",
        translateY: isActive
          ? { value: ["50%", "0%"], duration: 200, delay: 250 }
          : { value: "0%", duration: 1 },
        opacity: isActive
          ? { value: [0, 1], duration: 200, delay: 250 }
          : { value: 0, duration: 1 },
      });
    } else return null;
  }

  render() {
    return (
      <section className="layout1__shop js ">
        <div className="left-layout">
          <div className="item__meta-1">
            <div className="item__number item__blog">
              <span className="item__specimen">SHOP </span>
            </div>
            <h2 className="item__title">.</h2>
          </div>
          <FullAtom id="full-atom1" />
          <Link to={this.newTo("pieces", "collection")} className="shop-frame">
            <div
              id="shop"
              className="item item--style-1"
              data-animation-path-duration="800"
              data-animation-path-easing="easeInOutCubic"
              data-path-elasticity="300"
              data-morph-path="M 189,80.37 C 232.6,46.67 352.5,67.06 350.9,124.1 349.5,173.4 311.7,168 312.4,248.1 312.9,301.1 382.5,319.2 368.5,379.1 349.4,460.6 137.7,467.5 117.6,386.3 98.68,309.7 171.5,292.2 183.6,240.1 195.7,188.2 123.8,130.7 189,80.37 Z"
              data-path-scalex="0.8"
              data-path-scaley="1.1"
              data-path-translatex="0"
              data-path-translatey="30"
              data-path-rotate="5"
              data-animation-image-duration="800"
              data-animation-image-easing="easeInOutQuart"
              data-image-elasticity="300"
              data-image-scalex="1.2"
              data-image-scaley="1.2"
              data-image-translatex="-20"
              data-image-translatey="-45"
              data-image-rotate="-5"
              data-animation-deco-duration="1300"
              data-animation-deco-easing="easeOutQuad"
              data-deco-elasticity="300"
              data-deco-scalex="0.8"
              data-deco-scaley="0.9"
              data-deco-translatex="-5"
              data-deco-translatey="-5"
              data-deco-rotate="2"
              onClick={this.handleClick}
            >
              <svg
                className="item__svg"
                width="500px"
                height="500px"
                viewBox="0 0 500 500"
              >
                <clipPath id="clipShape1">
                  <path
                    className="item__clippath"
                    d="M 189,80.37 C 243,66.12 307.3,87.28 350.9,124.1 389.3,156.6 417,211.2 418.1,263.4 419.1,305.7 401.8,355.6 368.5,379.1 298.8,428 179.2,446.4 117.6,386.3 65.4,335.3 78.55,230.3 105.5,160.5 119.7,123.6 152.6,89.85 189,80.37 Z"
                  />
                </clipPath>
                <g className="item__deco">
                  <use href="#deco1" />
                </g>
                <g clipPath="url(#clipShape1)">
                  <image
                    className="item__img"
                    href={process.env.PUBLIC_URL + "assets/img/shop.jpg"}
                    x="0"
                    y="0"
                    height="500px"
                    width="500px"
                  />
                </g>
              </svg>
              <div className="item__meta">
                <div className="item__number">
                  <span className="item__specimen">. </span>
                  <span className="item__reference">. </span>
                </div>
                <h2 className="item__title">.</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="right-layout">
          <div className="item__meta-2">
            <div className="item__number">
              <span className="item__specimen">BLOG</span>
            </div>
            <h2 className="item__title">.</h2>
          </div>
          <FullAtom id="full-atom2" />
          <Link to={this.newTo("4", "posts")} className="blog-frame">
            <div
              id="blog"
              className="item item--style-2"
              data-animation-path-duration="1500"
              data-animation-path-easing="easeOutElastic"
              data-morph-path="M 418.1,159.8 C 460.9,222.9 497,321.5 452.4,383.4 417.2,432.4 371.2,405.6 271.3,420.3 137.2,440 90.45,500.6 42.16,442.8 -9.572,381 86.33,289.1 117.7,215.5 144.3,153.4 145.7,54.21 212.7,36.25 290.3,15.36 373.9,94.6 418.1,159.8 Z"
              data-path-scaley="1.1"
              data-image-scalex="1.3"
              data-image-scaley="1.3"
              data-animation-deco-duration="2000"
              data-animation-deco-delay="100"
              data-deco-rotate="-10"
              onClick={this.handleClick}
            >
              <svg
                className="item__svg"
                width="500px"
                height="500px"
                viewBox="0 0 500 500"
              >
                <clipPath id="clipShape2">
                  <path
                    className="item__clippath"
                    d="M 378.1,121.2 C 408.4,150 417.2,197.9 411,245.8 404.8,293.7 383.5,341.7 353.4,370.7 303.2,419.1 198.7,427.7 144.5,383.8 86.18,336.5 67.13,221.3 111.9,161 138.6,125 188.9,99.62 240.7,90.92 292.4,82.24 345.6,90.32 378.1,121.2 Z"
                  />
                </clipPath>
                <g className="item__deco">
                  <use href="#deco2" />
                </g>
                <g clipPath="url(#clipShape2)">
                  <image
                    className="item__img"
                    href={process.env.PUBLIC_URL + "assets/img/blog.jpg"}
                    x="0"
                    y="0"
                    height="500px"
                    width="500px"
                  />
                </g>
              </svg>
              <div className="item__meta">
                <div className="item__number item__blog">
                  <span className="item__specimen">.</span>
                  <span className="item__reference"> .</span>
                </div>
                <h2 className="item__title">.</h2>
              </div>
            </div>
          </Link>
        </div>
      </section>
    );
  }
}

//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {})(withTranslate(withRouter(Shop)));

const FullAtom = (data) => {
  return (
    <div className={data.id ? `${data.id}` : ""}>
      <div className="layer">
        <section className="atom-section">
          {/*<!-- this SVG is only to show the background line -->*/}
          <svg
            width="534"
            height="511"
            viewBox="0 0 534 511"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="atom-svg"
          >
            <g id="Card-1">
              <path
                id="orbit1"
                d="M432.109 380.903C463.093 328.506 467.634 217.518 425.515 148.062C383.395 78.6058 327.025 25.7607 249.38 10.0006C171.735 -5.7595 50.816 160.663 44.2192 223.119C37.6225 285.575 36.3631 334.787 91.7162 396.791C145.1 456.59 217.542 480.32 297.532 481.162C377.522 482.005 401.126 433.301 432.109 380.903Z"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          </svg>
          <div className="atom1"></div>
        </section>
      </div>
      <div className="layer">
        <section className="atom-section">
          {/*<!-- this SVG is only to show the background line -->*/}
          <svg
            width="534"
            height="511"
            viewBox="0 0 534 511"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Card-1">
              <path
                id="orbit2"
                d="M81.1573 400.635C141.301 430.858 283.782 448.264 370.772 419.503C457.763 390.742 497.434 344.102 523.12 281.246C548.806 218.39 384.691 98.3779 284.286 68.1004C183.88 37.8228 90.3501 127.249 90.3501 127.249C90.3501 127.249 15.9061 186.052 7.90851 252.154C-0.089093 318.257 21.0135 370.411 81.1573 400.635Z"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          </svg>

          <div className="atom2"></div>
        </section>
      </div>

      <div className="layer">
        <section className="atom-section">
          {/*<!-- this SVG is only to show the background line -->*/}
          <svg
            width="534"
            height="511"
            viewBox="0 0 534 511"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Card-1">
              <path
                id="orbit3"
                d="M53.0927 121.807C18.7872 172.771 21.4271 270.862 59.0314 342.101C96.6357 413.341 175.803 448.413 252.332 467.593C328.861 486.773 458.17 387.585 491.157 303.194C524.143 218.802 406.71 94.4083 406.71 94.4083C406.71 94.4083 333.481 28.6477 253.652 24.264C173.823 19.8802 87.3983 70.8435 53.0927 121.807Z"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          </svg>

          <div className="atom3"></div>
        </section>
      </div>
    </div>
  );
};
