import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateProductBtn from "./createProductBtn";
import NewProductModal from "./newProductModal";
import useFetchData from "../utils/useFetchProducts";
import useFetchCategories from "../utils/useFetchCategories";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);

  const { data: fetchedProducts } = useFetchData(
    "http://localhost:8081/api/products"
  );

  const { categories: fetchedCats } = useFetchCategories(
    "http://localhost:8081/api/categories"
  );

  console.log("Fetch Categories:", fetchedCats);

  useEffect(() => {
    //console.log("Fetched Products:", fetchedProducts); // Check the fetched data
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  useEffect(() => {
    console.log("Fetched Categories:", fetchedCats); // Log fetchedCats
    if (fetchedCats) {
      setCats(fetchedCats);
    }
  }, [fetchedCats]);

  console.log("Cats in MainLayout:", cats); // Log cats before passing to Header

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
      <Header categories={cats} />
      <Outlet context={{ products, setProducts, cats, setCats }} />
      <CreateProductBtn openModal={openModal} />
      {isOpen && (
        <NewProductModal
          closeModal={closeModal}
          categories={cats}
          setProducts={setProducts}
          handleProductCreated={handleProductCreated}
        />
      )}
      <Footer categories={cats} />
    </div>
  );
};

export default MainLayout;
