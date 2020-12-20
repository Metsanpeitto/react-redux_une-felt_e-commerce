import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";

class HoverMohe extends Component {
  constructor(props) {
    super(props);
    this.parseItems = this.parseItems.bind(this);
  }
  items = null;

  componentDidMount() {
    this.parseItems();
  }

  parseItems = () => {
    if (this.props.items) {
      this.items = this.props.items;
    } else {
      this.items = [
        { name: "Artists", text: "Visit the portfolios", href: "#" },
        { name: "Singer", text: "Visite the portfolios", href: "#" },
        ({ name: "Swinger", text: "Visite the portfolios", href: "#" },
        {
          name: "Butchers",
          text: "Visite the portfolios",
          href: "#",
        }),
        { name: "Barman", text: "Visite the portfolios", href: "#" },
        { name: "Gardeners", text: "Visite the portfolios", href: "#" },
      ];
    }
  };

  render() {
    this.parseItems();
    if (this.props) {
      if (this.items) {
        return (
          <section className=" mohe">
            <div className="menumohe menu--mohe">
              {this.items.map((item, index) => (
                <Item
                  name={item.name}
                  text={item.text}
                  id={index}
                  key={index + item.name}
                  href={item.href}
                />
              ))}
            </div>
          </section>
        );
      } else return null;
    } else return null;
  }
}

export default HoverMohe;
