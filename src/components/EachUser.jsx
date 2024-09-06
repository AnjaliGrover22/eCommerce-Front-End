const EachUser = ({ user }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      {user ? (
        <>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <h3>{user.address}</h3>
          <button>Orders</button>
        </>
      ) : (
        <p>No users fetched yet</p>
      )}
    </div>
  );
};

export default EachUser;
