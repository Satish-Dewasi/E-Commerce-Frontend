import "./App.css";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Dashboard from "./pages/admin/Dashboard";
import AddNewProduct from "./pages/admin/AddNewProduct";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import Hero from "./pages/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart";
import Orders from "./pages/admin/Orders";
import SignUp from "./components/Signup";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useRefreshTokenMutation } from "./redux/api/userApi";
import { useGetProfileQuery } from "./redux/api/authApi";
import Navbar from "./components/Navbar";
import Module from "./pages/admin/Module";

function App() {
  const showCart = useSelector((state) => state.Cart.showCart);
  const showSignupPage = useSelector((state) => state.auth.showSignupPage);
  const accessToken = useSelector((state) => state.auth.accessToken);

  // Use hooks at the top level of the component
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const { refetch: getProfile } = useGetProfileQuery(undefined, {
    skip: !accessToken,
  });

  //console.log(showSignupPage);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken) {
        try {
          await refreshTokenMutation().unwrap();
          // Automatically handles saving access token in the endpoint's onQueryStarted
        } catch (error) {
          console.error("Error during token refresh:", error);
          // Handle navigation to login if needed
        }
      }

      if (accessToken) {
        try {
          await getProfile(); // Call to fetch user profile
          // This will automatically save user details in the endpoint's onQueryStarted
        } catch (error) {
          console.error("Error fetching profile:", error);
          // Handle navigation to login if needed
        }
      }
    };

    fetchUserData();
  }, [accessToken, dispatch]);

  return (
    <div className=" w-full h-auto  ">
      {showCart && <Cart />}
      {showSignupPage && <SignUp />}
      <main>
        {/* <Navbar /> */}
        <Routes>
          <Route index element={<Hero />} />
          <Route path="/store" element={<Products />} />
          <Route path="/store/:category" element={<Products />} />
          <Route path="/store/product/:id" element={<ProductDetail />} />
          <Route path="/store/:category/:id" element={<ProductDetail />} />

          {/* protected routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* <Route path="/admin/dashboard/:module" element={<Module />} /> */}

          <Route path="/admin/products/add" element={<AddNewProduct />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
