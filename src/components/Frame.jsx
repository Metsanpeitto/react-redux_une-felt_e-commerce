import React from "react";
import FrameSvg from "../icons/Frame";
const Frame = (props) => (
  <div className="c-frame">
    <div className="c-frame-image">
      <FrameSvg />
      <img
        // src="https://rino-pelle.com/wp-content/uploads/2020/08/nenna-padded-jacket-side-front-800x1067.jpg"
        src={props.img}
        alt=""
      />
    </div>
  </div>
);

export default Frame;
