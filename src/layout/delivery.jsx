import React, { Component } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withTranslate } from "react-redux-multilingual";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function NestedList(props) {
  const [open, setOpen] = React.useState(props.open);

  const handleClick = () => {
    setOpen(!open);
    console.log(open);
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

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    if (this.props.location.pathname) {
      var key = this.props.location.pathname;
      key = key.replace("/info/", "");
      console.log(key);
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
    const { translate } = this.props;

    const cancel = (
      <div className="card-body">
        <p>{translate("delivery1A")}</p>
      </div>
    );

    const payment = (
      <div className="card-body">
        <p> {translate("delivery1A")}We accept Visa, Mastercard, Paypal.</p>
      </div>
    );

    const exchange = (
      <div className="card-body">
        <p> {translate("delivery2A")}</p>
      </div>
    );

    const when = (
      <div className="card-body">
        <p> {translate("delivery3A")}</p>
      </div>
    );

    const where = (
      <div className="card-body">
        <p> {translate("delivery4A")}</p>
      </div>
    );

    const international = (
      <div className="card-body">
        <p> {translate("delivery5A")}</p>
      </div>
    );

    const receive = (
      <div className="card-body">
        <p> {translate("delivery6A")}</p>
      </div>
    );

    const ems = (
      <div className="card-body">
        <p> {translate("delivery7A")}</p>
      </div>
    );

    const dhl = (
      <div className="card-body">
        <p> {translate("delivery8A")}</p>
      </div>
    );

    const cost = (
      <div className="card-body">
        <p> {translate("delivery9A")}</p>
      </div>
    );

    const damaged = (
      <div className="card-body">
        <p> {translate("delivery10A")}</p>
      </div>
    );

    const tracking = (
      <div className="card-body">
        <p> {translate("delivery11A")}</p>
      </div>
    );

    return (
      <section className="l-privacy">
        <h1>{translate("order_shipping")}</h1>
        <div className="l-privacy--canvas">
          <NestedList
            className="card-header"
            text={translate("delivery1")}
            form={cancel}
            open={openC}
          />
          <NestedList
            className="card-header"
            text={translate("delivery2")}
            form={payment}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery3")}
            form={exchange}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery4")}
            form={when}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery5")}
            form={where}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery6")}
            form={international}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery7")}
            form={receive}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery8")}
            form={ems}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery9")}
            form={cost}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery10")}
            form={damaged}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("delivery11")}
            form={tracking}
            open={false}
          />
        </div>
      </section>
    );
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop);
}

//export default withTranslate(TopBar);
const mapStateToProps = (state) => ({
  state,
});

export default connect(
  mapStateToProps,
  {}
)(withTranslate(withRouter(Delivery)));