import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styled from 'styled-components';
import LoaderSpinner from '../../components/LoaderSpinner';
import AdminNavbar from '../AdminNavbar';

// Background wrapper with image
const PageWrapper = styled.div`
  background: url('https://images.unsplash.com/photo-1607083201874-e05c7c0f3d8e') no-repeat center center/cover;
  min-height: 100vh;
  padding-top: 60px;
`;

// Transparent overlay for better readability
const Overlay = styled.div`
  background: rgba(255, 255, 255, 0.85);
  min-height: 100vh;
`;

// Container for content
const Container = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 32px;
  letter-spacing: 0.5px;
`;

const EmptyState = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
  padding: 40px 0;
`;

const OrdersWrapper = styled.div`
  display: grid;
  gap: 25px;
`;

const OrderCard = styled.div`
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 25px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

const OrderDetail = styled.p`
  margin: 6px 0;
  font-size: 15px;
  line-height: 1.5;

  strong {
    color: #2c3e50;
  }
`;

const Button = styled.button`
  background-color: #6c63ff;
  color: #fff;
  padding: 8px 18px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #574fd6;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StatusForm = styled.form`
  margin-bottom: 30px;
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid #ddd;

  label {
    font-weight: 500;
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
  }

  select {
    padding: 10px;
    font-size: 15px;
    border-radius: 6px;
    width: 100%;
    max-width: 250px;
    border: 1px solid #ccc;
    margin-bottom: 15px;
    outline: none;

    &:focus {
      border-color: #6c63ff;
      box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
    }
  }
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [statusForm, setStatusForm] = useState({ status: 'Confirmed' });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance
      .get('/orders/getAllOrders')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  const onSubmit = (formData) => {
    axiosInstance
      .put(`/orders/${selectedOrderId}`, formData)
      .then(() => {
        setIsUpdate(false);
        getData();
      })
      .catch(console.error);
  };

  const onChangeStatus = (orderId) => {
    setIsUpdate(true);
    setSelectedOrderId(orderId);
  };

  return (
    <div>
      <AdminNavbar />
      <PageWrapper>
        <Overlay>
          {isLoading ? (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LoaderSpinner />
            </div>
          ) : (
            <Container>
              <SectionTitle>Order Management</SectionTitle>

              {data.length === 0 ? (
                <EmptyState>No orders available at the moment.</EmptyState>
              ) : (
                <>
                  {isUpdate && (
                    <StatusForm onSubmit={(e) => { e.preventDefault(); onSubmit(statusForm); }}>
                      <label htmlFor="statusSelect">Change Order Status</label>
                      <select
                        id="statusSelect"
                        value={statusForm.status}
                        onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <div>
                        <Button type="submit">Update Status</Button>
                      </div>
                    </StatusForm>
                  )}

                  {!isUpdate && (
                    <OrdersWrapper>
                      {data.map((item) => (
                        <OrderCard key={item._id}>
                          <OrderDetail><strong>Order ID:</strong> {item._id}</OrderDetail>
                          <OrderDetail><strong>Name:</strong> {item.firstname} {item.lastname}</OrderDetail>
                          <OrderDetail><strong>Phone:</strong> {item.phone}</OrderDetail>
                          <OrderDetail><strong>Product ID:</strong> {item.productId}</OrderDetail>
                          <OrderDetail><strong>Quantity:</strong> {item.quantity}</OrderDetail>
                          <OrderDetail><strong>Total Price:</strong> ₹{item.price}</OrderDetail>
                          <OrderDetail><strong>Payment Method:</strong> {item.paymentMethod}</OrderDetail>
                          <OrderDetail><strong>Address:</strong> {item.address}</OrderDetail>
                          <OrderDetail><strong>Placed On:</strong> {new Date(item.createdAt).toLocaleString()}</OrderDetail>

                          <StatusRow>
                            <OrderDetail><strong>Status:</strong> {item.status}</OrderDetail>
                            {item.status === 'Delivered' ? (
                              <Button disabled>Delivered</Button>
                            ) : item.status === 'Canceled' ? (
                              <Button disabled>Customer Canceled</Button>
                            ) : (
                              <Button onClick={() => onChangeStatus(item._id)}>Update Status</Button>
                            )}
                          </StatusRow>
                        </OrderCard>
                      ))}
                    </OrdersWrapper>
                  )}
                </>
              )}
            </Container>
          )}
        </Overlay>
      </PageWrapper>
    </div>
  );
};

export default Orders;
