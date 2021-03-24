import React, { Component } from "react";
import { connect } from "react-redux";
import CloudiaEmpty from "../../../icons/CloudiaEmpty";
import LayoutBackground from "../../../icons/LayoutBackground";
import LittleheartEmpty from "../../../icons/LittleheartEmpty";
import { withTranslate } from "react-redux-multilingual";

import Box from "../../../icons/EmptyBox";
import PlantLeft from "../../../icons/PlantLeft";
import Topleafs from "../../../icons/Topleafs";
import ButtonNewLight from "../../ButtonNewLightBack";
import Shadow from "../../../icons/Shadow";

class Empty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var text = this.props.text;
    var longText = this.props.longText;

    return (
      <section className="c-cart__empty">
        <LayoutBackground />
        <h1 className="h2-didot-reg">{text}</h1>
        <div className="card-empty b-layout-card">
          <h5 className="h5-didot-reg">{longText}</h5>
          <CloudiaEmpty />
          <LittleheartEmpty />
          <Topleafs />
          <PlantLeft />
          <Box />
          <Shadow />
          <div className="c-cart__buttons">
            <ButtonNewLight
              label={"Go back"}
              href={`${process.env.PUBLIC_URL}/collection`}
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, {})(withTranslate(Empty));
