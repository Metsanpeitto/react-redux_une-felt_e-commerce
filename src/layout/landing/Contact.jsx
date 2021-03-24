import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslate } from "react-redux-multilingual";
import Input from "../../effects/input/Input";
import { subscribeNewsletter } from "../../actions/Index";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email_address: "",
      first_name: "uneFelt",
      last_name: "client",
      members_list: [],
      loadingInterval: false,
      loadingIntervalWidth: 0,
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitLocation(e) {
    e.preventDefault();
    if (
      this.state.email_address !== "" ||
      this.state.first_name !== "" ||
      this.state.last_name !== ""
    ) {
      this.props.subscribeNewsletter(
        this.state.email_address,
        this.state.first_name,
        this.state.last_name
      );
    }
  }

  render() {
    const { translate } = this.props;
    const style = { margin: "10px 0", width: "100%" };
    return (
      <div className="layout2__contact">
        <form style={style} onSubmit={this.onSubmitLocation.bind(this)}>
          <div
            className="main--subscribe"
            data-tip="Input your email and press Enter to submit"
          >
            <h3 className="h2-didot-reg">{translate("subscribe")}</h3>
            <p className="parraf-lg">{translate("enter_email")}</p>
            <Input
              type="email"
              handleChange={this.handleChange}
              name="email_address"
              id="email"
              label="email here"
            />
          </div>
        </form>

        <ul className="list-group">
          {this.state.members_list.map((li, i) => {
            return (
              <li className="list-group-item" key={i} id={li.id}>
                {" "}
                <strong>{translate("email_address")}</strong> {li.email_address}{" "}
                - <strong>{translate("name")}</strong> {li.merge_fields.FNAME}{" "}
                {li.merge_fields.LNAME}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  subscribeNewsletter,
})(withTranslate(Contact));
