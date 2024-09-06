import React from "react";

const createProductBtn = () => {
  return (
    <div className="absolute">
      <button className="py-2 px-4 bg-white text-sky-600 rounded-full border border-sky-500 hover:bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white">
        Create Product
      </button>
    </div>
  );
};

export default createProductBtn;
