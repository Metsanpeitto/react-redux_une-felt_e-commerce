import React from "react";
import { withRouter, Link } from "react-router-dom";

const button = (props) => {
  return (
    <Link
      className="f-bp-new f-bp-new-light"
      to={props.href ? props.href : "#"}
      key="learn link"
      id="all_posts"
      type={props.type}
      onClick={props.handler}
    >
      <svg className="f-bp-arrow left" viewBox="0 0 6 10">
        <path d="M0,9.9C1.4,8.3,2.9,5.6,3.4,5C2.9,4.4,1.4,1.7,0,0.1L0.1,0C1.5,1.6,5.8,4.8,6,5 c-0.2,0.2-4.5,3.4-5.9,5L0,9.9z"></path>{" "}
      </svg>{" "}
      <i className="f-bp-label">{props.label}</i>
      <svg className="f-bp-arrow right" viewBox="0 0 6 10">
        <path d="M0,9.9C1.4,8.3,2.9,5.6,3.4,5C2.9,4.4,1.4,1.7,0,0.1L0.1,0C1.5,1.6,5.8,4.8,6,5 c-0.2,0.2-4.5,3.4-5.9,5L0,9.9z"></path>{" "}
      </svg>{" "}
    </Link>
  );
};

export default withRouter(button);
