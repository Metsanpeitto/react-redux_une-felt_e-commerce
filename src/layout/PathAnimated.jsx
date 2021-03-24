import React from "react";

const PathAnimated = () => {
  return (
    <section className="b-layout-section-path">
      {/*<!-- this SVG is only to show the background line -->*/}
      <svg
        width="738"
        height="2169"
        viewBox="0 0 738 2169"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="path-svg"
      >
        <g id="PathDown">
          <path
            id="line"
            opacity="0.31"
            d="M416.5 1C456.477 54.9607 521.425 201.607 448.05 324.64C390.583 420.998 284.499 409.772 230.176 539.381C169.712 683.644 416.265 775.499 469.038 792.666C521.508 809.736 708.9 848.83 666.924 1080.64C619.909 1340.28 124.623 1194.07 39.7854 1111.48C-45.0522 1028.88 16.2992 854.336 155.719 905.543C295.139 956.751 245.667 1119.73 185.701 1196.82C125.735 1273.91 13.8003 1455.61 16.2989 1587.21C20.7942 1823.98 353.983 1837.63 324 2168"
            stroke="#D28E77"
            strokeWidth="2"
          />
        </g>
      </svg>
      <div className="dot"></div>
    </section>
  );
};

export default PathAnimated;
