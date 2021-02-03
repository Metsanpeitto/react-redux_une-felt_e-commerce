import React, { Component } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

function NestedList(props) {
  const [open, setOpen] = React.useState(props.open);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheader component="div" id="nested-list-subheader" />}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <div className="info-item">{props.form}</div>
        </List>
      </Collapse>
    </List>
  );
}
var openC = false;
var openG = false;
var openZ = false;

export default class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.location.pathname) {
      var key = this.props.location.pathname;
      key = key.replace("/info/", "");

      if (key === "gastos") {
        openG = true;
        openC = false;
        openZ = false;
      }
      if (key === "time") {
        openG = false;
        openC = true;
        openZ = false;
      }
      if (key === "delivery") {
        openG = false;
        openC = false;
        openZ = true;
      }
    }
  }

  handleChange = (event) => {};

  clickHandler = () => {
    this.setState({ button: !this.state.button });
  };

  render() {
    return (
      <section className="l-privacy">
        <h1>FAQ</h1>
        <div className="l-privacy--canvas">
          <NestedList
            className="card-header"
            text="How can I maintain the woolen product?"
            form={maintain}
            open={openC}
          />
          <NestedList
            className="card-header"
            text="Once the woolen product got stain what can I do?"
            form={stain}
            open={false}
          />

          <NestedList
            className="card-header"
            text="Do you offer custom and personalized orders?"
            form={custom}
            open={false}
          />

          <NestedList
            className="card-header"
            text="Do you offer a gift wrapping and packaging?"
            form={wrapping}
            open={false}
          />

          <NestedList
            className="card-header"
            text="How can I do? My pet bite the woolen doll, it is damaged now."
            form={pet}
            open={false}
          />
        </div>
      </section>
    );
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop);
}

const maintain = (
  <div className="card-body">
    <p>
      If there is some dust on it, you can using some soft brush to remove it.
    </p>
  </div>
);

const stain = (
  <div className="card-body">
    <p>
      If the woolen product is stained with drink, using tissue clean the liquid
      first. Generally wool fiber has a bit water repellency, before it suck the
      liquid. If unfortunately the woolen product still get some stains, you can
      suck it into water and using soap to give a gentle wash    with hands.
      Please do not use any brush to clean any woolen product. note* Some of the
      works are delicate, cannot be wash or clean. If you have any doubt, let us
      know and provide the best suggestion as we can.
    </p>
  </div>
);

const custom = (
  <div className="card-body">
    <p>
      You can request a custom order if you want to change some details of a
      work: change a color of elements of the work. In case you wish something
      brand new, I will be happy to fulfill the custom order for you after
      receiving full prepayment. After completing the work and before shipping
      it, I will send you a photo to be sure that it is exactly what you want.
    </p>
  </div>
);

const wrapping = (
  <div className="card-body">
    <p>
      All my works are well packaged in a craft box, if you need any gift card
      we also happy to provide one card with wishing words like Happy Birthday
      or Thank you.
    </p>
  </div>
);

const pet = (
  <div className="card-body">
    <p>
      We know most of the pets like playing fluffy toy, especially cats. If you
      can save the doll before it is almost damaged. We offer repair require,
      but it depends on its repairable possibility. Sending us the image and we
      will estimate the possibility. Once if that's not capable to    mend, we
      will suggest you to order new one.
    </p>
  </div>
);
