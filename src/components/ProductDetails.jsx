import React from "react";
import { useOutletContext, useParams } from "react-router-dom";

const ProductDetails = () => {
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
    <div>
      <h2>{selectedProduct.name}</h2>
      <img src={selectedProduct.image} alt={selectedProduct.name} />
      <ul>
        {selectedProduct.category.map((cat) => (
          <li key={cat.name}>{cat.name}</li> // Added a unique key for each list item
        ))}
      </ul>
      <button>Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default ProductDetails;
