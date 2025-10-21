import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Button, Table, Card, Container, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import AdminNavabar from "../AdminNavbar";


const Users = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const backgroundStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1920&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    paddingTop: "80px",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0,0,0,0.6)",
    minHeight: "100vh",
    padding: "40px",
    borderRadius: "12px",
  };

  const toggleDetails = () => setShowDetails(!showDetails);

  useEffect(() => {
    axiosInstance
      .get(`/admin/getAllUsers`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Failed to fetch users", error));
  }, []);

  const deleteUser = (userId) => {
    axiosInstance
      .delete(`/admin/${userId}`)
      .then(() => {
        setUsers((prev) => prev.filter((u) => u?._id !== userId));
        alert("User deleted");
      })
      .catch((error) => console.error("Failed to delete user", error));
  };

  const deleteOrder = (orderId) => {
    axiosInstance
      .delete(`/orders/${orderId}`)
      .then(() => {
        setUserOrders((prev) => prev.filter((o) => o?._id !== orderId));
        alert("Order deleted");
      })
      .catch((error) => console.error("Failed to delete order", error));
  };

  const fetchUserOrders = (userId) => {
    axiosInstance
      .get(`/orders/admin/${userId}`)
      .then((response) => {
        setUserOrders(response.data);
        toggleDetails();
      })
      .catch((error) =>
        console.error("Error fetching user order data:", error)
      );
  };

  return (
    <>
      <AdminNavabar />
      <div style={backgroundStyle}>
        <Container style={overlayStyle}>
          <h2 className="text-center text-light mb-4">User Management</h2>
          <Table
            striped
            bordered
            hover
            responsive
            variant="dark"
            className="rounded overflow-hidden shadow-lg"
          >
            <thead>
              <tr>
                <th>Sl/No</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user?._id}>
                  <td>{index + 1}</td>
                  <td>{user?._id}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => deleteUser(user?._id)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => fetchUserOrders(user?._id)}
                    >
                      View Orders
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Modal for Order Details */}
          {showDetails && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1050 }}
            >
              <div
                className="modal-dialog modal-lg"
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                <div className="modal-content border-0 rounded-4 shadow-lg">
                  <div className="modal-header bg-gradient text-white rounded-top-4"
                    style={{ background: "linear-gradient(90deg, #007bff, #6610f2)" }}>
                    <h5 className="modal-title mx-auto">User Orders</h5>
                  </div>
                  <div className="modal-body px-4 py-3">
                    {userOrders.length === 0 ? (
                      <p className="text-center">No orders found.</p>
                    ) : (
                      userOrders.map((order) => (
                        <Card key={order._id} className="mb-4 shadow-sm border-0">
                          <Card.Body>
                            <Row>
                              <Col
                                md={4}
                                className="d-flex align-items-center justify-content-center"
                              >
                                <img
                                  src={`http://localhost:5100/api/products/products/${order.productId}/image`}
                                  alt="product"
                                  className="img-fluid rounded"
                                  style={{
                                    maxHeight: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                              </Col>
                              <Col md={8}>
                                <p>
                                  <strong>Order ID:</strong> {order._id}
                                </p>
                                <p>
                                  <strong>Name:</strong> {order.firstname}{" "}
                                  {order.lastname}
                                </p>
                                <p>
                                  <strong>Phone:</strong> {order.phone}
                                </p>
                                <p>
                                  <strong>Address:</strong> {order.address}
                                </p>
                                <p>
                                  <strong>Qty:</strong> {order.quantity}
                                </p>
                                <p>
                                  <strong>Price:</strong> ₹{order.price}
                                </p>
                                <p>
                                  <strong>Status:</strong>{" "}
                                  <span className="badge bg-warning text-dark">
                                    {order.status}
                                  </span>
                                </p>
                                <p>
                                  <strong>Payment Method:</strong>{" "}
                                  {order.paymentMethod}
                                </p>
                                <p>
                                  <strong>Created At:</strong>{" "}
                                  {new Date(order.createdAt).toLocaleString()}
                                </p>
                                <div className="d-flex justify-content-end mt-2">
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => deleteOrder(order._id)}
                                  >
                                    <FaTrash className="me-1" /> Delete Order
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      ))
                    )}
                  </div>
                  <div className="modal-footer">
                    <Button variant="secondary" onClick={toggleDetails}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Users;
 
 
 

































