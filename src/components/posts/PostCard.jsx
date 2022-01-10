import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import "../../layout/landing/effect/css/demo.css";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.scriptLoaded = this.scriptLoaded.bind(this);
    this.mountScript = this.mountScript.bind(this);
    this.initEvents = this.initEvents.bind(this);
    this.getAnimeObj = this.getAnimeObj.bind(this);
    this.animate = this.animate.bind(this);

    this.state = {
      svg: null,
      path: null,
      paths: null,
      deco: null,
      image: null,
      title: null,
      subtitle: null,
      CONFIG: null,
      isActive: null,
      mouseTimeout: null,
      loaded: null,
      cateogry: null,
      page: null,
    };
  }
  componentDidMount() {
    var data = this.props.post;
    var category = data[2];
    var page = data[3];
    this.setState(() => {
      return {
        categoryId: category,
        page: page,
      };
    });

    this.mountScript();
  }

  componentDidUpdate() {
    //  this.mountScript();
  }

  componentWillUnmount() {
    this.setState(() => {
      return {
        svg: null,
        path: null,
        paths: null,
        deco: null,
        image: null,
        title: null,
        subtitle: null,
        CONFIG: null,
        isActive: null,
        mouseTimeout: null,
        page: 0,
        categoryId: null,
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
        categoryId: this.state.categoryId,
        page: this.state.page,
      };
    }
  }

  mountScript() {
    const existingScript = document.getElementById("anime");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `${process.env.PUBLIC_URL}  /js/anime.min.js`;
      script.id = "anime";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => this.scriptLoaded();
    } else {
      this.scriptLoaded();
    }
  }

  scriptLoaded() {
    var index = 0;
    if (this.props.post[1]) {
      index = this.props.post[1];
    }
    var svgs = Array.from(document.querySelectorAll(".item__svg"));
    var items = Array.from(document.querySelectorAll(".item"));

    let thisElement = items[index];

    const svg = svgs[index];

    var path = svg.querySelector("path");
    var paths = {};
    paths.start = path.getAttribute("d");
    paths.end = thisElement.dataset.morphPath;
    var deco = svg.querySelector(".item__deco");
    var image = svg.querySelector("image");
    var title = thisElement.querySelector(".item__meta > .item__title");
    var subtitle = thisElement.querySelector(".item__meta > .item__subtitle");

    var CONFIG = {
      // Defaults:
      animation: {
        path: {
          duration: thisElement.dataset.animationPathDuration || 1500,
          delay: thisElement.dataset.animationPathDelay || 0,
          easing: thisElement.dataset.animationPathEasing || "easeOutElastic",
          elasticity: thisElement.dataset.pathElasticity || 400,
          scaleX: thisElement.dataset.pathScalex || 0.8,
          scaleY: thisElement.dataset.pathScaley || 0.8,
          translateX: thisElement.dataset.pathTranslatex || 0,
          translateY: thisElement.dataset.pathTranslatey || 0,
          rotate: thisElement.dataset.pathRotate || 0,
        },
        image: {
          duration: thisElement.dataset.animationImageDuration || 2000,
          delay: thisElement.dataset.animationImageDelay || 0,
          easing: thisElement.dataset.animationImageEasing || "easeOutElastic",
          elasticity: thisElement.dataset.imageElasticity || 400,
          scaleX: thisElement.dataset.imageScalex || 1,
          scaleY: thisElement.dataset.imageScaley || 1,
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

    this.setState(() => {
      return {
        svg: svg,
        path: path,
        paths: paths,
        deco: deco,
        image: image,
        title: title,
        subtitle: subtitle,
        CONFIG: CONFIG,
      };
    });

    this.initEvents(thisElement);
  }

  initEvents(el) {
    this.mouseenterFn = () => {
      var mouseTimeout = setTimeout(() => {
        this.setState(() => {
          return {
            isActive: true,
          };
        });

        this.animate(el);
      }, 75);
      this.setState(() => {
        return {
          mouseTimeout: mouseTimeout,
        };
      });
    };

    this.mouseleaveFn = () => {
      clearTimeout(this.state.mouseTimeout);
      if (this.state.isActive) {
        this.setState(() => {
          return {
            isActive: null,
          };
        });
        this.animate(el);
      }
    };

    el.addEventListener("mouseenter", this.mouseenterFn);
    el.addEventListener("mouseleave", this.mouseleaveFn);
    el.addEventListener("touchstart", this.mouseenterFn);
    el.addEventListener("touchend", this.mouseleaveFn);
  }

  getAnimeObj(targetStr, el) {
    var CONFIG = null;
    var isActive = null;
    var paths = null;

    CONFIG = this.state.CONFIG;
    isActive = this.state.isActive;
    paths = this.state.paths;

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
        scaleX: isActive ? CONFIG.animation[targetStr].scaleX : 0.8,
        scaleY: isActive ? CONFIG.animation[targetStr].scaleY : 0.8,
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

  animate(el) {
    if (window.anime) {
      // Animate the path, the image and deco.
      window.anime(this.getAnimeObj("path", el));
      window.anime(this.getAnimeObj("image", el));
      window.anime(this.getAnimeObj("deco", el));
      // Title and Subtitle animation
      var title = null;
      var isActive = null;
      var subtitle = null;

      title = this.state.title;
      isActive = this.state.isActive;
      subtitle = this.state.subtitle;

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
    var post = null;
    var index = null;
    var idPost = null;

    if (this.props.post[0]) {
      post = this.props.post[0];
      index = this.props.post[1];
      idPost = this.props.post[0].id_post;
    }

    if (post) {
      if (post.p.excerpt) {
        if (post.p.content.rendered) {
          var img = post.thumbnail;
          var title = "title";

          var excerptRaw = post.p.excerpt.rendered;
          var result1 = excerptRaw.slice(1, -1);

          var mySubString = excerptRaw.substring(
            result1.indexOf("<p>") + 4,
            result1.indexOf(".") + 1
          );

          if (post.p.title) {
            var rend = post.p.title.rendered;
            title = rend.replace("&#8211;", "");
          }

          if (img) {
            return (
              <section className="postcard js ">
                <div className={`item__meta-${index}`}>
                  <div className="item__number item__blog">
                    <span className="item__specimen">.</span>
                    <span className="item__reference">.</span>
                  </div>
                  <h2 className="item__title">.</h2>
                </div>

                <div
                  id="blog"
                  className={`item item--style-${index}`}
                  data-animation-path-duration="1500"
                  data-animation-path-easing="easeOutElastic"
                  data-morph-path="M 418.1,159.8 C 460.9,222.9 497,321.5 452.4,383.4 417.2,432.4 371.2,405.6 271.3,420.3 137.2,440 90.45,500.6 42.16,442.8 -9.572,381 86.33,289.1 117.7,215.5 144.3,153.4 145.7,54.21 212.7,36.25 290.3,15.36 373.9,94.6 418.1,159.8 Z"
                  data-path-scaley=".6"
                  data-image-scalex="1"
                  data-image-scaley="1"
                  data-animation-deco-duration="2000"
                  data-animation-deco-delay="100"
                  data-deco-rotate="-10"
                  onClick={this.handleClick}
                >
                  <Link to={this.newTo(idPost, "post")}>
                    <svg
                      className="item__svg"
                      width="500px"
                      height="500px"
                      viewBox="0 0 500 500"
                    >
                      <clipPath id={`clipShape${index}`}>
                        <path
                          className="item__clippath"
                          d="M 378.1,121.2 C 408.4,150 417.2,197.9 411,245.8 404.8,293.7 383.5,341.7 353.4,370.7 303.2,419.1 198.7,427.7 144.5,383.8 86.18,336.5 67.13,221.3 111.9,161 138.6,125 188.9,99.62 240.7,90.92 292.4,82.24 345.6,90.32 378.1,121.2 Z"
                        />
                      </clipPath>
                      <g className="item__deco">
                        <use href="#deco2" />
                      </g>
                      <g clipPath={`url(#clipShape${index})`}>
                        <image
                          className="item__img"
                          href={process.env.PUBLIC_URL + img}
                          x="0"
                          y="0"
                          height="500px"
                          width="500px"
                        />
                      </g>
                    </svg>
                  </Link>
                  <div className="item__info">
                    <h2 className="info-title subtitle-lg">{title}</h2>

                    <p className="info-specimen parraf-lg  ">{mySubString}</p>

                    <p className="info-reference parraf-lg">
                      {`${post.date.monthWord} - ${post.date.day} - ${post.date.year}`}
                    </p>
                  </div>
                </div>
              </section>
            );
          }
        }
      }
    }
  }
}

//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {})(withTranslate(withRouter(Shop)));
