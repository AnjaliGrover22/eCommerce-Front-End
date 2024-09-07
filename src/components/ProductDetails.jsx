import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const ProductDetails = () => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const { products } = useOutletContext();
  const { productId } = useParams(); // Fix: invoke useParams
  const selectedProduct = products.find((product) => product._id === productId);
  console.log(selectedProduct);
  console.log(products);
  console.log(productId);

  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
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
            <button className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-gradient-to-tr from-cyan-500 to-blue-500">
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
  );
};

export default ProductDetails;
