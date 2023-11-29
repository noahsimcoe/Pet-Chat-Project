import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

import "./style.scss";

const Contact = () => {
  const serviceId = import.meta.env.VITE_REACT_APP_SERVICE_ID;
  const formId = import.meta.env.VITE_REACT_APP_FORM_ID;
  const publicKey = import.meta.env.VITE_REACT_APP_USER_ID;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = "Your name is required";
    }

    if (
      !email ||
      !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)
    ) {
      errors.email = "Your email address is invalid";
    }

    if (!message) {
      errors.message = "Your message is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendEmail = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        formId,
        event.target,
        publicKey
      );

      event.target.reset();

      setName("");
      setEmail("");
      setMessage("");

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "from_name":
        setName(value);
        break;
      case "user_email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
    }
  };

  return (
    <div className="contact-page">
      <h1 className="contact-header">Contact Us!</h1>
      <p className="contact-description">
        "Are you interested in collaborating with us or have questions about our
        project? We would love to hear from you! Whether it's a suggestion, a
        creative idea, or a query, your input is valuable to us. Please feel
        free to contact us via the form below. We are always open to new ideas
        and discussions and look forward to connecting with like-minded people
        passionate about making a positive impact. Let's explore the
        possibilities together!
      </p>

      <div className="container">
        <div>
          <div className="col-md-6">
            <form className="contact-form" onSubmit={sendEmail}>
              <div className="row">
                <div className="input-group">
                  <label htmlFor="user-name"></label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="user-name form-control"
                    name="from_name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label
                    htmlFor="user-email"
                    className="user-email"
                    name="user-email"
                  ></label>
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="user-email form-control"
                    name="user_email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="message" className="user-message"></label>
                <textarea
                  className="message form-control"
                  placeholder="Message"
                  name="message"
                  value={message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div>
                <input className="submit-btn" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
