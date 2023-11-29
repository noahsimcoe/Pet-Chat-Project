import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Card, Form, Button } from "react-bootstrap";
import { CREATE_USER } from "../../utils/mutations";

import Auth from "../../utils/auth";

import "./style.scss";

const Signup = () => {
  const [formState, setFormStage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormStage({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="signup-card">
      <Card.Body>
        <Card.Title className="card-title">Sign Up</Card.Title>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formFirstName">
            <div>
              <Form.Label>First Name</Form.Label>
            </div>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <div>
              <Form.Label>Last Name</Form.Label>
            </div>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <div>
              <Form.Label>Email Address</Form.Label>
            </div>
            <Form.Control
              className="form-input"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <div>
              <Form.Label>Password</Form.Label>
            </div>
            <Form.Control
              className="form-input"
              type="password"
              placeholder="******"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            className="btn-block  submit-btn"
            style={{ cursor: "pointer" }}
            type="submit"
          >
            Submit
          </Button>
        </Form>

        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : null}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Signup;
