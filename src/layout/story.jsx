import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";

class Story extends Component {
  render() {
    return (
      <section
        className="l-story "
        ref={(section) => (this.backgroundColor = section)}
      >
        <h1 className="h2-didot-reg">Story</h1>

        <div className="l-story__main">
          <img
            className="image-1"
            src={`${process.env.PUBLIC_URL}/assets/img/workshop.jpeg`}
            alt="product"
          />

          <p className="parraf-lg text-1">
            Peng Rui sees wool as the main material to create sculptures since
            2012, inspired by her own natural surroundings, she embraces the
            simplicity of the world she inhabits and finds the beauty in things.
          </p>

          <img
            className="image-2"
            src={`${process.env.PUBLIC_URL}/assets/img/blanky.jpg`}
            alt="product"
          />

          <p className="parraf-lg text-2">
            She is always searching and learning new things, tend to fuse
            everyday life into her creative works. Good at interpreting
            characters with refreshing andminimal style to accentuate their key
            features.
          </p>

          <img
            className="image-3"
            src={`${process.env.PUBLIC_URL}/assets/img/landSide.jpg`}
            alt="product"
          />

          <p className="parraf-lg text-3">
            Through creating works of diverse level, explore the way people
            think, open the door to start possible dialogues with the public,
            and to observe, study, and explore different facade of the world.
          </p>
        </div>
      </section>
    );
  }
}

export default withTranslate(Story);
