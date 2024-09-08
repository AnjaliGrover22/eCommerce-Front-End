import React from "react";

const DeleteCategoryBtn = ({ openModal }) => {
  return (
    <div className="flex justify-center mb-10">
      <button
        onClick={openModal}
        className="py-2 px-4 bg-pink-400 text-white rounded-full border border-white hover:bg-gradient-to-br from-pink-400 to-fuchsia-600 hover:text-white "
      >
        Delete Category
      </button>
    </div>
  );
};

export default DeleteCategoryBtn;
