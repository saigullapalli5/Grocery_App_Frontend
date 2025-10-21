import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import styled from "styled-components";
import AdminNavabar from "../AdminNavbar";

// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 5vh auto;
  padding: 30px;
  background-color: #f4f9ff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  text-align: center;
  color: #003366;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputRowsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productname: "",
    description: "",
    price: "",
    image: "",
    category: "",
    countInStock: "",
    rating: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/categories/admin/allCategories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const {
    productname,
    description,
    price,
    image,
    category,
    countInStock,
    rating,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productname ||
      !description ||
      !price ||
      !image ||
      !category ||
      !countInStock ||
      !rating
    ) {
      return alert("Please fill in all required fields");
    }

    try {
      const response = await axiosInstance.post(
        "/products/createProduct",
        formData
      );
      alert("Item added successfully");
      console.log("Product added:", response.data);
      setFormData({
        productname: "",
        description: "",
        price: "",
        image: "",
        category: "",
        countInStock: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      <AdminNavabar />
      <Heading>Add Product</Heading>
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputRowsContainer>
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
          </InputRowsContainer>

          <InputRowsContainer>
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
              <Select name="category" value={category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="snacks">Snacks</option>
                <option value="dryfruits">Dry Fruits</option>
                <option value="Beverages">Beverages</option>
                <option value="Meat and Seafood">Meat and Seafood</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="countInStock">Count in Stock</Label>
              <Input
                type="number"
                name="countInStock"
                value={countInStock}
                onChange={handleChange}
                placeholder="Enter count in stock"
              />
            </FormGroup>
          </InputRowsContainer>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
            />
          </FormGroup>

          <Button type="submit">Add Product</Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddProduct;
