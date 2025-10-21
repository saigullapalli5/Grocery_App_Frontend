import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import Header from "../Header";

// Styled Components
const FormContainer = styled.div`
  text-align: start;
  width: 600px;
  margin: 12vh auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FormHeader = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    quantity: "",
    paymentMethod: "cod",
    address: "",
  });

  const [productDetails, setProductDetails] = useState({});
  const { id } = useParams(); // product ID from URL

  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`/cart/${id}`)
      .then((response) => {
        const productData = response.data;
        console.log(productData)
        setProductDetails({
          productname: productData.productname,
          price: productData.price,
          productId : productData.productId
        });
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Get userId from localStorage instead of cookies
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const quantity = Number(formData.quantity) || 1;
    const price = Number(productDetails.price) || 0;
   const totalPrice = quantity * price;
    const orderPayload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      userId: userId,
      phone: formData.phone,
      productId: productDetails.productId,
      productname: productDetails.productname,
      quantity: String(quantity),
      price: String(totalPrice),
      paymentMethod: formData.paymentMethod,
      address: formData.address,
    };

    try {
      await axiosInstance.post(
        "/orders/createOrder",
        orderPayload
      );
      alert("Order placed successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        phone: "",
        quantity: "",
        paymentMethod: "cod",
        address: "",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <FormContainer>
        <FormHeader>
          Order for: {productDetails.productname || "Loading..."}
        </FormHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First Name:</Label>
            <Input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name:</Label>
            <Input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone:</Label>
            <Input
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Quantity:</Label>
            <Input
              type="number"
              name="quantity"
              placeholder="Enter the quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Address:</Label>
            <textarea
              rows={5}
              style={{ width: "100%", border: "1px solid grey" }}
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Payment Method:</Label>
            <Select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </Select>
          </FormGroup>

          <Button type="submit">Submit Order</Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Checkout;










