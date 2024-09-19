import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateProductBtn from "./createProductBtn";
import NewProductModal from "./NewProductModal";
import useFetchData from "../utils/useFetchProducts";
import useFetchCategories from "../utils/useFetchCategories";
import CreateCategoryBtn from "./CreateCategoryBtn";
import NewCategoryModal from "./NewCategoryModal";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);

  const { data: fetchedProducts } = useFetchData(
    "https://ecommerce-api-k4pz.onrender.com/api/products"
  );

  const { categories: fetchedCats } = useFetchCategories(
    "https://ecommerce-api-k4pz.onrender.com/api/categories"
  );

  //console.log("Fetch Categories:", fetchedCats);

  useEffect(() => {
    //console.log("Fetched Products:", fetchedProducts); // Check the fetched data
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]);

  useEffect(() => {
    // console.log("Fetched Categories:", fetchedCats); // Log fetchedCats
    if (fetchedCats) {
      setCats(fetchedCats);
    }
  }, [fetchedCats]);

  //console.log("Cats in MainLayout:", cats); // Log cats before passing to Header

  //toggle new product modal
  const openProductModal = () => {
    setIsOpen(true);
  };

  const closeProductModal = () => {
    setIsOpen(false);
  };

  //toggle new category modal
  const openCategoryModal = () => {
    setIsCategoryOpen(true);
    //  console.log("Its true");
  };

  const closeCategoryModal = () => {
    setIsCategoryOpen(false);
  };

  // Function to handle adding a new product
  const handleProductCreated = (response) => {
    if (response && response.product) {
      setProducts((prevProducts) => [...prevProducts, response.product]);
      const updateCats = cats.map((category) => {
        if (response.product.category.includes(category._id)) {
          return {
            ...category,
            products: [...category.products, response.product],
          };
        }
        return category; //return category unchanged if its doesnt match with any of the categories of the new product
      });
      setCats(updateCats);
    }
  };

  return (
    <div>
      <Header categories={cats} />
      <Outlet context={{ products, setProducts, cats, setCats }} />
      <CreateProductBtn openModal={openProductModal} />
      {isOpen && (
        <NewProductModal
          closeModal={closeProductModal}
          categories={cats}
          setProducts={setProducts}
          handleProductCreated={handleProductCreated}
        />
      )}
      <CreateCategoryBtn openModal={openCategoryModal} />
      {isCategoryOpen && (
        <NewCategoryModal
          closeModal={closeCategoryModal}
          cats={cats}
          setCats={setCats}
        />
      )}
      <Footer categories={cats} />
    </div>
  );
};

export default MainLayout;
