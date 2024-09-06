import "./App.css";
import { useState } from "react";
import UserInfo from "./components/UserInfo";
import MainLayout from "./components/MainLayout";
import AllProducts from "./components/AllProducts";
import useFetchData from "./utils/useFetchProducts";
import useFetchCategories from "./utils/useFetchCategories";
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

  // Fetch products and categories using custom hooks
  const { data: products } = useFetchData(
    "https://localhost:8081/api/products"
  );
  const { categories } = useFetchCategories(
    "http://localhost:8081/api/categories"
  );

  console.log("Fetched categories in App:", categories);

  // Create the router with both routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Default route (index) for AllProducts */}
        <Route index element={<AllProducts data={products} />} />

        {/* Route for UserInfo */}
        <Route
          path="users"
          element={<UserInfo onUserFetch={handleUserFetch} />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
