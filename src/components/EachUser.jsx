import { Link } from "react-router-dom";
import { useState } from "react";
import EditUserModal from "./EditUserModal.jsx";

const EachUser = ({ user, deleteUser, editUser }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (updatedData) => {
    // Use the passed editUser function from props
    editUser(user._id, updatedData);
    setShowModal(false); // Close the modal after submission
  };

  return (
    <>
      <tr className="odd:bg-gray-100 even:bg-white">
        <td className="px-6 py-4 text-sm text-gray-900 capitalize">
          {user.name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.address}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <Link
            to={`/orders/user/${user._id}`} // Assuming you want to navigate to a detailed page for the user
            className="inline-block px-4 py-2 text-white bg-custom-blue rounded hover:bg-blue-600"
          >
            Details
          </Link>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <button
            onClick={() => deleteUser(user._id)} // Call the deleteUser function with the user ID
            className="inline-block px-4 py-2 text-white  bg-custom-blue rounded hover:bg-blue-600"
          >
            Delete
          </button>
        </td>
        <td>
          <div
            className="w-6 h-6 bg-custom-blue rounded flex items-center justify-center ml-7 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <svg
              className="w-4 h-4" // Size of the icon inside the blue background
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.8787 2.70711C16.0503 1.53554 17.9497 1.53553 19.1213 2.70711L21.2929 4.87868C22.4645 6.05026 22.4645 7.94975 21.2929 9.12132L13.7071 16.7071C13.5196 16.8946 13.2652 17 13 17H8C7.44772 17 7 16.5523 7 16V11C7 10.7348 7.10536 10.4804 7.29289 10.2929L14.8787 2.70711ZM17.7071 4.12132C17.3166 3.7308 16.6834 3.7308 16.2929 4.12132L15.4142 5L19 8.58579L19.8787 7.70711C20.2692 7.31658 20.2692 6.68342 19.8787 6.2929L17.7071 4.12132ZM17.5858 10L14 6.41421L9 11.4142V15H12.5858L17.5858 10ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V14C20 13.4477 20.4477 13 21 13C21.5523 13 22 13.4477 22 14V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7C2 4.23858 4.23858 2 7 2H10C10.5523 2 11 2.44772 11 3C11 3.55229 10.5523 4 10 4H7Z"
                fill="white" // Icon color
              />
            </svg>
          </div>
        </td>
      </tr>
      {/* Modal for editing user */}
      {showModal && (
        <EditUserModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          user={user}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default EachUser;
