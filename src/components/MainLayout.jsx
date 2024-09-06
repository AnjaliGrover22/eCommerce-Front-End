import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateProductBtn from "./createProductBtn";
import NewProductModal from "./newProductModal";

const MainLayout = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Header categories={categories} />
      <Outlet />
      <CreateProductBtn openModal={openModal} />
      {isOpen && (
        <NewProductModal closeModal={closeModal} categories={categories} />
      )}
      <Footer categories={categories} />
    </div>
  );
};

export default MainLayout;
