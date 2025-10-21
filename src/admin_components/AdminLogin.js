import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Cookies from "js-cookie"; // to manage cookies easily
import axiosInstance from "../utils/axiosInstance";

const commonFields = [
  { controlId: "email", label: "Email", type: "email" },
  { controlId: "password", label: "Password", type: "password" },
];

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const adminToken = Cookies.get("adminJwtToken");

  useEffect(() => {
    if (adminToken) {
      navigate("/admin/all-products", { replace: true });
    }
  }, [adminToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, status } = await axiosInstance.post("/admin/login", formData);

      if (status === 200) {
        console.log("Server response:", data);

        // Save a readable indicator for Header/AuthContext to detect admin state
        if (data?.adminId) {
          try { localStorage.setItem("adminId", String(data.adminId)); } catch (_) {}
          Cookies.set("adminId", String(data.adminId)); // optional
        } else {
          // Fallback: if API doesn't return adminId, set a boolean-ish flag
          try { localStorage.setItem("adminId", "true"); } catch (_) {}
        }
        try { localStorage.setItem("adminLoginTs", String(Date.now())); } catch (_) {}
        try { localStorage.setItem("authUpdate", String(Date.now())); } catch (_) {}

        alert("Login Successful");
        navigate("/admin/all-products", { replace: true });
      } else {
        alert("Email or Password didn't match");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/images/grocery-bg.jpg') center/cover no-repeat",
          padding: "40px 20px",
        }}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card className="shadow border-0 rounded-4" style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(2px)" }}>
              <Card.Body className="p-5">
                <h3 className="text-center mb-4 fw-bold text-primary">
                  Admin Login
                </h3>
                <Form onSubmit={handleSubmit}>
                  {commonFields.map((field) => (
                    <Form.Group
                      className="mb-3 text-start"
                      controlId={field.controlId}
                      key={field.controlId}
                    >
                      <Form.Label className="fw-semibold">
                        {field.label}
                      </Form.Label>
                      <Form.Control
                        type={field.type}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        name={field.controlId}
                        value={formData[field.controlId]}
                        onChange={handleInputChange}
                        required
                        className="rounded-3 py-2"
                      />
                    </Form.Group>
                  ))}
                  <div className="d-grid mt-4">
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="rounded-pill py-2 fw-bold"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Don’t have an account? <Link to="/asignup">Sign up</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLogin;
