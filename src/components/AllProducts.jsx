import { useOutletContext } from "react-router-dom";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  //console.log("Data received in Products:", data);
  const { products } = useOutletContext();

  return (
    <div className="flex justify-center items-center pb-40 pt-16 bg-white relative">
      <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
