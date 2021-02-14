import React from "react";

function App() {
  return <Canvastest {...CanvastestData} />;
}

export default App;

function Canvastest(props) {
  const {
    uneWebLogo,
    shop,
    blog,
    path76,
    ellipse78,
    ellipse80,
    path82,
    path84,
    path86,
    path88,
    gift24Px,
    path588,
    path590,
    path594,
    path598,
    path884,
    path1223,
    path1225,
    path1227,
    path1229,
    path1231,
    path1233,
    path1235,
    vector,
    vector2,
    vector3,
    vector4,
    line4,
    backgroundShape,
    g1012,
    heart,
    leaf,
    leaf2,
    leafMeAlone,
    leaf3,
    leaf4,
    leaf5,
    base,
    leaf6,
    leafBottom,
    leafMeAlone2,
    leafBottom2,
    artMadeWithFelt,
    text1,
    vector7,
    background2,
    background1,
    vector72,
    spanText,
    spanText2,
    spanText3,
    place,
    text8,
    img38502,
    bigframe3,
    knowMore,
    rectangle16,
    ellipse4,
    place2,
    text7,
    img385022,
    bigframe32,
    knowMore2,
    rectangle162,
    g978,
    spanText4,
    spanText5,
    spanText6,
    ellipse5,
    g10122,
    leafMeAlone3,
    leafMeAlone4,
    leafMeAlone5,
    base2,
    leafMeAlone6,
    base3,
    fill27,
    g9782,
    vector32,
    vector42,
    vector5,
    vector6,
    ellipse1,
    learnMore,
    theShopOnline,
    ellipse2,
    ellipse3,
    leafMeAlone7,
    leafMeAlone8,
    leafMeAlone9,
    leafMeAlone10,
    uneWebLogo2,
    myContact,
    text3,
    text4,
    text5,
    vector8,
    vector9,
    text2,
    text6,
    overlapgroup8Props,
    cardProps,
    card2Props,
    card3Props,
    card21Props,
    card22Props,
    card32Props,
    overlapgroup82Props,
  } = props;

  return (
    <div className="canvas-test">
      <div className="auto-flex">
        <div className="overlap-group1">
          <div className="hero">
            <div className="overlap-group7-2">
              <img className="background-shape" src={backgroundShape} />
              <div className="frame-56"></div>
              <img className="g1012" src={g1012} />
              <img className="heart" src={heart} />
              <img className="leaf" src={leaf} />
              <img className="leaf-1" src={leaf2} />
              <img className="leaf-me-alone" src={leafMeAlone} />
              <img className="leaf-2" src={leaf3} />
              <img className="leaf-3" src={leaf4} />
              <img className="leaf-4" src={leaf5} />
              <img className="base" src={base} />
              <img className="leaf-5" src={leaf6} />
            </div>
            <div className="overlap-group6-2">
              <img className="leaf-bottom" src={leafBottom} />
              <img className="leaf-me-alone-1" src={leafMeAlone2} />
              <img className="leaf-bottom-1" src={leafBottom2} />
            </div>
            <div className="art-made-with-felt didot-regular-normal-burning-sand-34px">
              {artMadeWithFelt}
            </div>
            <p className="text-1 valign-text-middle">{text1}</p>
            <Overlapgroup8 iWantReadMore={overlapgroup8Props.iWantReadMore} />
          </div>
          <div className="frame-54">
            <div className="overlap-group9-1">
              <Card {...cardProps} />
              <Card2 {...card2Props} />
              <Card3 {...card3Props} />
            </div>
            <img className="vector-7" src={vector7} />
          </div>
          <div className="frame-55">
            <div className="overlap-group10">
              <img className="background-1" src={background1} />
              <Card {...card2Props} className="card-3" />
              <Card2 {...card22Props} className="card-4" />
              <Card3 {...card32Props} className="card-5" />
              <img className="vector-7-1" src={vector72} />
            </div>
          </div>
        </div>
        <h1 className="art-made-with-felt-1 didot-normal-burning-sand-48px">
          <span className="span">{spanText}</span>
          <span className="span2">{spanText2}</span>
          <span className="span">{spanText3}</span>
        </h1>
      </div>
      <div className="auto-flex1">
        <div className="overlap-group">
          <div className="place roboto-bold-gray-18px">{place}</div>
          <p className="text- lato-normal-sonic-silver-12px">{text8}</p>
          <div className="overlap-group14">
            <img className="img3850-2" src={img38502} />
            <img className="big-frame-3" src={bigframe3} />
          </div>
          <div className="overlap-group13">
            <div className="know-more lato-normal-wisteria-12px">
              {knowMore}
            </div>
            <img className="rectangle-16" src={rectangle16} />
          </div>
        </div>
        <img className="ellipse-4" src={ellipse4} />
        <div className="overlap-group4">
          <div className="place roboto-bold-gray-18px">{place2}</div>
          <p className="text- lato-normal-sonic-silver-12px">{text7}</p>
          <div className="overlap-group12">
            <img className="img3850-2-1" src={img385022} />
            <img className="big-frame-3-1" src={bigframe32} />
          </div>
          <div className="overlap-group11">
            <div className="know-more-1 lato-normal-wisteria-12px">
              {knowMore2}
            </div>
            <img className="rectangle-16-1" src={rectangle162} />
          </div>
        </div>
      </div>
      <Overlapgroup8
        iWantReadMore={overlapgroup82Props.iWantReadMore}
        className="overlap-group3"
      />
      <img className="g978" src={g978} />
      <div className="art-made-with-felt-2 didot-normal-burning-sand-48px">
        <span className="span">{spanText4}</span>
        <span className="span2">{spanText5}</span>
        <span className="span">{spanText6}</span>
      </div>
      <img className="ellipse-5" src={ellipse5} />
      <div className="overlap-group2">
        <img className="g1012-1" src={g10122} />
        <img className="leaf-me-alone-2" src={leafMeAlone3} />
        <img className="leaf-me-alone-3" src={leafMeAlone4} />
        <img className="leaf-me-alone-4" src={leafMeAlone5} />
        <img className="base-1" src={base2} />
        <img className="leaf-me-alone-5" src={leafMeAlone6} />
        <img className="base-2" src={base3} />
        <img className="fill-27" src={fill27} />
        <img className="g978-1" src={g9782} />
      </div>
      <div className="overlap-group5">
        <div className="footer">
          <div className="overlap-group6-3">
            <img className="vector-3" src={vector32} />
            <div className="card-6">
              <div className="overlap-group8-3">
                <img className="vector-4" src={vector42} />
                <img className="vector-5" src={vector5} />
                <img className="vector-6" src={vector6} />
                <img className="ellipse-1" src={ellipse1} />
                <div className="learn-more">{learnMore}</div>
                <div className="the-shop-online roboto-bold-burning-sand-18px">
                  {theShopOnline}
                </div>
                <img className="ellipse-2" src={ellipse2} />
                <img className="ellipse-3" src={ellipse3} />
              </div>
            </div>
            <img className="leaf-me-alone-6" src={leafMeAlone7} />
            <img className="leaf-me-alone-7" src={leafMeAlone8} />
            <img className="leaf-me-alone-8" src={leafMeAlone9} />
            <img className="leaf-me-alone-9" src={leafMeAlone10} />
            <img className="une-web-logo-1" src={uneWebLogo2} />
            <div className="my-contact">{myContact}</div>
            <div className="text-3 lato-normal-white-16px">{text3}</div>
            <div className="text-4 lato-normal-white-16px">{text4}</div>
            <div className="text-5 lato-normal-white-16px">{text5}</div>
            <div className="home">
              <img className="vector" src={vector8} />
            </div>
            <div className="gmail">
              <img className="vector-8" src={vector9} />
            </div>
          </div>
          <div className="overlap-group7-3">
            <div className="text-2 roboto-bold-white-16px">{text2}</div>
          </div>
          <div className="rectangle-14 border-1px-wisteria"></div>
        </div>
        <div className="text-6">{text6}</div>
      </div>
    </div>
  );
}

function Overlapgroup8(props) {
  const { iWantReadMore, className } = props;

  return (
    <div className={`overlap-group8-2 ${className || ""}`}>
      <div className="i-want-read-more roboto-bold-white-16px">
        {iWantReadMore}
      </div>
    </div>
  );
}

function Card(props) {
  const {
    vector4,
    vector5,
    vector6,
    ellipse1,
    learnMore,
    theGallery,
    ellipse2,
    ellipse3,
    className,
  } = props;

  return (
    <div className={`card ${className || ""}`}>
      <div className="overlap-group6-1">
        <img className="vector-4-1" src={vector4} />
        <img className="vector-5-1" src={vector5} />
        <img className="vector-6-1" src={vector6} />
        <img className="ellipse-1-1" src={ellipse1} />
        <div className="learn-more-1 roboto-bold-eminence-12px">
          {learnMore}
        </div>
        <div className="the-gallery roboto-bold-burning-sand-18px">
          {theGallery}
        </div>
        <img className="ellipse-2-1" src={ellipse2} />
        <img className="ellipse-3-1" src={ellipse3} />
      </div>
    </div>
  );
}

function Card2(props) {
  const {
    vector4,
    vector5,
    vector6,
    ellipse1,
    entryTheShop,
    theShopOnline,
    ellipse2,
    ellipse3,
    className,
  } = props;

  return (
    <div className={`card-1 ${className || ""}`}>
      <div className="overlap-group7-1">
        <img className="vector-4-2" src={vector4} />
        <img className="vector-5-2" src={vector5} />
        <img className="vector-6-2" src={vector6} />
        <img className="ellipse-1-2" src={ellipse1} />
        <div className="entry-the-shop roboto-bold-eminence-12px">
          {entryTheShop}
        </div>
        <div className="the-shop-online-1 roboto-bold-burning-sand-18px">
          {theShopOnline}
        </div>
        <img className="ellipse-2-2" src={ellipse2} />
        <img className="ellipse-3-2" src={ellipse3} />
      </div>
    </div>
  );
}

function Card3(props) {
  const {
    vector4,
    vector5,
    vector6,
    ellipse1,
    learnMore,
    theBlog,
    ellipse2,
    ellipse3,
    className,
  } = props;

  return (
    <div className={`card-2 ${className || ""}`}>
      <div className="overlap-group8-1">
        <img className="vector-4-3" src={vector4} />
        <img className="vector-5-3" src={vector5} />
        <img className="vector-6-3" src={vector6} />
        <img className="ellipse-1-3" src={ellipse1} />
        <div className="learn-more-2 roboto-bold-eminence-12px">
          {learnMore}
        </div>
        <div className="the-blog roboto-bold-burning-sand-18px">{theBlog}</div>
        <img className="ellipse-2-3" src={ellipse2} />
        <img className="ellipse-3-3" src={ellipse3} />
      </div>
    </div>
  );
}
const overlapgroup8Data = {
  iWantReadMore: "I want read more",
};

const cardData = {
  vector4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-4@2x.svg",
  vector5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-5@2x.svg",
  vector6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-6@2x.svg",
  ellipse1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-1@2x.svg",
  learnMore: "LEARN MORE",
  theGallery: "The gallery",
  ellipse2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-2@2x.svg",
  ellipse3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-3@2x.svg",
};

const card2Data = {
  vector4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-4-1@2x.svg",
  vector5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-5-1@2x.svg",
  vector6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-6-1@2x.svg",
  ellipse1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-1-1@2x.svg",
  entryTheShop: "ENTRY THE SHOP",
  theShopOnline: "The  shop online",
  ellipse2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-2-1@2x.svg",
  ellipse3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-3-1@2x.svg",
};

const card3Data = {
  vector4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-4-2@2x.svg",
  vector5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-5-2@2x.svg",
  vector6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-6-2@2x.svg",
  ellipse1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-1-2@2x.svg",
  learnMore: "LEARN MORE",
  theBlog: "The blog",
  ellipse2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-2-2@2x.svg",
  ellipse3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-3-2@2x.svg",
};

const card4Data = {
  vector4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-4@2x.svg",
  vector5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-5@2x.svg",
  vector6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-6@2x.svg",
  ellipse1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-1@2x.svg",
  learnMore: "LEARN MORE",
  theGallery: "The gallery",
  ellipse2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-2@2x.svg",
  ellipse3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-3@2x.svg",
};

const card22Data = {
  vector4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-4-1@2x.svg",
  vector5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-5-1@2x.svg",
  vector6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-6-1@2x.svg",
  ellipse1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-1-1@2x.svg",
  entryTheShop: "ENTRY THE SHOP",
  theShopOnline: "The  shop online",
  ellipse2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-2-1@2x.svg",
  ellipse3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-3-1@2x.svg",
};

const card32Data = {
  vector4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-4-2@2x.svg",
  vector5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-5-2@2x.svg",
  vector6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-6-2@2x.svg",
  ellipse1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-1-2@2x.svg",
  learnMore: "LEARN MORE",
  theBlog: "The blog",
  ellipse2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-2-2@2x.svg",
  ellipse3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-3-2@2x.svg",
};

const overlapgroup82Data = {
  iWantReadMore: "I want read more",
};

const CanvastestData = {
  uneWebLogo:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/une-web-logo@2x.svg",
  shop: "Shop",
  blog: "Blog",
  path76:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path76@2x.svg",
  ellipse78:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse78@2x.svg",
  ellipse80:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse80@2x.svg",
  path82:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path82@2x.svg",
  path84:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path84@2x.svg",
  path86:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path86@2x.svg",
  path88:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path88@2x.svg",
  gift24Px:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/gift-24px@2x.svg",
  path588:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path588@2x.svg",
  path590:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path590@2x.svg",
  path594:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path594@2x.svg",
  path598:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path598@2x.svg",
  path884:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path884@2x.svg",
  path1223:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path1223@2x.svg",
  path1225:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path1225@2x.svg",
  path1227:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path1227@2x.svg",
  path1229:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path1229@2x.svg",
  path1231:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path1231@2x.svg",
  path1233:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path1233@2x.svg",
  path1235:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/path1235@2x.svg",
  vector:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector@2x.svg",
  vector2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-1@2x.svg",
  vector3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-2@2x.svg",
  vector4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-3@2x.svg",
  line4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/line-4@1x.svg",
  backgroundShape:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/background-shape@2x.svg",
  g1012:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/g1012@1x.svg",
  heart:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/heart@2x.svg",
  leaf:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf@2x.svg",
  leaf2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-1@2x.svg",
  leafMeAlone:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone-@2x.svg",
  leaf3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-2@2x.svg",
  leaf4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-3@2x.svg",
  leaf5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-4@2x.svg",
  base:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/base@2x.svg",
  leaf6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-5@2x.svg",
  leafBottom:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-bottom@2x.svg",
  leafMeAlone2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--1@2x.svg",
  leafBottom2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-bottom-1@2x.svg",
  artMadeWithFelt: "Art made with felt",
  text1:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit diam augue justo lobortis suscipit vel, viverra sem.",
  vector7:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-7@1x.svg",
  background2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/background-2@1x.svg",
  background1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/background-1@1x.png",
  vector72:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-7@1x.svg",
  spanText: "Art made ",
  spanText2: "with",
  spanText3: " felt",
  place: "Name",
  text8:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, vulputate vestibulum mi magna lectus ipsum. Elementum nibh eu gravida quis fringilla proin. Suspendisse viverra tellus feugiat vestibulum cursus donec elit arcu.",
  img38502:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/img-3850-2@2x.svg",
  bigframe3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/bigframe-3@2x.svg",
  knowMore: "Know more",
  rectangle16:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/rectangle-16@2x.svg",
  ellipse4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-4@2x.svg",
  place2: "Name",
  text7:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo, vulputate vestibulum mi magna lectus ipsum. Elementum nibh eu gravida quis fringilla proin. Suspendisse viverra tellus feugiat vestibulum cursus donec elit arcu.",
  img385022:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/img-3850-2@2x.svg",
  bigframe32:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/bigframe-3@2x.svg",
  knowMore2: "Know more",
  rectangle162:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/rectangle-16@2x.svg",
  g978:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/g978-1@2x.svg",
  spanText4: "Art made ",
  spanText5: "with",
  spanText6: " felt",
  ellipse5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-4@2x.svg",
  g10122:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/g1012-1@2x.svg",
  leafMeAlone3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--6@2x.svg",
  leafMeAlone4:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--7@2x.svg",
  leafMeAlone5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--8@2x.svg",
  base2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/base-1@2x.svg",
  leafMeAlone6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--9@2x.svg",
  base3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/base-2@2x.svg",
  fill27:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/fill-27@2x.svg",
  g9782:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/g978@2x.svg",
  vector32:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-3-1@1x.svg",
  vector42:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-4-6@2x.svg",
  vector5:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-5-6@2x.svg",
  vector6:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-6-6@2x.svg",
  ellipse1:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-1-6@2x.svg",
  learnMore: "LEARN MORE",
  theShopOnline: "The  shop online",
  ellipse2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-2-6@2x.svg",
  ellipse3:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/ellipse-3-6@2x.svg",
  leafMeAlone7:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--2@2x.svg",
  leafMeAlone8:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--3@2x.svg",
  leafMeAlone9:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--4@2x.svg",
  leafMeAlone10:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/leaf-me-alone--5@2x.svg",
  uneWebLogo2:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/une-web-logo-1@2x.svg",
  myContact: "My contact",
  text3: "<>This is my address.<br/>Kaoshiung</>",
  text4: "+2 333-22-111",
  text5: "une-felt@unefelt.com",
  vector8:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-8@2x.svg",
  vector9:
    "https://anima-uploads.s3.amazonaws.com/projects/6029237a8d024ade1b4873ef/releases/602923b29843d9cbda452d9d/img/vector-9@2x.svg",
  text2: "Subscribe to my nesletter",
  text6: "Subscribe to learn more",
  overlapgroup8Props: overlapgroup8Data,
  cardProps: cardData,
  card2Props: card4Data,
  card3Props: card3Data,
  card22Props: card22Data,
  card32Props: card32Data,
  overlapgroup82Props: overlapgroup82Data,
};
