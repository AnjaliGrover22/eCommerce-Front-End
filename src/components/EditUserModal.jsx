import React, { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, user, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        address: user.address,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        // Use the onSubmit function passed from the parent to handle submission
        await onSubmit(formData);

        onClose(); // Close the modal after submission
      } else {
        console.error("User is missing");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-2/5">
        <h2 className="text-base font-semibold leading-6 text-cyan-500 underline underline-offset-4 mb-4">
          Edit User
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50 border border-gray-300"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50 border border-gray-300"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full py-2 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50 border border-gray-300"
                required
              />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                type="submit"
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-tr from-cyan-500 to-blue-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-tr from-cyan-500 to-blue-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
