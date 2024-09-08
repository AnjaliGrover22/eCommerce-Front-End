import { useEffect, useState } from "react";
import EachUser from "./EachUser";
import EditUserModal from "./EditUserModal";

const UserInfo = ({ onUserFetch }) => {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/users");
      const result = await response.json();
      console.log("userdata", result); // Check this log
      if (result && result.users) {
        setUserData(result.users); // Set the users array from the result
        onUserFetch(result.users); // Pass the users array to App.jsx
      } else {
        console.error("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const deleteUser = async (userId) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete the user with ID: ${userId}?`
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `http://localhost:8081/api/users/${userId}`, // Specific user deletion
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("User deleted successfully!");
        fetchUserData(); // Re-fetch all users to update the UI
      } else {
        console.error("Failed to delete User:", response.statusText);
        alert("Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // edit specific user
  const editUser = async (userId, updatedUserData) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUserData),
        }
      );
      if (response.ok) {
        alert("User edited successfully!");
        fetchUserData(); // Re-fetch all users to update the UI
      } else {
        console.error("Failed to edit User:", response.statusText);
        alert("Failed to edit User");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-500 divide-y divide-gray-300">
        <thead style={{ backgroundColor: "#00AAF4" }} className="text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-500">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-500">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-500">
              Orders
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-500">
              Remove
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-b border-gray-500">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-300">
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <EachUser
                key={user._id}
                user={user}
                index={index}
                deleteUser={deleteUser}
                editUser={editUser} // Pass editUser as a prop
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-4 text-sm text-center text-gray-900 border-b border-gray-300"
              >
                No users fetched yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
