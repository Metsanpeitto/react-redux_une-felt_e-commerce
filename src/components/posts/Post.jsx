import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../effects/input/Input";
import Comments from "./Comments";
import shapes from "./shapes";

import "./demo.css";
import "./normalize.css";

// Helper vars and functions.
const extend = function (a, b) {
  for (let key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

// from http://www.quirksmode.org/js/events_properties.html#position
const getMousePos = function (ev) {
  let posx = 0;
  let posy = 0;
  if (!ev) ev = window.event;
  if (ev.pageX || ev.pageY) {
    posx = ev.pageX;
    posy = ev.pageY;
  } else if (ev.clientX || ev.clientY) {
    posx =
      ev.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy =
      ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return { x: posx, y: posy };
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.initShapeEl = this.initShapeEl.bind(this);
    this.initShapeLoop = this.initShapeLoop.bind(this);
    this.createScrollWatchers = this.createScrollWatchers.bind(this);
    this.checkProps = this.checkProps.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      svg: null,
      shapeEl: null,
      contentElems: null,
      contentLinks: null,
      footer: null,
      contentElemsTotal: null,
      img: null,
      title: null,
      posts: [],
      elements: [],
      comments: [],
      author: null,
      name: null,
    };

    const TiltObj = (el, options) => {
      var el = el;
      var options = extend({}, this.state.options);
      extend(this.options, options);

      var img = this.el.querySelector(".content__img");
      var title = this.el.querySelector(".content__title");
      this.setState(() => {
        return { img: img, title: title, el: el };
      });
      this._initEvents();
    };

    TiltObj.options = {
      movement: {
        img: { translation: { x: -40, y: -40 } },
        title: { translation: { x: 20, y: 20 } },
      },
    };

    TiltObj._initEvents = function () {
      this.mouseenterFn = (ev) => {
        window.anime.remove(this.state.img);
        window.anime.remove(this.state.title);
      };

      this.mousemoveFn = (ev) => {
        requestAnimationFrame(() => this._layout(ev));
      };

      this.mouseleaveFn = (ev) => {
        requestAnimationFrame(() => {
          window.anime({
            targets: [this.state.img, this.state.title],
            duration: 1500,
            easing: "easeOutElastic",
            elasticity: 400,
            translateX: 0,
            translateY: 0,
          });
        });
      };
      var el = this.state.el;
      el.addEventListener("mousemove", this.mousemoveFn);
      el.addEventListener("mouseleave", this.mouseleaveFn);
      el.addEventListener("mouseenter", this.mouseenterFn);
    };

    TiltObj._layout = function (ev) {
      // Mouse position relative to the document.
      const mousepos = getMousePos(ev);
      // Document scrolls.
      const docScrolls = {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop,
      };
      const bounds = this.el.getBoundingClientRect();
      // Mouse position relative to the main element (this.DOM.el).
      const relmousepos = {
        x: mousepos.x - bounds.left - docScrolls.left,
        y: mousepos.y - bounds.top - docScrolls.top,
      };

      // Movement settings for the animatable elements.
      const t = {
        img: this.options.movement.img.translation,
        title: this.options.movement.title.translation,
      };

      const transforms = {
        img: {
          x:
            ((-1 * t.img.x - t.img.x) / bounds.width) * relmousepos.x + t.img.x,
          y:
            ((-1 * t.img.y - t.img.y) / bounds.height) * relmousepos.y +
            t.img.y,
        },
        title: {
          x:
            ((-1 * t.title.x - t.title.x) / bounds.width) * relmousepos.x +
            t.title.x,
          y:
            ((-1 * t.title.y - t.title.y) / bounds.height) * relmousepos.y +
            t.title.y,
        },
      };

      var img = this.state.img;

      img.style.WebkitTransform = this.DOM.img.style.transform =
        "translateX(" +
        transforms.img.x +
        "px) translateY(" +
        transforms.img.y +
        "px)";

      var title = this.state.title;
      title.style.WebkitTransform = this.DOM.title.style.transform =
        "translateX(" +
        transforms.title.x +
        "px) translateY(" +
        transforms.title.y +
        "px)";

      this.setState(() => {
        return {
          img: img,
          title: title,
        };
      });
    };
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  checkProps() {
    if (this.props) {
      if (this.props.state) {
        if (this.props.state.posts && this.props.state.posts !== undefined) {
          if (this.props.item !== this.state.post) {
            const script = document.createElement("script");
            script.src = "/anime.min.js";
            script.src = "/backgroundShape.js";
            script.async = true;
            script.onload = () => this.scriptLoaded();
            document.body.appendChild(script);
            const posts = this.props.state.posts.posts;
            console.log(posts);
            this.setState(() => {
              return {
                posts: posts,
                prev: this.props.prev,
                post: this.props.item,
                next: this.props.next,
              };
            });
          }
        }
      }
    }
  }

  newTo(key) {
    if (key && key !== undefined) {
      return {
        pathname: `${process.env.PUBLIC_URL}/post/${key}`,
        category: key,
      };
    }
  }

  handleChange(e) {
    const n = e.currentTarget.value;
    const name = e.currentTarget.name;

    if (name === "password") {
      this.setState(() => {
        return { password: n };
      });
    }
    if (name === "name") {
      this.setState(() => {
        return { name: n };
      });
    }

    if (name === undefined) {
      if (this.state.checked === true) {
        this.setState(() => {
          return { checked: false };
        });
      } else {
        this.setState(() => {
          return { checked: true };
        });
      }
    }
  }

  CommentBox = (data) => {
    return (
      <form className="c-post__comment-form">
        <h3 id="reply-title" className="comment-reply-title">
          Leave a Reply{" "}
        </h3>
        <textarea
          id="comment"
          name="comment"
          title="Enter your comment here..."
          placeholder="Enter your comment here..."
          onChange={this.handleChange}
        ></textarea>
        <div className="comment-form-fields">
          <Input
            type="email"
            name="name"
            id="mail"
            label="mail"
            value={this.state.name}
            handleChange={this.handleChange}
          ></Input>

          <Input
            type="text"
            name="author"
            id="author"
            label="author"
            value={this.state.author}
            handleChange={this.handleChange}
          ></Input>

          <Input
            type="url"
            name="url"
            id="url"
            label="website"
            value={this.state.url}
            handleChange={this.handleChange}
          ></Input>
        </div>
      </form>
    );
  };

  scriptLoaded() {
    var svg = document.querySelector(".morph");
    if (svg) {
      var shapeEl = svg.querySelector("path");
      var contentElems = Array.from(document.querySelectorAll(".content-wrap"));
      var contentLinks = Array.from(
        document.querySelectorAll(".content__link")
      );
      var footer = document.querySelector(".content--related");
      var contentElemsTotal = contentElems.length;
      this.setState(() => {
        return {
          svg: svg,
          shapeEl: shapeEl,
          contentElems: contentElems,
          contentLinks: contentLinks,
          footer: footer,
          contentElemsTotal: contentElemsTotal,
        };
      });
      this.init();
    }
  }

  initShapeLoop(pos) {
    pos = pos || 0;
    window.anime.remove(this.state.shapeEl);
    window.anime({
      targets: this.state.shapeEl,
      easing: "linear",
      d: [
        { value: shapes[pos].pathAlt, duration: 1500 },
        { value: shapes[pos].path, duration: 1500 },
      ],
      loop: true,
      fill: {
        value: shapes[pos].fill.color,
        duration: shapes[pos].fill.duration,
        easing: shapes[pos].fill.easing,
      },
      direction: "alternate",
    });
  }

  initShapeEl() {
    window.anime.remove(this.state.svg);
    window.anime({
      targets: this.state.svg,
      duration: 1,
      easing: "linear",
      scaleX: shapes[0].scaleX,
      scaleY: shapes[0].scaleY,
      translateX: shapes[0].tx + "px",
      translateY: shapes[0].ty + "px",
      rotate: shapes[0].rotate + "deg",
    });

    this.initShapeLoop();
  }

  createScrollWatchers() {
    if (this.state.contentElems) {
      this.state.contentElems.forEach((el, pos) => {
        const scrollElemToWatch = pos
          ? this.state.contentElems[pos]
          : this.state.footer;
        pos = pos ? pos : this.state.contentElemsTotal;
        const watcher = window.scrollMonitor.create(scrollElemToWatch, -350);

        watcher.enterViewport(() => {
          this.setState(() => {
            return { step: pos };
          });
          var step = pos;
          window.anime.remove(this.state.shapeEl);
          window.anime({
            targets: this.state.shapeEl,
            duration: shapes[pos].animation.path.duration,
            easing: shapes[pos].animation.path.easing,
            elasticity: shapes[pos].animation.path.elasticity || 0,
            d: shapes[pos].path,
            fill: {
              value: shapes[pos].fill.color,
              duration: shapes[pos].fill.duration,
              easing: shapes[pos].fill.easing,
            },
            complete: () => {
              this.initShapeLoop(pos);
            },
          });

          window.anime.remove(this.state.svg);
          window.anime({
            targets: this.state.svg,
            duration: shapes[pos].animation.svg.duration,
            easing: shapes[pos].animation.svg.easing,
            elasticity: shapes[pos].animation.svg.elasticity || 0,
            scaleX: shapes[pos].scaleX,
            scaleY: shapes[pos].scaleY,
            translateX: shapes[pos].tx + "px",
            translateY: shapes[pos].ty + "px",
            rotate: shapes[pos].rotate + "deg",
          });
        });

        watcher.exitViewport(() => {
          const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

          if (idx <= this.state.contentElemsTotal && this.state.step !== idx) {
            var step = idx;
            this.setState(() => {
              return { step: step };
            });

            window.anime.remove(this.state.shapeEl);
            window.anime({
              targets: this.state.shapeEl,
              duration: shapes[idx].animation.path.duration,
              easing: shapes[idx].animation.path.easing,
              elasticity: shapes[idx].animation.path.elasticity || 0,
              d: shapes[idx].path,
              fill: {
                value: shapes[idx].fill.color,
                duration: shapes[idx].fill.duration,
                easing: shapes[idx].fill.easing,
              },
              complete: () => {
                this.initShapeLoop(idx);
              },
            });

            window.anime.remove(this.state.svg);
            window.anime({
              targets: this.state.svg,
              duration: shapes[idx].animation.svg.duration,
              easing: shapes[idx].animation.svg.easing,
              elasticity: shapes[idx].animation.svg.elasticity || 0,
              scaleX: shapes[idx].scaleX,
              scaleY: shapes[idx].scaleY,
              translateX: shapes[idx].tx + "px",
              translateY: shapes[idx].ty + "px",
              rotate: shapes[idx].rotate + "deg",
            });
          }
        });
      });
    }
  }

  init() {
    if (window.imagesLoaded) {
      window.imagesLoaded(document.body, () => {
        this.initShapeEl();
        this.createScrollWatchers();
        // Array.from(document.querySelectorAll(".content--layout")).forEach(
        Array.from(document.querySelectorAll(".c-post__content")).forEach(
          (el) => {
            const TiltObj = (el, options) => {
              var el = el;
              var options = extend({}, this.state.options);
              extend(this.options, options);

              var img = this.el.querySelector(".content__img");
              var title = this.el.querySelector(".content__title");
              this.setState(() => {
                return { img: img, title: title, el: el };
              });
              this._initEvents();
            };
          }
        );
        // Remove loading class from body
        document.body.classList.remove("loading");
      });
    }
  }

  Layout = (data) => {
    console.log(data);
    const layoutN = `content--layout-${data.index + 1}`;
    const srcImg = data.srcs;
    return (
      <div className="content-wrap">
        <div className={`content content--layout ${layoutN}`}>
          {srcImg
            ? srcImg.map((s, index) => {
                return (
                  <img
                    key={index}
                    className="content__img"
                    src={s}
                    alt="Some image"
                  />
                );
              })
            : null}
          <p className="content__title"></p>{" "}
          {data.text
            ? data.text.map((t, index) => {
                return <p key={index}>{t}</p>;
              })
            : null}
          <a href="#" className="content__link"></a>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.state);
    if (this.state.post) {
      const title = this.state.post.title;
      const prev = this.state.prev;
      const next = this.state.next;
      const elements = this.state.post.elements;
      const imgs = this.state.post.imgs;
      const text = this.state.post.text;
      const author = this.state.post.p.author == 1 ? "Pon" : "Other";
      const layouts = this.state.post.layouts;
      const id = this.state.post.p.id;

      var date = this.state.post.date;
      return (
        <section className="c-post">
          {layouts.length > 0 ? (
            <h1 id="title" className="c-post__title">
              {title}
            </h1>
          ) : null}
          <div className="c-post__navigation">
            <div className="arrows">
              <Link
                to={this.newTo(prev == undefined ? "#" : prev, "post")}
                onClick={this.closeMenuTrigger}
                onMouseOver={this.hoverItem}
                className="previous"
              >
                <i className="fas fa-arrow-left"></i>
              </Link>

              <div className="info">
                <h5 className="author">{`by ${author}`}</h5>
                <h5 className="date">{`${date.monthWord}  ${date.day}, ${date.year} `}</h5>
              </div>

              <Link
                to={this.newTo(next == undefined ? "#" : next, "post")}
                onClick={this.closeMenuTrigger}
                onMouseOver={this.hoverItem}
                className="next"
              >
                <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
          </div>

          <main>
            {" "}
            <div className="morph-wrap">
              <svg
                className="morph"
                width="1400"
                height="770"
                viewBox="0 0 1400 770"
              >
                <path d="M 262.9,252.2 C 210.1,338.2 212.6,487.6 288.8,553.9 372.2,626.5 511.2,517.8 620.3,536.3 750.6,558.4 860.3,723 987.3,686.5 1089,657.3 1168,534.7 1173,429.2 1178,313.7 1096,189.1 995.1,130.7 852.1,47.07 658.8,78.95 498.1,119.2 410.7,141.1 322.6,154.8 262.9,252.2 Z" />
              </svg>
            </div>{" "}
            {layouts.length > 0
              ? layouts.map((l, index) => {
                  return (
                    <this.Layout
                      key={index}
                      index={index}
                      srcs={l.srcs}
                      text={l.texts}
                    />
                  );
                })
              : null}
            <div>
              <section className="content content--related">
                {id ? <Comments postId={id} /> : null}
              </section>
            </div>
          </main>
        </section>
      );
    } else return <h1>Error</h1>;
  }
}

const mapStateToProps = (state, ownProps) => {
  var postId = null;
  var item = null;
  var next,
    prev = null;

  if (ownProps.match) {
    postId = parseInt(ownProps.match.params.id);
    if (state.posts.posts) {
      if (state.posts.posts !== "empty") {
        const posts = state.posts.posts;
        posts.map((p, index) => {
          if (p.p.id === postId) {
            item = p;
            if (posts[index - 1]) {
              prev = posts[index - 1].p.id;
            }

            if (posts[index + 1]) {
              next = posts[index + 1].p.id;
            }

            return item;
          }
        });
        var test = item;

        if (!test) {
          test = state.posts.posts.find((el) => el.id_post === postId);
          item = test;
        }

        if (item) {
          return {
            item: item,
            prev: prev,
            next: next,
            state,
          };
        } else {
          return {
            item: null,
            prev: null,
            next: null,
            state,
          };
        }
      }
    }
  }
};

export default connect(mapStateToProps, {})(Post);
