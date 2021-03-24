import React, { Component } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";

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

class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  openC = false;
  openG = false;
  openZ = false;
  componentWillMount() {
    if (this.props.location.pathname) {
      var key = this.props.location.pathname;
      key = key.replace("/info/", "");
      if (key === "gastos") {
        this.openG = true;
        this.openC = false;
        this.openZ = false;
      }
      if (key === "time") {
        this.openG = false;
        this.openC = true;
        this.openZ = false;
      }
      if (key === "delivery") {
        this.openG = false;
        this.openC = false;
        this.openZ = true;
      }
    }
  }

  handleChange = (event) => {};

  clickHandler = () => {
    this.setState({ button: !this.state.button });
  };

  render() {
    const { translate } = this.props;
    const covered = (
      <div className="card-body">
        <p>{translate("privacy1A")}</p>
      </div>
    );

    const collect = (
      <div className="card-body">
        <p>{translate("privacy2A")}</p>
      </div>
    );

    const use = (
      <div className="card-body">
        <p>{translate("privacy3A")}</p>
      </div>
    );

    const matters = (
      <div className="card-body">
        <p>{translate("privacy4A")}</p>
      </div>
    );

    const marketing = (
      <div className="card-body">
        <p>{translate("privacy5A")}</p>
      </div>
    );

    const personal = (
      <div className="card-body">
        <p>{translate("privacy6A")}</p>
      </div>
    );

    return (
      <section className="l-privacy">
        <h1 className="h2-didot-reg">{translate("privacy")}</h1>
        <div className="l-privacy--canvas">
          <NestedList
            className="card-header"
            text={translate("privacy1")}
            form={covered}
            open={this.openC}
          />
          <NestedList
            className="card-header"
            text={translate("privacy2")}
            form={collect}
            open={false}
          />

          <NestedList
            className="card-header"
            text={translate("privacy3")}
            form={use}
            open={false}
          />

          <NestedList
            className="card-header"
            text={translate("privacy4")}
            form={matters}
            open={false}
          />

          <NestedList
            className="card-header"
            text={translate("privacy5")}
            form={marketing}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("privacy6")}
            form={personal}
            open={false}
          />
          <NestedList
            className="card-header"
            text={translate("privacy7")}
            form={personal}
            open={false}
          />
        </div>
      </section>
    );
  }
  scrollToMyRef = () => window.scrollTo(0, this.myRef.offsetTop);
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(withTranslate(Privacy));
