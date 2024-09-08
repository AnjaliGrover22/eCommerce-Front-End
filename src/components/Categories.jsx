import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import DeleteCategoryBtn from "./DeleteCategoryBtn";
import DeleteCatModal from "./DeleteCatModal";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cats } = useOutletContext();
  //console.log(categories);
  const { categoryId } = useParams();
  const selectedCategory = cats.find((cat) => cat._id === categoryId);
  //console.log("selected category:", selectedCategory);
  if (!selectedCategory) {
    return (
      <div className="flex flex-col items-center py-20">
        <p className="my-2 text-lg">Category not found</p>
        <p className="">Back to Homepage</p>
        <button className="py-2 px-8 bg-pink-600 text-white rounded-full border border-white hover:bg-gradient-to-br from-pink-500 to-fuchsia-500 hover:text-white ">
          <Link to="/">Homepage</Link>
        </button>
      </div>
    );
  }

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <h2 className="text-2xl f text-gray-500 pt-6 pl-16 bg-white ">
        {selectedCategory.name}
      </h2>
      {selectedCategory.products.length === 0 ? (
        <div className="flex justify-center items-center pb-40 pt-16 bg-white">
          <p>There are no products in this category</p>
        </div>
      ) : (
        <div className="flex justify-center items-center pb-40 pt-16 bg-white">
          <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {selectedCategory.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
      <DeleteCategoryBtn openModal={openModal} />
      {isOpen && <DeleteCatModal closeModal={closeModal} />}
    </>
  );
};

export default Categories;
