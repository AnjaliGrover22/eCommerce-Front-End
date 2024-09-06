import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateProductBtn from "./createProductBtn";
import NewProductModal from "./newProductModal";
import useFetchData from "../utils/useFetchProducts";

const MainLayout = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const { data: fetchedProducts } = useFetchData(
    "http://localhost:8081/api/products"
  );

  useEffect(() => {
    console.log("Fetched Products:", fetchedProducts); // Check the fetched data
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Function to handle adding a new product
  const handleProductCreated = (response) => {
    if (response && response.product) {
      setProducts((prevProducts) => [...prevProducts, response.product]);
    }
  };

  return (
    <div>
      <Header categories={categories} />
      <Outlet context={{ products, setProducts }} />
      <CreateProductBtn openModal={openModal} />
      {isOpen && (
        <NewProductModal
          closeModal={closeModal}
          categories={categories}
          setProducts={setProducts}
          handleProductCreated={handleProductCreated}
        />
      )}
      <Footer categories={categories} />
    </div>
  );
};

export default MainLayout;
