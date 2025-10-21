import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Cookies from "js-cookie";
import axiosInstance from "../../utils/axiosInstance";

const USER_FIELDS = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const GROCERY_BG =
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=2070&q=80";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  

  const token = Cookies.get("userJwtToken");
  const adminJwt = Cookies.get("adminJwtToken");

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/shopping");
    } else if (adminJwt) {
      navigate("/admin/dashboard");
    }
  }, [token, adminJwt, navigate]);

  // Cross-tab sync (no context): recompute redirect markers
  useEffect(() => {
    const syncAuth = () => {
      const t = Cookies.get("userJwtToken");
      const a = Cookies.get("adminJwtToken");
      if (t) navigate("/shopping");
      else if (a) navigate("/admin/dashboard");
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, [navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
     

      if (res.status === 200) {
        const user = res.data.user;

        // 1) Persist user markers first so guards can read them
        try { localStorage.setItem("user", JSON.stringify(user)); } catch(_) {}
        if (user?._id) {
          try { localStorage.setItem("userId", user._id); } catch(_) {}
        }

        // 2) Notify other tabs (optional)
        try { localStorage.setItem("authUpdate", String(Date.now())); } catch(_) {}

        // 3) Navigate based on role
        if (user.role === "user") {
          alert("Login Successful");
          navigate("/shopping", { replace: true });
        } else if (user.role === "admin") {
          alert("Admin Login Successful");
          navigate("/admin/dashboard", { replace: true });
        } else {
          alert("Invalid role");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Email or Password didn't match");
    }
  };

  return (
    <>
      <Header />
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundImage: `url('${GROCERY_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "40px 20px",
        }}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card
              className="shadow border-0 rounded-4"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <Card.Body className="p-5">
                <h3 className="text-center mb-4 fw-bold text-primary">
                  User Login
                </h3>
                <Form onSubmit={handleLogin}>
                  {USER_FIELDS.map(({ name, label, type }) => (
                    <Form.Group
                      className="mb-3 text-start"
                      controlId={name}
                      key={name}
                    >
                      <Form.Label className="fw-semibold">{label}</Form.Label>
                      <Form.Control
                        type={type}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        name={name}
                        value={credentials[name]}
                        onChange={handleChange}
                        required
                        className="rounded-3 py-2"
                      />
                    </Form.Group>
                  ))}
                  <div className="d-grid mt-4">
                    <Button
                      variant="outline-primary"
                      className="rounded-pill py-2 fw-bold"
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="text-center mt-4">
                  <small className="text-muted">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;


