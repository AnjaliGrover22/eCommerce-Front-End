import "./App.css";
import MainLayout from "./components/MainLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={""} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
