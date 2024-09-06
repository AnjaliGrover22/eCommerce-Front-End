import "./App.css";
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
  const { data } = useFetchData("https://localhost:8081/api/products");
  const { categories } = useFetchCategories(
    "http://localhost:8081/api/categories"
  );

  console.log("data in App:", categories);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<AllProducts data={data} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
