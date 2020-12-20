import React from "react";

const button = (props) => (
  <a className="f-bs" href="#">
    <svg className="f-bs-arrow" viewBox="0 0 6 10">
      <path d="M0,9.9C1.4,8.3,2.9,5.6,3.4,5C2.9,4.4,1.4,1.7,0,0.1L0.1,0C1.5,1.6,5.8,4.8,6,5 c-0.2,0.2-4.5,3.4-5.9,5L0,9.9z"></path>{" "}
    </svg>
    <svg className="f-bs-arrow" viewBox="0 0 6 10">
      <path d="M0,9.9C1.4,8.3,2.9,5.6,3.4,5C2.9,4.4,1.4,1.7,0,0.1L0.1,0C1.5,1.6,5.8,4.8,6,5 c-0.2,0.2-4.5,3.4-5.9,5L0,9.9z"></path>{" "}
    </svg>
    <span className="f-bs-line"></span>
    <i className="f-bs-label">{props.label}</i>
  </a>
);

export default button;
