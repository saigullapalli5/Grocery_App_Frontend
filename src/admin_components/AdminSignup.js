import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axiosInstance from "../utils/axiosInstance";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    // Optional: adminKey or role
    // adminKey: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/admin/register", formData);
      console.log("Admin registration successful:", data);
      alert("Admin registration successful");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error during admin registration:", error);
      alert("Error during admin registration");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <Header />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          paddingTop: "10vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Card
          className="shadow-lg p-4"
          style={{ width: "100%", maxWidth: "450px", borderRadius: "12px" }}
        >
          <Card.Body>
            <h2 className="text-center mb-4 text-danger fw-bold">
              Admin Sign Up
            </h2>
            <Form onSubmit={handleSubmit}>
              {[
                { controlId: "firstName", label: "First Name", type: "text" },
                { controlId: "lastName", label: "Last Name", type: "text" },
                { controlId: "username", label: "Username", type: "text" },
                { controlId: "email", label: "Email", type: "email" },
                { controlId: "password", label: "Password", type: "password" },
                // { controlId: "adminKey", label: "Admin Key", type: "password" },
              ].map((field) => (
                <Form.Group
                  controlId={field.controlId}
                  className="mb-3 text-start"
                  key={field.controlId}
                >
                  <Form.Label className="fw-semibold">{field.label}</Form.Label>
                  <Form.Control
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    name={field.controlId}
                    value={formData[field.controlId]}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              ))}
              <Button
                type="submit"
                className="w-100 mt-2"
                variant="danger"
                style={{ fontWeight: "600" }}
              >
                Register as Admin
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Already an admin? </span>
              <Link
                to="/admin/login"
                className="fw-semibold text-decoration-none text-danger"
              >
                Log In
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminRegistration;
