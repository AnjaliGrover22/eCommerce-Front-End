import { Link } from "react-router-dom";
import userpic from "../assets/pictures/5994520.png";

const Header = ({ categories }) => {
  return (
    <header>
      {/* Top bar */}
      <div className="bg-gray-100 text-xs py-2 px-24 flex justify-between items-center">
        <p>Welcome to MagicShop!</p>
        <div className="text-right flex gap-6">
          <span>Deliver to Anywhere</span>
          <span>Quick Delivery</span>
          <span>Fantastic Customer Support</span>
        </div>
      </div>

      {/* Main header */}
      <div className="flex justify-between items-center py-4 px-14 bg-white shadow-md">
        <div className="text-2xl font-bold text-sky-500">
          <Link to="/">MagicShop</Link>
        </div>

        <div className=" mx-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-[500px] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50"
          />
        </div>

        <div className="flex space-x-4 items-center">
          <img src={userpic} alt="users" className="h-8" />
          <Link to="/users" className="text-cyan-500">
            Users/Orders
          </Link>
          {/* Add more icons if necessary */}
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-white border-t border-gray-200 border-b">
        <ul className="flex justify-between px-80 text-black py-4 flex-wrap">
          {categories.map((category, index) => (
            <li
              key={index}
              className="hover:text-white bg-cyan-100 px-8 py-2 rounded-full hover:bg-sky-500 focus:bg-gradient-to-r from-cyan-500 to-blue-500"
            >
              {/* Make sure the link points to the right route */}
              <Link to={`/category/${category._id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
