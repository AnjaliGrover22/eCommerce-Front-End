import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Company Info Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">MagicShop</h3>
          <p className="mb-2">WhatsApp: +1 202-918-2132</p>
          <p className="mb-4">Call Us: +1 202-918-2132</p>
        </div>

        {/* Popular Categories Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Most Popular Categories</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Electronics
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Home Appliances
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Toys
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Decor
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Clothing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Accessoires
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Make-Up
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Services Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">Customer Services</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                E-waste Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cancellation & Return Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center py-6 mt-10 border-t border-gray-300">
        <p>&copy; 2022 All rights reserved. Reliance Retail Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
