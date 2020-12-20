import React, { Component } from "react";
import * as emailjs from "emailjs-com";
import SimpleReactValidator from "simple-react-validator";
import { withTranslate } from "react-redux-multilingual";
import { withRouter } from "react-router-dom";

import Facebook from "../icons/Facebook";
import Pinterest from "../icons/Pinterest";
import Youtube from "../icons/Youtube";
import Instagram from "../icons/Instagram";

//AIzaSyADbvaiUnaCa2HuKsVLMYbMUY4DvOUFIjk   GoogleAPImaps
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from_name: "",
      user_mail: "",
      subject: "",
      message: "",
      mailSent: false,
      error: null,
    };
    this.validator = new SimpleReactValidator();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { from_name, user_mail, subject, message } = this.state;
    let templateParams = {
      from_name: from_name,
      user_mail: user_mail,
      subject: subject,
      message: message,
    };
    emailjs
      .send(
        "default_service",
        "emailtemplate",
        templateParams,
        process.env.REACT_APP_EMAILJS
      )
      .then(
        (res) => {
          alert("Your message was succesfully sent !");
          // this.resetForm();
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  }

  handleChange = (e) => {
    var value = e.currentTarget.value;
    const name = e.currentTarget.name;
    if (e.currentTarget.name) {
      this.setState(() => {
        return { [name]: value };
      });
    } else return null;
  };

  resetForm() {
    this.setState(() => {
      return {
        from_name: "",
        user_mail: "",
        subject: "",
        message: "",
        mailSent: true,
        error: null,
      };
    });
  }
  /*   src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50059.12775918716!2d72.78534673554945!3d21.16564923510817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1533793756956"
   */
  render() {
    const { translate } = this.props;

    return (
      <section className="l-contact-canvas">
        <h3 className="title">Contact</h3>
        <div className="l-contact">
          <iframe
            title="google"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d726.5011199455585!2d-5.776505786481614!3d43.25132791966658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd36f6889d124981%3A0x6cd613e0c84b5ec2!2sCalle%20Armando%20Palacio%20Vald%C3%A9s%2C%2010%2C%2033600%20Mieres%2C%20Asturias!5e0!3m2!1sen!2ses!4v1594039183938!5m2!1sen!2ses"
            allowFullScreen=""
          />
          <h5 className="l-contact__address">
            {" "}
            2F. No.23 BinHai 1st. Rd. Gushan Dist. Kaohsiung City 804 Taiwan
          </h5>
        </div>
        <div className="l-contact-links">
          <div className="main--social">
            <h3>Social Media</h3>
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
          <h5 className="email">service@unefelt.com</h5>
        </div>
      </section>
    );
  }
}

export default withTranslate(withRouter(Contact));
