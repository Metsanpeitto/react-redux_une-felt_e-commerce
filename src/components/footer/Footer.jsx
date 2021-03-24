import React, { Component } from "react";
import { IntlActions } from "react-redux-multilingual";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import store from "../../app/store";
import Pinterest from "../../icons/Pinterest";
import Youtube from "../../icons/Youtube";
import Instagram from "../../icons/Instagram";
import Facebook from "../../icons/Facebook";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { mobile: null };
  }

  changeLanguage(lang) {
    store.dispatch(IntlActions.setLocale(lang));
  }

  render() {
    const { translate } = this.props;

    return (
      <div className="c-footer">
        <div className="wrapper">
          <Plant />
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1800 611"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="background-svg"
          >
            <linearGradient
              id="PSgrad_0"
              x1="23.9"
              x2="1923.4"
              y1="105.931"
              y2="1435.35"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DCA18C"></stop>
              <stop offset="1" stopColor="#DCA18C" stopOpacity="0.76"></stop>
            </linearGradient>
            <path fill="url(#PSgrad_0)">
              <animate
                id="animation-footer"
                repeatCount="indefinite"
                attributeName="d"
                /* fill="freeze" */
                dur="10s"
                values="M1569 4.00002C1370 -30 605 176 0 39.8439V625H1800V90C1750 28 1645.89 17.1363 1569 4.00002Z;
              M915.355 38.573C367.678 15.0435 491.374 -3.05176e-05 0 25.8439V611H1800V-3.05176e-05C1668.06 29.3156 1349.17 57.2108 915.355 38.573Z;
              M1569 4.00002C1370 -30 605 176 0 39.8439V625H1800V90C1750 28 1645.89 17.1363 1569 4.00002Z
              "

                /* values="M756 85C512 9.094 444-47 0 58.647V1180.61c208 0 261.596-55.47 524-55.47 304 0 469.038 79.18 784 119.86 251.97 32.54 400.25-87.81 493-119.86V9.094C1552 121 1024.54 168.54 756 85z;
	
	M1068 60.6464C835.421 126.803 500.088 92.4141 0 60.6465V1182.61C264 1155.49 452 1254.44 712 1219C866.176 1197.99 1131.63 1114.81 1446.59 1155.49C1698.56 1188.03 1708.25 1159.19 1801 1127.14V11.0939C1636.58 -13.3022 1273.32 2.24407 1068 60.6464Z;"
         */
              />
            </path>
          </svg>

          <svg
            width="100%"
            height="100%"
            viewBox="0 0 766 863"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="background-svg-mobile"
          >
            <linearGradient
              id="PSgrad_1"
              x1="766"
              y1="-0.00294024"
              x2="-532.336"
              y2="420.871"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#DCA18C"></stop>
              <stop offset="1" stopColor="#DCA18C" stopOpacity="0.78"></stop>
            </linearGradient>
            <path fill="url(#PSgrad_1)">
              <animate
                id="animation-footer"
                repeatCount="indefinite"
                attributeName="d"
                /* fill="freeze" */
                dur="10s"
                values="M275.281 50.998C157.988 50.998 110.112 0 0 0V863.001H766V0.000846863C454.812 -0.0001297 483.537 50.998 275.281 50.998Z;
                M389.535 54.4829C234.587 23.5009 222.619 0 0 0V863.001H766V0.000846867C709.851 41.4073 565.489 89.6655 389.535 54.4829Z;
                M275.281 50.998C157.988 50.998 110.112 0 0 0V863.001H766V0.000846863C454.812 -0.0001297 483.537 50.998 275.281 50.998Z
              "

                /* values="M756 85C512 9.094 444-47 0 58.647V1180.61c208 0 261.596-55.47 524-55.47 304 0 469.038 79.18 784 119.86 251.97 32.54 400.25-87.81 493-119.86V9.094C1552 121 1024.54 168.54 756 85z;
	
	M1068 60.6464C835.421 126.803 500.088 92.4141 0 60.6465V1182.61C264 1155.49 452 1254.44 712 1219C866.176 1197.99 1131.63 1114.81 1446.59 1155.49C1698.56 1188.03 1708.25 1159.19 1801 1127.14V11.0939C1636.58 -13.3022 1273.32 2.24407 1068 60.6464Z;"
         */
              />
            </path>
          </svg>
        </div>
        <footer className="c-footer__main">
          <div className="main--support">
            <Link
              to={`${process.env.PUBLIC_URL}/faq`}
              className="btn btn-solid"
            >
              <h3 className="subtitle-lg">{translate("faqs")}</h3>
            </Link>

            <Link
              to={`${process.env.PUBLIC_URL}/delivery`}
              className="btn btn-solid"
            >
              <h3 className="subtitle-lg">
                {translate("delivery_and_returns")}
              </h3>
            </Link>

            <Link
              to={`${process.env.PUBLIC_URL}/story`}
              className="btn btn-solid"
            >
              <h3 className="subtitle-lg">{translate("our_story")}</h3>
            </Link>

            <Link
              to={`${process.env.PUBLIC_URL}/privacy`}
              className="btn btn-solid"
            >
              <h3 className="subtitle-lg">{translate("privacy_policy")}</h3>
            </Link>
          </div>

          <div className="main--social">
            <h3 className="parraf-lg">{translate("social_media")}</h3>
            <div className="social--icons">
              <a href="https://br.pinterest.com/une722">
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
              <a href="https://www.facebook.com/une.tw/">
                {this.state.mobile ? (
                  <i class="fab fa-facebook-f"></i>
                ) : (
                  <Facebook />
                )}
              </a>
            </div>
          </div>
          <FullAtom id="full-atom-footer" className="full-atom-footer" />
          <div className="l-contact">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1841.4554637506137!2d120.27196038358011!3d22.619801148861516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e03f519b0f69f%3A0x1eea250ba9237d9c!2sNo.%2023%2C%20Binhai%201st%20Road%2C%20Gushan%20District%2C%20Kaohsiung%20City%2C%20Taiwan%20804!5e0!3m2!1sen!2ses!4v1614986937647!5m2!1sen!2ses"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <h5 className="l-contact__address parraf-lg">
              {" "}
              2F. No.23 BinHai 1st. Rd. Gushan Dist. Kaohsiung City 804 Taiwan
            </h5>
          </div>
        </footer>
        <div className="c-footer__under">
          <h6 className="subtitle-reg">©une</h6>

          <button
            className="invisible-button eng"
            onClick={() => this.changeLanguage("en")}
          >
            <h5 className="subtitle-reg">eng</h5>
          </button>
          <p>/</p>
          <button
            className="invisible-button ch"
            onClick={() => this.changeLanguage("ch")}
          >
            <h5 className="subtitle-reg">ch</h5>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default connect(mapStateToProps, {})(withTranslate(Footer));

const Plant = () => {
  return (
    <div className="footer-plant">
      <svg
        width="252"
        height="152"
        viewBox="0 0 252 152"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="plant-svg"
      >
        <g id="Plant Right" opacity="0.7">
          <path
            id="Leaf Me Alone!"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.394 47.0122C39.7641 46.7236 56.299 49.9705 57.7255 56.017C58.7616 60.4103 58.4407 64.7909 60.0443 69.1777C61.3265 72.6836 64.0384 76.0491 67.737 79.2427C71.2935 82.3136 78.671 84.9277 80.5898 88.2084C81.8127 90.2988 81.1282 93.2393 79.4417 95.2841C77.3906 97.7702 78.4807 97.5737 82.5675 99.6597C90.5758 103.748 97.7869 107.94 102.886 112.822C110.231 119.855 115.047 128.075 112.321 135.773C111.974 136.75 111.563 140.258 108.328 140.504C104.714 140.778 106.404 138.771 106.597 138.123C107.826 133.988 108.918 130.373 107.435 126.174C101.713 109.969 73.7721 99.2932 55.5789 85.5403C54.5788 84.831 52.4674 83.1422 50.9994 82.0281C48.6817 80.2691 46.3516 76.922 43.2141 75.6177C37.305 73.1605 42.7376 78.1003 43.889 79.0434C45.3448 80.2362 46.9463 81.504 48.4381 82.5493C55.264 87.3945 62.883 92.6834 69.9327 97.6779C39.4434 100.568 17.9708 85.318 9.78888 75.292C3.0476 67.0317 -5.01808 47.719 26.394 47.0122Z"
            fill="#7CD5BA"
          />
          <path
            id="Leaf Me Alone!_2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M205.591 31.6724C183.24 32.4102 168.892 38.5462 162.213 47.1285C158.613 51.7535 158.2 56.5048 156.199 61.2578C153.19 68.4087 146.715 73.8278 134.06 78.9225C130.141 80.5003 127.253 82.1203 125.199 83.8535C121.124 85.5839 117.575 87.5421 114.969 89.9363C111.639 92.9938 110.697 96.6622 114.541 99.7105C115.575 100.53 118.154 102.175 120.826 102.922C110.82 111.788 105.319 121.498 105.939 131.196C106.314 137.05 107.001 142.907 107.802 148.753C108.018 150.323 109.246 152.916 111.092 150.283C112.781 147.875 110.663 144.094 110.467 141.578C109.513 129.322 108.698 118.178 120.825 106.727C122.096 105.527 123.444 104.337 124.849 103.156C124.931 103.136 125.008 103.112 125.085 103.088C125.139 103.106 125.187 103.124 125.241 103.141C125.33 103.074 125.453 102.995 125.596 102.907C125.999 102.734 126.351 102.515 126.685 102.271C127.761 101.651 128.978 100.923 128.985 100.524C128.985 100.521 128.981 100.516 128.981 100.513C136.488 95.4144 145.086 90.5969 153.869 85.8738C153.803 85.9081 163.395 80.4742 161.912 83.4793C161.197 84.9274 154.141 87.6852 151.292 89.2191C144.988 92.6316 137.585 96.9555 131.434 101.137C130.606 101.335 129.437 102.306 128.591 103.03C128.124 103.397 127.688 103.767 127.26 104.089C149.056 107.085 166.012 101.05 177.573 94.03C177.587 94.0218 177.6 94.0132 177.613 94.005C181.131 92.0653 184.735 90.1394 189.238 88.6061C196.75 86.0477 204.795 85.5963 213.652 84.3371C237.805 80.9037 248.074 67.8802 251.336 58.2167C255.016 47.3147 237.016 30.5975 205.591 31.6724Z"
            fill="#89C5CC"
          />
          <path
            id="Leaf Me Alone!_3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M161.441 1.14258C138.502 11.0756 127.42 24.8528 118.644 37.8047C108.843 52.2708 102.37 66.96 102.121 82.0002C101.958 91.8818 101.312 101.825 102.698 111.695C103.19 115.2 104.03 118.712 105.365 122.179C105.475 122.464 108.463 130.207 111.322 128.403C112.948 127.377 108.259 120.371 107.905 119.204C105.912 112.632 105.449 106.011 105.546 99.3913C105.706 88.492 104.934 77.6485 107.589 66.7893C107.985 65.168 108.298 63.4651 109.224 61.8789C110.206 60.1927 108.955 60.9288 112.156 60.2612C115.267 59.6122 119.111 59.7049 122.338 58.8907C135.14 55.661 141.689 47.3648 146.786 41.9214C152.616 35.6966 156.159 29.0588 158.989 22.508C161.067 17.695 162.553 12.9113 163.394 8.03635C163.659 6.49993 163.674 4.89325 164.4 3.38253C164.596 2.97502 165.577 2.25414 165.541 1.89325C165.466 1.12947 164.358 0.680279 164.267 0.0384906C163.307 0.39803 162.364 0.766324 161.441 1.14258Z"
            fill="#A3E1CF"
          />
          <path
            id="Leaf Me Alone!_4"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M113.587 133.578H109.81C110.072 131.607 110.418 129.638 111.21 127.688C114.241 120.231 123.716 109.278 144.497 108.068C145.264 108.023 148.084 108.015 151.5 108.098C153.119 107.722 154.933 107.494 156.844 107.442C174.537 106.899 194.296 112.838 202.831 119.018C209.711 124.001 208.552 130.544 204.302 135.838C201.457 139.382 195.246 144.435 184.889 144.484C171.93 144.546 171.306 137.883 171.055 133.987C170.722 128.809 169.149 124.297 159.341 120.767C157.055 119.945 154.556 119.221 152.247 118.41C148.631 117.141 144.636 115.842 144.17 113.742C143.527 110.845 147.457 110.323 153.459 110.861C154.482 110.953 164.787 112.877 163.261 111.356C162.796 110.892 161.094 110.524 158.947 110.248C153.39 109.996 146.763 109.705 144.857 109.879C124.295 111.756 116.29 123.605 114.164 131.134C113.934 131.947 113.749 132.762 113.587 133.578Z"
            fill="#ACD6DB"
          />
        </g>

        <animate
          id="a1"
          attributeName="y"
          attributeType="XML"
          begin="1s"
          dur="10s"
          //fill="freeze"

          values="510; 475;  510"
        />
      </svg>
    </div>
  );
};

const FullAtom = (data) => {
  return (
    <div className={data.id ? `${data.id}` : ""}>
      <div className="layer">
        <section className="atom-section">
          {/*<!-- this SVG is only to show the background line -->*/}
          <svg
            width="534"
            height="511"
            viewBox="0 0 534 511"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="atom-svg"
          >
            <g id="Card-1">
              <path
                id="orbit1"
                d="M432.109 380.903C463.093 328.506 467.634 217.518 425.515 148.062C383.395 78.6058 327.025 25.7607 249.38 10.0006C171.735 -5.7595 50.816 160.663 44.2192 223.119C37.6225 285.575 36.3631 334.787 91.7162 396.791C145.1 456.59 217.542 480.32 297.532 481.162C377.522 482.005 401.126 433.301 432.109 380.903Z"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          </svg>
          <div className="atom1"></div>
        </section>
      </div>
      <div className="layer">
        <section className="atom-section">
          {/*<!-- this SVG is only to show the background line -->*/}
          <svg
            width="534"
            height="511"
            viewBox="0 0 534 511"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Card-1">
              <path
                id="orbit2"
                d="M81.1573 400.635C141.301 430.858 283.782 448.264 370.772 419.503C457.763 390.742 497.434 344.102 523.12 281.246C548.806 218.39 384.691 98.3779 284.286 68.1004C183.88 37.8228 90.3501 127.249 90.3501 127.249C90.3501 127.249 15.9061 186.052 7.90851 252.154C-0.089093 318.257 21.0135 370.411 81.1573 400.635Z"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          </svg>

          <div className="atom2"></div>
        </section>
      </div>

      <div className="layer">
        <section className="atom-section">
          {/*<!-- this SVG is only to show the background line -->*/}
          <svg
            width="534"
            height="511"
            viewBox="0 0 534 511"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Card-1">
              <path
                id="orbit3"
                d="M53.0927 121.807C18.7872 172.771 21.4271 270.862 59.0314 342.101C96.6357 413.341 175.803 448.413 252.332 467.593C328.861 486.773 458.17 387.585 491.157 303.194C524.143 218.802 406.71 94.4083 406.71 94.4083C406.71 94.4083 333.481 28.6477 253.652 24.264C173.823 19.8802 87.3983 70.8435 53.0927 121.807Z"
                stroke="white"
                strokeWidth="2"
              />
            </g>
          </svg>

          <div className="atom3"></div>
        </section>
      </div>
    </div>
  );
};
