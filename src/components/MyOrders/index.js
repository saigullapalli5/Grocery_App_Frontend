import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import styled from 'styled-components';
import Header from '../Header';

// Styled component for layout
const Container = styled.div`
  padding: 20px;
  margin-top: 10vh;
  text-align: start;
`;

const MyOrders = () => {
  const userId = localStorage.getItem('userId'); // ✅ Get from localStorage
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all | pending | delivered

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/orders/${userId}`);
        setOrders(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch your orders. Please try again.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  const pendingCount = orders.filter(o => o.status !== 'Delivered').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  const filteredOrders = orders.filter((o) => {
    if (filter === 'pending') return o.status !== 'Delivered';
    if (filter === 'delivered') return o.status === 'Delivered';
    return true;
  });

  return (
    <div>
      <Header />
      <Container>
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">📦 My Orders</h1>

        <div className="max-w-6xl mx-auto mb-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white shadow rounded p-4">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-xl font-semibold">{orders.length}</div>
          </div>
          <div className="bg-white shadow rounded p-4">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-xl font-semibold text-yellow-700">{pendingCount}</div>
          </div>
          <div className="bg-white shadow rounded p-4">
            <div className="text-sm text-gray-500">Delivered</div>
            <div className="text-xl font-semibold text-green-700">{deliveredCount}</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-6 flex gap-2 justify-center">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded border ${filter==='all' ? 'bg-green-600 text-white border-green-600' : 'bg-white'}`}>All</button>
          <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded border ${filter==='pending' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white'}`}>Pending</button>
          <button onClick={() => setFilter('delivered')} className={`px-4 py-2 rounded border ${filter==='delivered' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}>Delivered</button>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading your orders...</p>
        )}
        {error && (
          <p className="text-center text-red-600">{error}</p>
        )}

        {!loading && !error && (
          filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No orders found for this filter.</p>
          ) : (
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOrders.map((order) => {
                const isDelivered = order.status === 'Delivered';
                const statusClass = isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
                const price = Number(order.price || 0).toFixed(2);
                return (
                  <div key={order._id} className="border rounded-lg shadow-sm p-5 bg-white hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 truncate" title={order.productname}>{order.productname}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${statusClass}`}>{order.status}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><span className="font-semibold text-gray-800">Order ID:</span> {order._id}</div>
                      <div><span className="font-semibold text-gray-800">Qty:</span> {order.quantity}</div>
                      <div><span className="font-semibold text-gray-800">Total:</span> ${price}</div>
                      <div><span className="font-semibold text-gray-800">Payment:</span> {order.paymentMethod}</div>
                      <div><span className="font-semibold text-gray-800">Date:</span> {new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default MyOrders;



















