import ProductCard from "./ProductCard";

const AllProducts = ({ data }) => {
  //console.log("Data received in Products:", data);
  return (
    <div className="flex justify-center items-center pb-40 pt-16 bg-white">
      <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
