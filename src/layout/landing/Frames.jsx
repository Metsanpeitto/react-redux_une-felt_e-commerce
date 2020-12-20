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
  }

  componentDidUpdate() {
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
                      <Frame img={props.products[0].pictures[0]} />
                    </div>

                    <div className="frame-text circle">
                      <h3>{props.products[0].name}</h3>
                      <p>{props.products[0].description}</p>
                    </div>
                  </div>
                </section>
                <Tween from={{ x: "-100%" }} to={{ x: "0%" }}>
                  <section className="panel ">
                    <div className=" frame frame--2">
                      <div className="frame-image">
                        <Frame img={props.products[1].pictures[0]} />
                      </div>

                      <div className="frame-text circle">
                        <h3>{props.products[1].name}</h3>
                        <p>{props.products[1].description}</p>
                      </div>
                    </div>
                  </section>
                </Tween>
                <Tween from={{ x: "100%" }} to={{ x: "0%" }}>
                  <section className="panel green">
                    <div className=" frame frame--3">
                      <div className="frame-image">
                        <Frame img={props.products[2].pictures[0]} />
                      </div>

                      <div>
                        <div className="frame-text circle">
                          <h3>{props.products[2].name}</h3>
                          <p>{props.products[2].description}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </Tween>
                <Tween from={{ y: "-100%" }} to={{ y: "0%" }}>
                  <section className="panel ">
                    <div className=" frame frame--4">
                      <div className="frame-image">
                        <Frame img={props.products[3].pictures[0]} />
                      </div>

                      <div className="frame-text circle">
                        <h3>{props.products[3].name}</h3>
                        <p>{props.products[3].description}</p>
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
