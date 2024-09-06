import { Link } from "react-router-dom";

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
          <div className="py-2 px-4 bg-sky-600 text-white rounded-full">
            {product.price}
          </div>
          <button className="py-2 px-4 bg-white text-sky-600 rounded-full border border-sky-500 hover:bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white">
            <Link to={`/product/${product._id}`}>Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
