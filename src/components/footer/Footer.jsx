import React, { Component } from "react";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import Input from "../../effects/input/Input";
import HoverMohe from "../../effects/hover/HoverMohe";
import Pinterest from "../../icons/Pinterest";
import Youtube from "../../icons/Youtube";
import Instagram from "../../icons/Instagram";
import Facebook from "../../icons/Facebook";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { mobile: null };
  }

  render() {
    const { translate } = this.props;
    const itemsSupport = [
      {
        name: translate("contact_us"),
        text: translate("dont_hesitate"),
        href: `${process.env.PUBLIC_URL}/contact`,
      },
      {
        name: translate("faqs"),
        text: translate("any_doubt"),
        href: `${process.env.PUBLIC_URL}/faq`,
      },

      {
        name: translate("delivery_and_returns"),
        text: translate("deliveries_to_everywhere"),
        href: `${process.env.PUBLIC_URL}/delivery`,
      },
    ];

    const itemsAbout = [
      {
        name: translate("our_story"),
        text: translate("visit_the_gallery"),
        href: `${process.env.PUBLIC_URL}/story`,
      },
      {
        name: translate("privacy_policy"),
        text: translate("we_dont_sell_it"),
        href: `${process.env.PUBLIC_URL}/privacy`,
      },
    ];
    return (
      <div className="c-footer">
        {" "}
        <footer className="c-footer__main">
          <div className="main--subscribe">
            <h3>{translate("subscribe")}</h3>

            <Input type="email" name="email" id="email" label="email here" />

            <p>{translate("enter_email")}</p>
          </div>

          <div className="main--support">
            <h3>{translate("support")}</h3>
            <HoverMohe items={itemsSupport} />
          </div>
          <div className="main--about">
            <h3>{translate("about")}</h3>
            <HoverMohe items={itemsAbout} />
          </div>

          <div className="main--social">
            <h3>{translate("social_media")}</h3>
            <div className="social--icons">
              <a href="#">
                {this.state.mobile ? (
                  <i class="fab fa-pinterest-square"></i>
                ) : (
                  <Pinterest />
                )}
              </a>
              <a href="https://www.youtube.com/channel/UCPWxEHIZE6oAFHYotnFPrKQ">
                {this.state.mobile ? (
                  <i class="fab fa-youtube"></i>
                ) : (
                  <Youtube />
                )}
              </a>
              <a href="https://www.instagram.com/une.tw/">
                {this.state.mobile ? (
                  <i class="fab fa-instagram"></i>
                ) : (
                  <Instagram />
                )}
              </a>
              <a href="#">
                {this.state.mobile ? (
                  <i class="fab fa-facebook-f"></i>
                ) : (
                  <Facebook />
                )}
              </a>
            </div>
          </div>
        </footer>
        <div className="c-footer__under">
          <h6>©une</h6>
          <div className="under--lang">
            <a href="#">
              <h5>eng</h5>
            </a>
            <p>/</p>
            <a href="#">
              <h5>ch</h5>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default connect(mapStateToProps, {})(withTranslate(Footer));
