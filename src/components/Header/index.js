import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const recomputeAuth = () => {
        // Determine auth state from readable indicators to avoid noisy server calls
        const userToken = Cookies.get('userJwtToken');
        const userId = Cookies.get('userId') || localStorage.getItem('userId');
        const adminToken = Cookies.get('adminJwtToken');
        const adminId = Cookies.get('adminId');
        const adminTs = localStorage.getItem('adminLoginTs');
        setIsUser(Boolean(userToken || userId));
        setIsAdmin(Boolean(adminToken || adminId || adminTs));
    };

    useEffect(() => {
        recomputeAuth();
        const onStorage = () => recomputeAuth();
        const onAuthLogout = () => recomputeAuth();
        window.addEventListener('storage', onStorage);
        window.addEventListener('auth:logout', onAuthLogout);
        // Collapse navbar when route changes (fixes extended menu not hiding)
        setExpanded(false);
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('auth:logout', onAuthLogout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const onLogout = async (e) => {
        // Prevent NavLink default navigation; we'll navigate after state updates
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        if (!window.confirm("Are you sure you want to log out?")) return;
        // Try to clear httpOnly cookies on server first
        try {
            const base = process.env.REACT_APP_API_BASE || 'http://localhost:5100/api';
            if (isAdmin) {
                await fetch(`${base}/admin/logout`, { method: 'POST', credentials: 'include' });
            }
            if (isUser) {
                await fetch(`${base}/auth/logout`, { method: 'POST', credentials: 'include' });
            }
        } catch (_) { /* ignore */ }

        // Clear readable cookies/local data (fallback/UI sync)
        try { Cookies.remove("ctoken"); } catch (_) {}
        Cookies.remove("adminJwtToken");
        try { Cookies.remove("adminJwtToken", { path: '/' }); } catch (_) {}
        Cookies.remove("adminId");
        Cookies.remove("userJwtToken");
        Cookies.remove("userId");
        Cookies.remove("userName");
        // Prefer a full clear to avoid leaving stale keys behind
        try { localStorage.clear(); } catch (_) {}
        try { sessionStorage.clear(); } catch (_) {}

        // Update UI state immediately
        setIsAdmin(false);
        setIsUser(false);
        setExpanded(false);
        // Recompute from storage/cookies for safety
        recomputeAuth();
        // Optionally broadcast to other tabs
        try { localStorage.setItem('logoutTs', String(Date.now())); } catch (_) {}
        // Navigate after state reflects logout
        navigate('/login', { replace: true });
    };

    const brandTo = isAdmin ? '/admin/all-products' : isUser ? '/shopping' : '/login';

    return (
        <Navbar
            fixed="top"
            expand="lg"
            style={{ minHeight: '10vh' }}
            className={isAdmin ? 'bg-danger' : 'bg-success'}
            expanded={expanded}
            onToggle={(next) => setExpanded(Boolean(next))}
        >
            <div className="container-fluid">
                <Navbar.Brand as={NavLink} to={brandTo} className="fw-bold text-white text-decoration-none">
                    G-Mart
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarContent" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="navbarContent">
                    <Nav className="me-auto gap-3">
                        {isAdmin ? (
                            <>
                                <NavLink to="/admin/dashboard" className="nav-link text-white" onClick={() => setExpanded(false)}>Dashboard</NavLink> 
                                <NavLink to="/admin/all-products" className="nav-link text-white" onClick={() => setExpanded(false)}>Products</NavLink>
                                <NavLink to="/admin/orders" className="nav-link text-white" onClick={() => setExpanded(false)}>Orders</NavLink>
                                <NavLink to="/admin/users" className="nav-link text-white" onClick={() => setExpanded(false)}>Users</NavLink>
                            </>
                        ) : 
                       isUser ? (
                            <>
                                <NavLink to="/shopping" className="nav-link text-white" onClick={() => setExpanded(false)}>Products</NavLink>
                                <NavLink to="/my-cart" className="nav-link text-white" onClick={() => setExpanded(false)}>My Cart</NavLink>
                                <NavLink to="/my-orders" className="nav-link text-white" onClick={() => setExpanded(false)}>Orders</NavLink>
                            </>
                        ) : null }       
                                        
                    </Nav>

                    <Nav className="ms-auto gap-3">
                        {!isUser && !isAdmin ? (
                            <div className="d-flex gap-2">
                                <NavLink to="/login" className="nav-link text-white" onClick={() => setExpanded(false)}>User Login</NavLink>
                                <span className="nav-link text-white">/</span>
                                <NavLink to="/alogin" className="nav-link text-white" onClick={() => setExpanded(false)}>Admin Login</NavLink>
                            </div>
                        ) : (
                            <button type="button" className="nav-link text-white btn btn-link p-0" onClick={onLogout}>
                                Logout
                            </button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;