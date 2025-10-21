import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavabar from '../AdminNavbar';

const Container = styled.div`
  max-width: 700px;
  margin: 6vh auto;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Heading = styled.h1`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-top: 30px;
  color: #0d6efd;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #0d6efd;
    background-color: #fff;
  }
`;

const Textarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f9f9f9;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #0d6efd;
    background-color: #fff;
  }
`;

const Button = styled.button`
  background-color: #0d6efd;
  color: white;
  padding: 12px 20px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.25s;

  &:hover {
    background-color: #0056b3;
  }
`;

const UpdateProduct = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    productname: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    rating: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/products/admin/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  const { productname, description, price, image, category, countInStock, rating } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`/products/admin/${id}`, formData);
      console.log('Product updated:', response.data);
      navigate('/admin/all-products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <AdminNavabar />
      <Heading>Update Product</Heading>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="productname">Product Name</Label>
            <Input
              type="text"
              name="productname"
              value={productname}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="rating">Rating</Label>
            <Input
              type="number"
              name="rating"
              value={rating}
              onChange={handleChange}
              placeholder="Enter product rating"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
              placeholder="Enter product price"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="image">Image URL</Label>
            <Input
              type="text"
              name="image"
              value={image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="countInStock">Count in Stock</Label>
            <Input
              type="number"
              name="countInStock"
              value={countInStock}
              onChange={handleChange}
              placeholder="Enter stock count"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </FormGroup>

          <Button type="submit">Update Product</Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateProduct;
