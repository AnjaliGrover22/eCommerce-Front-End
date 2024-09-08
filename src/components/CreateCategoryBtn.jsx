import React from "react";

const CreateProductBtn = ({ openModal }) => {
  return (
    <button
      onClick={openModal}
      className="py-2 px-4 bg-sky-600 text-white rounded-full border border-white hover:bg-gradient-to-br from-cyan-500 to-blue-500 hover:text-white fixed bottom-12 left-12"
    >
      Create Category
    </button>
  );
};

export default CreateProductBtn;
