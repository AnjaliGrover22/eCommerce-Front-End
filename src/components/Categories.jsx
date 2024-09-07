import React from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

const Categories = ({ categories }) => {
  //console.log(categories);
  const { categoryId } = useParams();
  const selectedCategory = categories.find((cat) => cat._id === categoryId);
  //console.log("selected category:", selectedCategory);
  if (!selectedCategory) {
    return <p>Category not found</p>;
  }
  return (
    <>
      <h2 className="text-2xl f text-gray-500 pt-6 pl-16 bg-white ">
        {selectedCategory.name}
      </h2>
      <div className="flex justify-center items-center pb-40 pt-16 bg-white">
        <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {selectedCategory.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
