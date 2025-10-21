import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';

const Unavbar = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/admin/logout');
    } catch (_) {}
    // Clear cookies and storage to remove all persisted data
    try { Cookies.remove('adminJwtToken'); } catch (_) {}
    try { Cookies.remove('adminJwtToken', { path: '/' }); } catch (_) {}
    try { Cookies.remove('adminId'); } catch (_) {}
    try { Cookies.remove('userJwtToken'); } catch (_) {}
    try { Cookies.remove('userId'); } catch (_) {}
    try { Cookies.remove('userName'); } catch (_) {}
    try { localStorage.clear(); } catch (_) {}
    try { sessionStorage.clear(); } catch (_) {}
    try { localStorage.setItem('logoutTs', String(Date.now())); } catch (_) {}
    navigate('/login', { replace: true });
  };
  const get = localStorage.getItem('user');

  const navLinkStyle = {
    padding: "8px 16px",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: 500,
    transition: "0.3s ease",
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#16a34a" }} variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to="/uhome" style={{ color: "white", textDecoration: "none", fontSize: "22px", fontWeight: "bold" }}>
            Grocery Web App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-2">
            <Link to="/Admin/dashboard" style={navLinkStyle}>Dashboard</Link>
            <Link to="/admin/users" style={navLinkStyle}>Users</Link>
            <Link to="/admin/all-products" style={navLinkStyle}>Products</Link>
            <Link to="/admin/add-product" style={navLinkStyle}>Add Product</Link>
            <Link to="/admin/orders" style={navLinkStyle}>Orders</Link>
            <a href="/" onClick={handleLogout} style={{ ...navLinkStyle, backgroundColor: "#dc2626", borderRadius: "6px", padding: "8px 20px" }}>
              Logout
            </a>
            {/* <span style={{ color: "white", fontSize: "14px", marginLeft: "10px" }}>({JSON.parse(get).name})</span> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;
