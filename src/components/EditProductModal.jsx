import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const EditProductModal = ({ selectedProduct, closeModal }) => {
  const { products, setProducts, cats, setCats } = useOutletContext();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: [],
    price: 0,
    image: null,
  });

  useEffect(() => {
    if (selectedProduct && selectedProduct.category) {
      console.log("Selected product categories:", selectedProduct.category);
      setForm({
        name: selectedProduct.name,
        description: selectedProduct.description,
        category: selectedProduct.category || [],
        price: selectedProduct.price,
        image: null,
      });
    } else {
      console.log("Selected product or its categories are not available yet.");
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (categoryId) => {
    console.log("Category selected:", categoryId);
    console.log("Current selected categories:", form.category);
    if (form.category.includes(categoryId)) {
      // If the category is already selected, remove it
      setForm((prev) => ({
        ...prev,
        category: prev.category.filter((cat) => cat !== categoryId),
      }));
    } else if (form.category.length < 3) {
      // Add the category if it's not selected and less than 3 are selected
      setForm((prev) => ({
        ...prev,
        category: [...prev.category, categoryId],
      }));
    } else {
      alert("You can only pick up to 3 categories!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    form.category.forEach((category, index) => {
      formData.append(`categories[${index}]`, category);
    });

    formData.append("price", form.price);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      const response = await fetch(
        `http://localhost:8081/api/products/${selectedProduct._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product uptated successfully:", data);
      const updatedProduct = data.product;

      setProducts((prev) =>
        prev.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        )
      );

      setCats((prevCats) =>
        prevCats.map((cat) => {
          if (updatedProduct.category.includes(cat._id)) {
            // Add product to categories where it's included
            return {
              ...cat,
              products: cat.products.includes(updatedProduct._id)
                ? cat.products
                : [...cat.products, updatedProduct._id],
            };
          } else {
            // Remove product from categories where it's not included
            return {
              ...cat,
              products: cat.products.filter(
                (prodId) => prodId !== updatedProduct._id
              ),
            };
          }
        })
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
    closeModal();
  };

  return (
    <div className="relative z-10">
      <div
        transition="true"
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            transition="true"
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div
                    as="h3"
                    className="text-base font-semibold leading-6 text-cyan-500 underline underline-offset-4"
                  >
                    Edit your Product
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Update your product here.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mr-3">
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder={selectedProduct.name}
                          value={form.name}
                          className=" w-full py-1 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50  "
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Description
                        </label>
                        <textarea
                          type="text"
                          name="description"
                          id="description"
                          placeholder={selectedProduct.description}
                          value={form.description}
                          className=" w-full py-1 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50  "
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={form.price}
                          placeholder={selectedProduct.price}
                          className=" py-1 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50  "
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Categories (select up to 3)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {cats.map((category) => {
                            const isSelected = form.category.includes(
                              category._id
                            );
                            const isDisabled =
                              !isSelected && form.category.length >= 3; // Disable if not selected and limit is reached

                            return (
                              <button
                                key={category._id}
                                type="button"
                                onClick={() =>
                                  handleCategorySelect(category._id)
                                }
                                disabled={isDisabled} // Disable the button if not selected and limit is reached
                                className={`px-3 py-2 rounded-lg ${
                                  isSelected
                                    ? "bg-blue-500 text-white"
                                    : "bg-cyan-100 text-black"
                                } ${
                                  isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`} // Add styles for disabled state
                              >
                                {category.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Image
                        </label>
                        <input
                          type="file"
                          className="w-full py-1 px-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-cyan-50  "
                          onChange={(e) =>
                            setForm({ ...form, image: e.target.files[0] })
                          }
                        />
                      </div>
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-gradient-to-tr from-cyan-500 to-blue-500"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={closeModal}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
