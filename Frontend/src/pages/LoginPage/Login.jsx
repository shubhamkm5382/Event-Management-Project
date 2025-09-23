import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Login = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-gradient">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
              <Row className="g-0">
                {/* Left Side */}
                <Col md={6} className="bg-light p-4 d-flex flex-column justify-content-center text-center">
                  <h1 className="fw-bold text-primary">Welcome Back!</h1>
                  
                  <img
                    src="https://img.freepik.com/free-vector/gift-shopping-checklist-girl-cartoon-character-buying-presents-online-e-commerce-gift-card-promotion-birthday-anniversary-bonus-vector-isolated-concept-metaphor-illustration_335657-1282.jpg"
                    alt="Event Illustration"
                    className="img-fluid rounded-3 mt-3"
                  />
                </Col>

                {/* Right Side */}
                <Col md={6} className="p-5 d-flex flex-column justify-content-center">
                  <h2 className="mb-4 text-center text-primary">Event Manager Login</h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" placeholder="Enter username" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Enter password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 py-2 text-white fw-semibold">
                      Login
                    </Button>
                  </Form>
                 
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
