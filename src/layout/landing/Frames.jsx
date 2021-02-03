// @flow
import React, { Component } from "react";
import { IntlActions, withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { Controller, Scene } from "react-scrollmagic";
import { Tween, Timeline } from "react-gsap";
import Frame from "../../components/Frame";

const SectionWipes2Styled = styled.div`
  overflow: hidden;
  #pinContainer {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  #pinContainer .panel {
    height: 100vh;
    width: 100vw;
    position: absolute;
    text-align: center;
  }
  .panel span {
    position: relative;
    display: block;
    top: 50%;
    font-size: 80px;
  }

  .panel.blue {
    background-color: #3883d8;
  }

  .panel.turqoise {
    background-color: #38ced7;
  }

  .panel.green {
    background-color: #22d659;
  }

  .panel.bordeaux {
    background-color: #953543;
  }
`;

var FrameProducts = [];

class Frames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FrameProducts: null,
      loaded: null,
    };
    this.checkProps = this.checkProps.bind(this);
  }

  componentDidMount() {
    this.checkProps();
  }

  componentDidUpdate() {
    this.checkProps();
  }

  checkProps() {
    if (this.props.state.data.products) {
      if (this.props.state.data.products.length > 6) {
        const products = this.props.state.data.products;

        if (products.length > 0) {
          products.map((p) => {
            p.categories.map((c) => {
              if (c.name == "miss earth") {
                FrameProducts.push(p);
              }
            });
          });
          if (!this.state.FrameProducts) {
            if (FrameProducts !== this.state.FrameProducts) {
              if (!this.state.loaded) {
                this.setState(() => {
                  return { FrameProducts: FrameProducts, loaded: true };
                });
              }
            }
          }
        }
      }
    }
  }

  render() {
    const products = this.state.FrameProducts;
    if (this.state.loaded) {
      return <SectionWipes2 products={products} />;
    } else return <div>Loading</div>;
  }
}

const SectionWipes2 = (props) => {
  if (props.products.length > 0) {
    return (
      <SectionWipes2Styled>
        <Controller>
          <Scene triggerHook="onLeave" duration="300%" pin>
            <Timeline wrapper={<div id="pinContainer" />}>
              <div className="l-frames">
                <section className="panel ">
                  <div className=" frame frame--1">
                    <div className="frame-image">
                      <Frame
                        img={
                          process.env.PUBLIC_URL +
                          "assets/img/ladies/Lady_DesertP.jpg"
                        }
                      />
                    </div>

                    <div className="frame-text circle">
                      <h3>Lady Desert</h3>
                      <p>
                        Under The Ocre Color Egg Cover Is A Kind Lady Named Miss
                        Desert. She Is The Ambassador Of The Desert Kingdom, She
                        Is Loves Listening The Wind Blowing The Sand Sound, It
                        Make Her Feel Calm And Freedom. Miss Desert Is Brave And
                        Independent Lady, Everyone Can Easily Make A Friend With
                        Her.
                      </p>
                    </div>
                  </div>
                </section>
                <Tween from={{ x: "-100%" }} to={{ x: "0%" }}>
                  <section className="panel ">
                    <div className=" frame frame--2">
                      <div className="frame-image">
                        <Frame
                          img={
                            process.env.PUBLIC_URL +
                            "assets/img/ladies/Lady_ForestP.jpg"
                          }
                        />
                      </div>

                      <div className="frame-text circle">
                        <h3>Lady Forest</h3>
                        <p>
                          Under The Green Color Egg Cover Is A Kind And Peaceful
                          Lady Named Miss Forest. She Is The Ambassador Of The
                          Forest Kingdom, She Is Warm-Herated And Quiet,
                          Although She Has The Tenderness Appearance, Miss
                          Forest Is Very Tough Lady. Quote: Nature Is Not A
                          Place To Visit, It Is Home
                        </p>
                      </div>
                    </div>
                  </section>
                </Tween>
                <Tween from={{ x: "100%" }} to={{ x: "0%" }}>
                  <section className="panel green">
                    <div className=" frame frame--3">
                      <div className="frame-image">
                        <Frame
                          img={
                            process.env.PUBLIC_URL +
                            "assets/img/ladies/Lady_OceanP.jpg"
                          }
                        />
                      </div>

                      <div>
                        <div className="frame-text circle">
                          <h3>Lady Wetland</h3>
                          <p>
                            Under The Grass Green Egg Cover Is An Energetic Lady
                            Named Miss Wetland. She Is The Ambassador Of The
                            Wetland Kingdom. She Loves Any Animals And Insects,
                            Especially Butterfly. Miss Wetland Always Is In The
                            Happy Mood And Share Her Joys With Others.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Tween>
                <Tween from={{ y: "-100%" }} to={{ y: "0%" }}>
                  <section className="panel ">
                    <div className=" frame frame--4">
                      <div className="frame-image">
                        <Frame
                          img={
                            process.env.PUBLIC_URL +
                            "assets/img/ladies/Lady_TundraP.jpg"
                          }
                        />
                      </div>

                      <div className="frame-text circle">
                        <h3>Lady Tundra</h3>
                        <p>
                          Under The Sage Green Egg Cover Is A Graceful Lady
                          Named Miss Tundra. She Is The Ambassador Of The Tundra
                          Kingdom. She Also Is A Lady Of Few Words, But She Has
                          Great Charisma And Refinement. Her Aesthetic Sense Is
                          Outstanding, And She Is Trustworthy Person As Well.
                        </p>
                      </div>
                    </div>
                  </section>
                </Tween>
              </div>
            </Timeline>
          </Scene>
        </Controller>
      </SectionWipes2Styled>
    );
  } else return null;
};

//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, {})(withTranslate(withRouter(Frames)));
