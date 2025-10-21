import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  Button,
  ButtonContainer,
} from "./styledComponents";

const resolveImageSrc = (src) => {
  if (!src) return "https://via.placeholder.com/600x400?text=Image+Unavailable";
  try {
    // If absolute http(s), block known third-party hosts (e.g., dreamstime.com)
    if (/^https?:\/\//i.test(src)) {
      const lower = src.toLowerCase();
      if (lower.includes("dreamstime.com")) {
        const fname = src.split("/").pop();
        return fname
          ? `/images/${fname}`
          : "https://via.placeholder.com/600x400?text=Image+Unavailable";
      }
      // allow same-origin or other approved hosts if needed
      return src;
    }
    // For relative paths or bare filenames, map to /images
    const fname = src.split("/").pop();
    return `/images/${fname}`;
  } catch (e) {
    return "https://via.placeholder.com/600x400?text=Image+Unavailable";
  }
};

const ProductItem = ({ id, name, description, price, img }) => {
  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId"); // now from localStorage

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const response = await axiosInstance.post("/cart/addToCart", {
        userId,
        productId: id,
        productname: name,
        price,
        image: img,
        quantity: 1,
      });

      console.log(response.data);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  return (
    <ProductContainer className="shadow-lg rounded-xl overflow-hidden bg-white hover:shadow-2xl transition duration-300">
      <ProductImage
        src={resolveImageSrc(img)}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://via.placeholder.com/600x400?text=Image+Unavailable";
        }}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <ProductName className="text-xl font-semibold mb-2 text-gray-800">
          {name}
        </ProductName>
        <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden">
          {description}
        </p>
        <ProductPrice className="text-lg font-bold text-green-600 mb-4">
          ${price}
        </ProductPrice>
        <ButtonContainer className="flex justify-between gap-2">
          <Link
            to={`/checkout/${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition duration-200 w-1/2 text-center"
          >
            Buy Now
          </Link>
          <Button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm transition duration-200 w-1/2"
          >
            Add to Cart
          </Button>
        </ButtonContainer>
      </div>
    </ProductContainer>
  );
};

export default ProductItem;
