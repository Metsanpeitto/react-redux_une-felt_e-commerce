import React, { Component } from "react";
import { Link } from "react-router-dom";
////import "./css/normalize.css";
//import "./css/demo.css";
import "./css/style-mohe.css";
//import "./pater/pater.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classIndex: null,
    };
    this.initEvents = this.initEvents.bind(this);
    this.mouseenterFn = this.mouseenterFn.bind(this);
    this.mouseleaveFn = this.mouseleaveFn.bind(this);
    this.scriptLoaded = this.scriptLoaded.bind(this);
    this.mountScript = this.mountScript.bind(this);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    this.mountScript();
  }

  componentDidUpdate() {
    this.mountScript();
  }

  mountScript() {
    const script = document.createElement("script");
    script.src = "/charming.min.js";
    script.src = "/anime.min.js";
    // script.src = "/charming.min.js";
    script.async = true;
    script.onload = () => this.scriptLoaded();
    document.body.appendChild(script);
  }

  mouseenterFn = (e) => {
    this.mouseTimeout = setTimeout(() => {
      this.isActive = true;

      window.anime.remove(this.nameLetters);
      window.anime({
        targets: this.nameLetters,
        duration: 800,
        easing: [0.7, 0, 0.3, 1],
        scale: (t, i) => [1, window.anime.random(0, 1) ? 0.8 : 1.4],
        translateX: (t, i) => {
          const elBounds = e.srcElement.getBoundingClientRect();
          // const elBounds = this.rect;
          const x1 = elBounds.left + elBounds.width / 2;
          const y1 = elBounds.top + elBounds.height / 2;

          const targetBounds = t.getBoundingClientRect();
          const x2 = targetBounds.left + targetBounds.width / 2;
          const y2 = targetBounds.top + targetBounds.height / 2;

          const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          const maxDist = Math.sqrt(
            Math.pow(elBounds.left - x1, 2) + Math.pow(elBounds.top - y1, 2)
          );
          const maxTX = x2 < x1 ? -250 : 250;

          return (maxTX / maxDist) * dist;
        },
        translateY: (t, i) => [0, window.anime.random(-40, 40)],
        rotateZ: (t, i) => [0, window.anime.random(-20, 20)],
        opacity: (t, i) => 1,
      });
    }, 50);
  };

  mouseleaveFn = () => {
    clearTimeout(this.mouseTimeout);
    if (!this.isActive) return;
    this.isActive = false;
    if (window.anime) {
      window.anime.remove(this.nameLetters);
      window.anime({
        targets: this.nameLetters,
        duration: 800,
        easing: [0.7, 0, 0.3, 1],
        scale: 1,
        translateX: 0,
        translateY: 0,
        rotateZ: 0,
        opacity: 1,
      });
    }
  };

  scriptLoaded() {
    if (this.props.name) {
      this.el = document;
      this.name = this.el.getElementById(this.props.name);
      //this.name = this.el.
      if (this.name) {
        if (window.charming) {
          window.charming(this.name);
          this.nameLetters = Array.from(this.name.querySelectorAll("span"));
          this.initEvents();
        }
      }
    }
  }

  initEvents() {
    //  this.mouseenterFn();
    //   this.mouseleaveFn();
    this.items = Array.from(document.getElementsByName(this.props.name));
    this.items.forEach((item) => {
      item.addEventListener("mouseenter", this.mouseenterFn);
      item.addEventListener("mouseleave", this.mouseleaveFn);
      item.addEventListener("touchstart", this.mouseenterFn);
      item.addEventListener("touchend", this.mouseleaveFn);
    });
  }

  render() {
    this.mountScript();

    if (this.props.name) {
      return (
        <Link
          className={`menu__item`}
          name={this.props.name}
          to={this.props.href}
          data-lng="en"
        >
          <span className={`menu__item-name`} id={this.props.name}>
            {this.props.name}
          </span>
          <span
            className={`menu__item-label ${this.props.text}`}
            id={this.props.text}
          >
            {this.props.text}
          </span>
        </Link>
      );
    } else {
      return null;
    }
  }
}

export default Item;
