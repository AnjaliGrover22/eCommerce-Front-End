import { useEffect, useState } from "react";
import EachUser from "./EachUser";

const UserInfo = ({ onUserFetch }) => {
  const [userData, setUserData] = useState([]);

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

  return (
    <div>
      {userData.length > 0 ? (
        userData.map((user) => <EachUser key={user._id} user={user} />) // Use _id as key
      ) : (
        <p>No User available</p>
      )}
    </div>
  );
};

export default UserInfo;
