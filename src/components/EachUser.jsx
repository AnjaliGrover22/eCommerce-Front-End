import { Link } from "react-router-dom";

const EachUser = ({ user, deleteUser }) => {
  return (
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
      {/* Button to trigger delete functionality */}
      <td className="px-6 py-4 text-sm text-gray-900">
        <button
          onClick={() => deleteUser(user._id)} // Call the deleteUser function with the user ID
          className="inline-block px-4 py-2 text-white  bg-custom-blue rounded hover:bg-blue-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EachUser;
