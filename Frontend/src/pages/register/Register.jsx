import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Register = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/blurred-crowd-people-partying-nightclub_1232-3042.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="bg-dark bg-opacity-50 w-100 h-100 position-absolute top-0 start-0"></div>

      <Container className="position-relative">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Row className="g-0">
                {/* Left Side */}
                <Col
                  md={6}
                  className="bg-primary text-white p-4 d-flex flex-column justify-content-center text-center"
                >
                  <h1 className="fw-bold">Join Us!</h1>
                  <p className="opacity-75">
                    Create your account and start managing events easily.
                  </p>
                  <img
                    src="https://img.freepik.com/free-vector/registration-concept-illustration_114360-7870.jpg"
                    alt="Register Illustration"
                    className="img-fluid rounded-3 mt-3"
                  />
                </Col>

                {/* Right Side */}
                <Col
                  md={6}
                  className="p-5 d-flex flex-column justify-content-center bg-white"
                >
                  <h2 className="mb-4 text-center text-primary">
                    Event Manager Registration
                  </h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2 fw-semibold"
                    >
                      Register
                    </Button>
                  </Form>
                  <p className="text-center mt-3">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="fw-bold text-decoration-none text-primary"
                    >
                      Login
                    </a>
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
