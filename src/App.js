// import './App.css';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Redirect
//  import Header from './components/Header';
// import Home from './components/Home';
// import NotFound from './components/NotFound';
// import 'bootstrap/dist/css/bootstrap.css';
// import Login from './components/Login';
// import Registration from './components/Registration';
// import ProtectedRoute from './components/ProtectedRoute';
// import Products from './components/Products';
// import Checkout from './components/Checkout';
// import MyOrders from './components/MyOrders';

// import MyCart from './components/MyCart';
// import Users from './admin_components/Users';
// import Orders from './admin_components/Orders';
// import AddCategory from './admin_components/AddCategory';
// import AddProduct from './admin_components/AddProduct';
// import AdminProducts from './admin_components/Products';
// import AdminProductItem from './admin_components/ProductItem';
// import UpdateProduct from './admin_components/Update';
// import AdminProtectedRoute from './admin_components/AdminProtectedRoute';
// import DashBoard from './admin_components/DashBoard';
// import AdminNavbar from './admin_components/AdminNavbar';
// import AdminLogin from './admin_components/AdminLogin';
// import AdminSignup from './admin_components/AdminSignup';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//          <Header />
//         <Routes>
//           {/* User routes */}
//            <Route path="/" element={<Home/>} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Registration />} />

//           <Route path='/shopping' element={<ProtectedRoute Component={Products}/>}/>
//           <Route path='/checkout/:id' element={<ProtectedRoute Component={Checkout}/>}/>
//           <Route path='/my-orders' element={<ProtectedRoute Component={MyOrders}/>}/>
//           <Route path='/my-cart' element={<ProtectedRoute Component={MyCart}/>}/>

//           {/* Admin routes */}
//           <Route path='/alogin' element={<AdminLogin />} />
//           <Route path='/asignup' element={<AdminSignup />} />
//           <Route path='/admin/navbar' element={<AdminNavbar/>}/>
//           <Route path='/admin/dashboard' element={<DashBoard/>}/>
//           <Route path='/admin/users' element={<AdminProtectedRoute Component={Users}/>}/>
//           <Route path='/admin/orders' element={<AdminProtectedRoute Component={Orders}/>}/>
//           <Route path='/admin/add-category' element={<AdminProtectedRoute Component={AddCategory}/>}/>
//           <Route path='/admin/all-products' element={<AdminProtectedRoute Component={AdminProducts}/>}/>
//           <Route path='/admin/product/:id' element={<AdminProtectedRoute Component={AdminProductItem}/>}/>
//           <Route path='/admin/add-product' element={<AdminProtectedRoute Component={AddProduct}/>}/>
//           <Route path='/admin/product-update/:id' element={<AdminProtectedRoute Component={UpdateProduct}/>}/>

//           <Route path="/not-found" element={<NotFound />} />
//           <Route path="*" element={<Navigate to='/not-found' element={<NotFound/>} />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/index.js";
import Home from "./components/Home/index.js";
import Login from "./components/Login/index.js";
import Registration from "./components/Registration/index.js";
import Products from "./components/Products/index.js";
import Checkout from "./components/Checkout/index.js";
import MyOrders from "./components/MyOrders/index.js";
import MyCart from "./components/MyCart/index.js";
import Users from "./admin_components/Users/index.js";
import Orders from "./admin_components/Orders/index.js";
import AddCategory from "./admin_components/AddCategory/index.js";
import AddProduct from "./admin_components/AddProduct/index.js";
import AdminProducts from "./admin_components/Products/index.js";
import AdminProductItem from "./admin_components/ProductItem/index.js";
import UpdateProduct from "./admin_components/Update/index.js";
import Dashboard from "./admin_components/Dashboard/index.js";
import AdminNavbar from "./admin_components/AdminNavbar.js";
import AdminLogin from "./admin_components/AdminLogin.js";
import AdminSignup from "./admin_components/AdminSignup.js";
import NotFound from "./components/NotFound/index.js";
import ProtectedRoute from "./components/UserProtected.js";
import AdminProtectedRoute from "./admin_components/AdminProtected.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* User routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/shopping"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout/:id"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cart"
            element={
              <ProtectedRoute>
                <MyCart />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route path="/alogin" element={<AdminLogin />} />
          <Route path="/asignup" element={<AdminSignup />} />
          <Route
            path="/admin/navbar"
            element={
              <AdminProtectedRoute>
                <AdminNavbar />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <Users />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <Orders />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/add-category"
            element={
              <AdminProtectedRoute>
                <AddCategory />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/all-products"
            element={
              <AdminProtectedRoute>
                <AdminProducts />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/product/:id"
            element={
              <AdminProtectedRoute>
                <AdminProductItem />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/product-update/:id"
            element={
              <AdminProtectedRoute>
                <UpdateProduct />
              </AdminProtectedRoute>
            }
          />

          {/* Not found */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
