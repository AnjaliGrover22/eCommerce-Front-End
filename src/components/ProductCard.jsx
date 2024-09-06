const ProductCard = ({ product }) => {
  return (
    <div className="card bg-white w-96 hover:shadow-xl border border-gray-200 hover:border-sky-500">
      <figure className="bg-white h-64 flex items-center justify-center">
        <img src={product.image} alt={product.name} />
      </figure>
      <div className="card-body bg-white rounded-b-2xl">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="py-2 px-4 bg-sky-600 text-white rounded-full">
            {product.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
