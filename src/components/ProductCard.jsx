import React from "react";
import Frame from "../icons/Frame";
import ButtonNewLight from "../components/ButtonNewLight";

const Card = (data) => {
  return (
    <div className="c-product-card">
      <Frame />
      <img src={data.src} alt="" className="card-img" />
      <h3 className="subtitle-lg"> {data.name}</h3>
      <p className="parraf-lg">{data.translate(data.text)}</p>
      <ButtonNewLight label="Know more" href={data.href} />
    </div>
  );
};

export default Card;
