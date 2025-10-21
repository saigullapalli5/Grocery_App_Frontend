import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 600px;
  margin: 10vh auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
  display: inline-block;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: rgb(98, 90, 252);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  min-height: 120px;
  transition: border-color 0.3s;

  &:focus {
    border-color: rgb(98, 90, 252);
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: rgb(98, 90, 252);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(78, 70, 230);
  }
`;

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
  });

  const { category, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!category) {
        return alert('Category is required');
      }

      const response = await axios.post('http://localhost:5100/api/categories/createCategory', {
        category,
        description,
      });

      console.log('Category added:', response.data);

      setFormData({
        category: '',
        description: '',
      });

    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Container>
      <Heading>Add New Category</Heading>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter category description"
          />
        </FormGroup>
        <Button type="submit">Add Category</Button>
      </Form>
    </Container>
  );
};

export default AddCategory;
