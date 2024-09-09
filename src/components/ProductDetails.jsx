import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import EditProductModal from "./EditProductModal";

const ProductDetails = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { products } = useOutletContext();
  const { productId } = useParams(); // Fix: invoke useParams
  const selectedProduct = products.find((product) => product._id === productId);
  //console.log(selectedProduct);
  //console.log(products);
  //console.log(productId);
  if (!selectedProduct || !products) {
    console.log("Data not available yet.");
    return <div>Loading...</div>;
  }

  // Safely map selectedProduct's category
  // Get an array of the product´s category names
  const selectedCategories = selectedProduct.category
    ? selectedProduct.category.map((cat) => cat.name)
    : []; // Fallback to empty array if category is undefined

  // Safely filter products by categories
  // Find other products with at least one of the categories of the product
  const filteredProducts = products.filter(
    (prod) =>
      prod.category && // Ensure prod.category exists before accessing it
      prod.category.some((cat) => selectedCategories.includes(cat.name))
  );

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-8 mb-24 ">
        {/* Product section */}
        <div className="flex flex-col lg:flex-row">
          {/* Product Image */}
          <div className="lg:w-1/2 flex items-center justify-center bg-white h-96">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-4">
            <h1 className="text-3xl font-bold mb-4">{selectedProduct.name}</h1>
            {/* Category List */}
            <ul className="list-disc  mb-6">
              {selectedProduct.category.map((cat) => (
                <span
                  key={cat.name}
                  className="inline-block bg-gray-100 text-green-800 px-3 py-1 rounded-full text-sm m-2 "
                >
                  {cat.name}
                </span>
              ))}
            </ul>

            <p className="text-4xl text-black mb-6">{selectedProduct.price}€</p>

            {/* <p className="text-gray-500 mb-6">{selectedProduct.description}</p>*/}

            {/* Add to Order Button */}
            <button className="w-full py-3 bg-cyan-500 text-white rounded-lg hover:bg-gradient-to-tr from-cyan-400 to-sky-500 mb-4">
              Add to Order
            </button>

            {/* Edit and Delete Buttons */}
            <div className="flex space-x-4">
              <button className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-gradient-to-tr from-purple-500 to-pink-500">
                Delete
              </button>
              <button
                className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-gradient-to-tr from-cyan-500 to-blue-500"
                onClick={openModal}
              >
                Edit
              </button>
            </div>

            {/* Accordion Section */}
            <div className="mt-8">
              <div className="border-t py-2">
                <button
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="font-bold">Description</span>
                  <span>{isDescriptionOpen ? "-" : "+"}</span>
                </button>
                {isDescriptionOpen && (
                  <p className="mt-2 text-gray-500">
                    {selectedProduct.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full -mx-3.5 p-8 mb-2">
        <h1 className="mx-24 relative text-2xl after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-1 after:bg-custom-blue after:transition-all after:duration-300 hover:after:w-full">
          You might also like
        </h1>
        <div className="flex justify-center items-center pb-40 pt-16 bg-white relative">
          <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <EditProductModal
          selectedProduct={selectedProduct}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default ProductDetails;
