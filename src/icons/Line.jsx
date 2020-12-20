import React from "react";

function Line() {
  return (
    <div className="line-canvas">
      <svg width="100" height="6" viewBox="0 0 100 6" fill="#dbb59d">
        <path id="line" d="M0 3L100 3" stroke="#d28e77" stroke-width="5" />
      </svg>
    </div>
  );
}

export default Line;
