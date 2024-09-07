import "./App.css";
import { useState } from "react";
import UserInfo from "./components/UserInfo";
import MainLayout from "./components/MainLayout";
import AllProducts from "./components/AllProducts";
import { useOutletContext } from "react-router-dom";
import useFetchCategories from "./utils/useFetchCategories";
import OrderInfo from "./components/OrderInfo";
import Categories from "./components/Categories";
import ProductDetails from "./components/ProductDetails";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]); // State to hold the fetched users

  // Function to handle the data fetched by UserInfo
  const handleUserFetch = (data) => {
    setUsers(data);
  };

  //console.log("Fetched categories in App:", categories);

  // Create the router with both routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AllProducts />} />
        <Route path="category/:categoryId" element={<Categories />} />
        <Route path="product/:productId" element={<ProductDetails />} />

        <Route
          path="users"
          element={<UserInfo onUserFetch={handleUserFetch} />}
        />

        {/* Route for OrderInfo */}
        <Route path="orders/user/:userId" element={<OrderInfo />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
