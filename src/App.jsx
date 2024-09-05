import "./App.css";
import { useState } from "react";
import UserInfo from "./components/UserInfo";
import MainLayout from "./components/MainLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]); //State to hold the fetched users

  //Function to handle the data fetched by UserInfo
  const handleUserFetch = (data) => {
    setUsers(data);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<UserInfo onUserFetch={handleUserFetch} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
