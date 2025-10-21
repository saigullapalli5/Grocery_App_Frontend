import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
// import Cookies from "js-cookies";
import Header from "../Header";
import { Link } from "react-router-dom";
import {
  ProductContainer,
  ProductName,
  ProductDescription,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "../ProductItem/styledComponents";

const MyCart = () => {
  const userId = localStorage.getItem("userId");
  const [cartData, setCartData] = useState([]);
  const [placingAll, setPlacingAll] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    paymentMethod: "cod",
    address: "",
  });

  const resolveImageSrc = (src) => {
    if (!src) return "https://via.placeholder.com/600x400?text=Image+Unavailable";
    try {
      if (/^https?:\/\//i.test(src)) {
        const lower = src.toLowerCase();
        if (lower.includes('dreamstime.com')) {
          const fname = src.split('/').pop();
          return fname ? `/images/${fname}` : "https://via.placeholder.com/600x400?text=Image+Unavailable";
        }
        return src;
      }
      const fname = src.split('/').pop();
      return `/images/${fname}`;
    } catch (e) {
      return "https://via.placeholder.com/600x400?text=Image+Unavailable";
    }
  };
  const totalPrice = cartData.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
  const totalItems = cartData.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  useEffect(() => {
    getProductsList();
  }, []);

  const getProductsList = () => {
    axiosInstance
      .get(`/cart/user/${userId}`)
      .then((response) => {
        setCartData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const updateQuantity = async (cartItemId, nextQty) => {
    try {
      if (nextQty < 1) nextQty = 1;
      const { data } = await axiosInstance.patch(`/cart/${cartItemId}`, { quantity: nextQty });
      // Update local state optimistically with returned item
      setCartData((prev) => prev.map((it) => (it._id === cartItemId ? { ...it, quantity: data.quantity } : it)));
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity');
    }
  };

  const handleCancelClick = (cartItemId) => {
    axiosInstance
      .delete(`/cart/${cartItemId}`)
      .then(() => {
        setCartData((prevCartData) =>
          prevCartData.filter((item) => item._id !== cartItemId)
        );
        getProductsList();
      })
      .catch((error) => {
        console.error("Error removing product from cart:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="pt-[100px] px-4">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">🛒 My Cart</h1>

        {cartData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cartData.map((product) => (
                <ProductContainer
                  key={product._id}
                  className="shadow-lg rounded-lg overflow-hidden bg-white"
                >
                  <ProductImage
                    src={resolveImageSrc(product.image)}
                    alt={product.productname}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://via.placeholder.com/600x400?text=Image+Unavailable";
                    }}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <ProductName className="text-xl font-semibold mb-1">
                      {product.productname}
                    </ProductName>
                    <ProductPrice className="text-green-600 font-bold mb-3">
                      ${Number(product.price).toFixed(2)}
                    </ProductPrice>
                    <div className="flex items-center gap-3">
                      <button
                        className="px-3 py-1 bg-gray-200 rounded"
                        onClick={() => updateQuantity(product._id, Number(product.quantity || 1) - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="min-w-6 text-center">{product.quantity || 1}</span>
                      <button
                        className="px-3 py-1 bg-gray-200 rounded"
                        onClick={() => updateQuantity(product._id, Number(product.quantity || 1) + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
  
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => handleCancelClick(product._id)}
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                      <Link
                        to={`/checkout/${product._id}`}
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </ProductContainer>
              ))}
            </div>
            <div className="max-w-6xl mx-auto mt-6 flex justify-end">
              <div className="bg-white shadow rounded px-6 py-4 text-right flex items-center gap-6">
                <div>
                  <div className="text-gray-600 text-sm">Items</div>
                  <div className="text-xl font-semibold">{totalItems}</div>
                </div>
                <div>
                  <div className="text-gray-600 text-sm">Subtotal</div>
                  <div className="text-2xl font-bold text-green-700">${totalPrice.toFixed(2)}</div>
                </div>
                <button
                  disabled={!cartData.length}
                  onClick={() => setPlacingAll(true)}
                  className={`px-5 py-2 rounded text-white ${cartData.length ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  Place All Orders
                </button>
              </div>
            </div>

            {placingAll && (
              <div className="max-w-3xl mx-auto mt-6 bg-white shadow rounded p-6 text-left">
                <h2 className="text-xl font-semibold mb-4">Shipping & Payment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">First Name</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      value={formData.firstname}
                      onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      value={formData.lastname}
                      onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
                    <select
                      className="w-full border rounded px-3 py-2"
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    >
                      <option value="cod">Cash on Delivery (COD)</option>
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <textarea
                      className="w-full border rounded px-3 py-2"
                      rows={4}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-3 justify-end">
                  <button
                    className="px-4 py-2 rounded border"
                    onClick={() => setPlacingAll(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700"
                    onClick={async () => {
                      try {
                        const payload = { ...formData, userId };
                        await axiosInstance.post('/orders/createFromCart', payload);
                        alert('Orders placed successfully!');
                        setPlacingAll(false);
                        setFormData({ firstname: '', lastname: '', phone: '', paymentMethod: 'cod', address: '' });
                        // Refresh cart
                        getProductsList();
                      } catch (err) {
                        console.error('Place all orders error:', err);
                        alert('Failed to place orders. Please try again.');
                      }
                    }}
                  >
                    Confirm & Place ({totalItems} items)
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;























