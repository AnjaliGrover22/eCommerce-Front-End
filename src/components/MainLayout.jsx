import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ categories }) => {
  return (
    <div>
      <Header categories={categories} />
      <Outlet />
      <Footer categories={categories} />
    </div>
  );
};

export default MainLayout;
