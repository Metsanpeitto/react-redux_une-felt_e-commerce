import React from "react";

import Button from "../../components/ButtonNew";
import Branch from "../../icons/landingHero/Branch";
import Plant from "../../icons/landingHero/Plant";
import PlantLeft from "../../icons/landingHero/PlantLeft";
import Shadow from "../../icons/landingHero/Shadow";
import TopLeafs from "../../icons/landingHero/TopLeafs";
import EmptyWishlist from "../../icons/EmptyWishlist";

function Landing() {
  const hero = () => {
    return (
      <div className="l-landing-hero grid-16">
        <div className="left-canvas">
          <h1 className="h1-didot-reg">Art made with felt</h1>
          <p className="parraf-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, natus
            error esse temporibus quas architecto nobis aut minus, ipsam
            voluptates, beatae porro in dicta. Ad illum corrupti doloribus
            nesciunt sint.
          </p>
          <Button label="Learn more" />
        </div>
        <section className="right-canvas">
          <EmptyWishlist />
        </section>
      </div>
    );
  };

  return <div className="l-landing-section-1 grid-16"></div>;
}

export default Landing;
