import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import "font-awesome/css/font-awesome.min.css";
import sync from "css-animation-sync";
import { Helmet } from "react-helmet";
import Draw from "./icons/Logo2";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

sync("animation-footer", "lift-plant");

// <section style={style2}>{props.children}</section>
function App(props) {
  const [section1Visible, set1Visible] = useState(false);
  const [section2Visible, set2Visible] = useState(true);
  const animation = new sync("animation-footer", "lift-plant");

  useEffect(
    () => {
      window.scrollTo(0, 0);
      if (section1Visible) {
        const delay1 = 9000;
        setTimeout(() => set2Visible(true), delay1);
        setTimeout(() => set1Visible(false), delay1);
      } else {
        set1Visible(false);
        set2Visible(true);
      }
    },
    [section1Visible],
    [section2Visible]
  );

  const style1 = section1Visible ? { display: "block" } : { display: "none" };
  const style2 = section2Visible ? { display: "block " } : { display: "none" };
  animation.start();

  return (
    <div>
      <ToastContainer />
      <ReactTooltip backgroundColor="#dbb59d" arrowColor="#dbb59d" />
      <Helmet>
        <title>Une</title>
      </Helmet>
      <section className="section">
        <section className="section__1" style={style1}>
          {<Draw />}
        </section>
        <section className="section__header" style={style2}>
          <Header />
        </section>
        <section className="section__content" style={style2}>
          <section style={style2}>
            <section style={style2}>{props.children}</section>
          </section>
        </section>
        <section className="section__footer" style={style2}>
          <Footer />
        </section>
      </section>
    </div>
  );
}

export default App;
