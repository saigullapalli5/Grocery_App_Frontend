import React from "react";
import { Link } from "react-router-dom";
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "./styledComponents";

const AdminProductItem = ({ id, name, description, price, img, handleDeleteProduct }) => {
  const handleDelete = async () => {
    handleDeleteProduct(id);
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} />
      <div style={{ padding: "10px" }}>
        <ProductName>{name}</ProductName>
        <ProductPrice>${price}</ProductPrice>
        <ButtonContainer>
          <Link
            to={`/admin/product-update/${id}`}
            className="btn btn-primary"
            style={{
              borderRadius: "5px",
              padding: "6px 12px",
              fontSize: "14px",
              marginRight: "10px",
              backgroundColor: "#007bff",
              border: "none",
            }}
          >
            Update
          </Link>
          <Button
            onClick={handleDelete}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              borderRadius: "5px",
              padding: "6px 12px",
              fontSize: "14px",
              border: "none",
            }}
          >
            Delete
          </Button>
        </ButtonContainer>
      </div>
    </ProductContainer>
  );
};

export default AdminProductItem;
