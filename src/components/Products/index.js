// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import ProductItem from "../ProductItem";
// import Header from "../Header";
// import axios from "axios";

// const ProductsContainer = styled.div`
//   margin-top: 10vh;
//   padding: 2rem;
// `;

// const Heading = styled.h2`
//   font-size: 2rem;
//   color: #222;
//   margin-top: 2rem;
//   margin-bottom: 1.5rem;
// `;

// const StyledList = styled.ul`
//   list-style: none;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 2rem;
//   padding: 0;
// `;

// const ListItem = styled.li`
//   flex: 1 1 250px;
// `;

// const SearchBar = styled.input`
//   width: 100%;
//   padding: 12px 16px;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   outline: none;
//   transition: border 0.3s ease;

//   &:focus {
//     border-color: #00bcd4;
//   }
// `;

// const CategoryFilter = styled.select`
//   width: 100%;
//   padding: 12px 16px;
//   font-size: 1rem;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   background: #fff;
//   outline: none;
// `;

// const FiltersContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 2rem;
//   margin-top: 2rem;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const FilterBlock = styled.div`
//   flex: 1;
//   min-width: 280px;
// `;

// const Products = () => {
//   const api = "http://localhost:5100/api/products/getAllProducts";
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // ✅ Send credentials (cookies) with request
//         const response = await axios.get(api, { withCredentials: true });
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSearchChange = (e) => setSearchQuery(e.target.value);
//   const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

//   const filteredProducts = products.filter((product) => {
//     const nameMatch = product.productname
//       ?.toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     if (selectedCategory === "all") return nameMatch;
//     return nameMatch && product.category?.toLowerCase() === selectedCategory;
//   });

//   const categories = [
//     "all",
//     ...new Set(products.map((p) => p.category?.toLowerCase())),
//   ];

//   return (
//     <>
//       <Header />
//       <ProductsContainer>
//         <FiltersContainer>
//           <FilterBlock>
//             <h5>🔍 Search By Product Name</h5>
//             <SearchBar
//               type="text"
//               placeholder="Type product name..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//             />
//           </FilterBlock>

//           <FilterBlock>
//             <h5>📂 Filter By Category</h5>
//             <CategoryFilter
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//             >
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category.charAt(0).toUpperCase() + category.slice(1)}
//                 </option>
//               ))}
//             </CategoryFilter>
//           </FilterBlock>
//         </FiltersContainer>

//         <Heading>🛍️ Products</Heading>
//         <StyledList>
//           {filteredProducts.map((product) => (
//             <ListItem key={product._id}>
//               <ProductItem
//                 id={product._id}
//                 img={product.image}
//                 name={product.productname}
//                 description={product.description}
//                 price={product.price}
//               />
//             </ListItem>
//           ))}
//         </StyledList>
//       </ProductsContainer>
//     </>
//   );
// };

// export default Products;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductItem from "../ProductItem";
import axiosInstance from "../../utils/axiosInstance";

// Using axiosInstance for API calls

// Friendly, ordered defaults for grocery categories
const DEFAULT_CATEGORY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "fruits", label: "Fruits" },
  { value: "vegetables", label: "Vegetables" },
  { value: "dairy", label: "Dairy" },
  { value: "snacks", label: "Snacks" },
  { value: "dryfruits", label: "Dry Fruits" },
  { value: "beverages", label: "Beverages" },
  { value: "meat and seafood", label: "Meat and Seafood" },
  { value: "bakery", label: "Bakery" },
  { value: "grains", label: "Grains" },
  { value: "spices", label: "Spices" },
];

const ProductsContainer = styled.div`
  margin-top: 10vh;
  padding: 2rem;
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: #222;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

// ✅ Changed to Flexbox instead of Grid
const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 1200px;
  padding: 0 15px;
`;

const ListItem = styled.li`
  width: 250px;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: #00bcd4;
  }
`;

const CategoryFilter = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  outline: none;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterBlock = styled.div`
  flex: 1;
  min-width: 280px;
`;

const CarouselWrapper = styled.div`
  .carousel-inner img {
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]); // raw categories from API
  const [categoryOptions, setCategoryOptions] = useState(
    DEFAULT_CATEGORY_OPTIONS
  );
  const [categoryIdKeyMap, setCategoryIdKeyMap] = useState({}); // id -> normalized name key

  // Load products and categories from backend
  useEffect(() => {
    // Products
    axiosInstance
      .get("/products/getAllProducts")
      .then(({ data }) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (err?.response?.status === 401) return; // ignore unauthorized in UI
        console.warn("Products fetch failed:", err);
      });

    // Categories
    axiosInstance
      .get("/categories/allCategories")
      .then(({ data }) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.warn("Categories fetch failed:", err));
  }, []);

  useEffect(() => {
    // Helpers
    const hasDigit = (s) => /\d/.test(String(s || ""));
    const pretty = (s) => {
      const str = String(s || "")
        .trim()
        .replace(/[_-]+/g, " ")
        .toLowerCase();
      if (!str) return "";
      return str.replace(/\b\w/g, (m) => m.toUpperCase());
    };
    const normalizeKey = (s) => {
      const cleaned = String(s || "")
        .toLowerCase()
        .trim()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ");
      const alias = {
        fruit: "fruits",
        fruits: "fruits",
        veggie: "vegetables",
        veggies: "vegetables",
        vegetable: "vegetables",
        vegetables: "vegetables",
        dairy: "dairy",
        snack: "snacks",
        snacks: "snacks",
        beverage: "beverages",
        beverages: "beverages",
        "dry fruit": "dry fruits",
        "dry fruits": "dry fruits",
        dryfruits: "dry fruits",
        "meat and seafood": "meat and seafood",
        meat: "meat and seafood",
        seafood: "meat and seafood",
        grain: "grains",
        grains: "grains",
        spice: "spices",
        spices: "spices",
        bakery: "bakery",
      };
      return alias[cleaned] || cleaned;
    };

    // If API categories exist, use their IDs as option values; otherwise fallback to friendly defaults and product-derived names
    if (Array.isArray(categories) && categories.length > 0) {
      const opts = [{ value: "all", label: "All" }];
      const idToKey = {};
      for (const c of categories) {
        const id = c?._id || c?.id;
        const rawName = c?.name || c?.label || c?.title;
        if (!id || !rawName) continue;
        if (hasDigit(rawName)) continue; // hide numeric labels
        const key = normalizeKey(rawName);
        idToKey[String(id)] = key;
        opts.push({ value: String(id), label: pretty(rawName) });
      }
      if (opts.length > 1) {
        setCategoryOptions(opts);
        setCategoryIdKeyMap(idToKey);
        if (!opts.find((o) => o.value === selectedCategory))
          setSelectedCategory("all");
        return;
      }
    }

    // Fallback: use friendly defaults and names from products
    const map = new Map(
      DEFAULT_CATEGORY_OPTIONS.map((o) => [
        normalizeKey(o.value),
        { value: normalizeKey(o.value), label: o.label },
      ])
    );
    if (products.length > 0) {
      const nameSet = new Set(
        products
          .map((p) => {
            const pc = p.category;
            if (pc && typeof pc === "object") return pc.name || pc.title;
            return pc;
          })
          .filter(Boolean)
          .map(String)
      );
      for (const name of nameSet) {
        if (hasDigit(name)) continue;
        const key = normalizeKey(name);
        const label = pretty(name);
        if (!map.has(key)) map.set(key, { value: key, label });
      }
    }
    const opts = Array.from(map.values());
    setCategoryOptions(opts);
    setCategoryIdKeyMap({});
    if (!opts.find((o) => o.value === selectedCategory))
      setSelectedCategory("all");
  }, [categories, products]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = (product?.productname || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (selectedCategory === "all") return nameMatch;
    const pc = product?.category;
    const prodCatId = pc && typeof pc === "object" ? pc._id || pc.id : pc;
    const prodCatIdAlt =
      product?.categoryId || product?.categoryID || product?.category_id;
    const prodCatName = pc && typeof pc === "object" ? pc.name || pc.title : pc;
    if (prodCatId && String(prodCatId) === String(selectedCategory))
      return nameMatch;
    if (prodCatIdAlt && String(prodCatIdAlt) === String(selectedCategory))
      return nameMatch;
    const normalizeKey = (s) => {
      const cleaned = String(s || "")
        .toLowerCase()
        .trim()
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ");
      const alias = {
        fruit: "fruits",
        fruits: "fruits",
        veggie: "vegetables",
        veggies: "vegetables",
        vegetable: "vegetables",
        vegetables: "vegetables",
        dairy: "dairy",
        snack: "snacks",
        snacks: "snacks",
        beverage: "beverages",
        beverages: "beverages",
        "dry fruit": "dry fruits",
        "dry fruits": "dry fruits",
        dryfruits: "dry fruits",
        "meat and seafood": "meat and seafood",
        meat: "meat and seafood",
        seafood: "meat and seafood",
        grain: "grains",
        grains: "grains",
        spice: "spices",
        spices: "spices",
        bakery: "bakery",
      };
      return alias[cleaned] || cleaned;
    };
    const prodKey = normalizeKey(prodCatName);
    const selKey = categoryIdKeyMap[selectedCategory] || selectedCategory;
    return nameMatch && prodKey === selKey;
  });

  return (
    <>
      <ProductsContainer>
        <CarouselWrapper>
          <div
            id="carouselExampleIndicators"
            className="carousel slide mb-5"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-vector/beautiful-banner-floral-leaves-template_21799-2812.jpg"
                  alt="Slide 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/free-psd/spring-sale-social-media-cover-template_47987-15231.jpg"
                  alt="Slide 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/premium-vector/vegetable-grocery-delivery-promotion-facebook-cover-web-banner-social-media-post-template_584651-68.jpg"
                  alt="Slide 3"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              role="button"
              data-slide="prev"
              href="#carouselExampleIndicators"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              role="button"
              data-slide="next"
              href="#carouselExampleIndicators"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </CarouselWrapper>

        <FiltersContainer>
          <FilterBlock>
            <h5>🔍 Search By Product Name</h5>
            <SearchBar
              type="text"
              placeholder="Type product name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </FilterBlock>

          <FilterBlock>
            <h5>📂 Filter By Category</h5>
            <CategoryFilter
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </CategoryFilter>
          </FilterBlock>
        </FiltersContainer>

        <Heading>🛍️ Products</Heading>
        <StyledList>
          {filteredProducts.map((product) => (
            <ListItem key={product._id}>
              <ProductItem
                id={product._id}
                img={product.image}
                name={product.productname}
                description={product.description}
                price={product.price}
                category={product.category}
              />
            </ListItem>
          ))}
        </StyledList>
      </ProductsContainer>
    </>
  );
};

export default Products;
