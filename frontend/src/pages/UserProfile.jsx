// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UserProfile = () => {
//   const { username } = useParams();
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedUser && storedUser.username === username) {
//       setUser(storedUser);
//     } else {
//       fetchUserProfile();
//     }
//   }, [username]);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/auth/profile/${username}`);
//       setUser(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "User not found");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h2>{user.name}'s Profile</h2>
//           <p><strong>Username:</strong> {user.username}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phone}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <p>Loading...</p>

//       )}
//     </div>
//   );
// };

// export default UserProfile;














// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UserProfile = () => {
//   const { username } = useParams();
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedUser && storedUser.username === username) {
//       setUser(storedUser);
//     } else {
//       fetchUserProfile();
//     }
//   }, [username]);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/auth/profile/${username}`);
//       setUser(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "User not found");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handleStartTest = () => {
//     navigate(`/quiz/${username}`);
//   };

//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       {user ? (
//         <div>
//           <h2>{user.name}'s Profile</h2>
//           <p><strong>Username:</strong> {user.username}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Phone:</strong> {user.phone}</p>
//           <button onClick={handleLogout}>Logout</button>
//           <button onClick={handleStartTest}>Start Test</button>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserProfile;









import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.username === username) {
      setUser(storedUser);
    } else {
      fetchUserProfile();
    }
  }, [username]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/profile/${username}`);
      setUser(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "User not found");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleStartTest = (testId) => {
    navigate(`/quiz/${testId}`); // Redirect to quiz page with testId
  };
  

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button onClick={handleLogout}>Logout</button>
          <div>
             <button onClick={() => handleStartTest(1)}>Start Test</button>

            {/* <button onClick={() => handleStartTest(2)}>Start JavaScript Test</button>
            <button onClick={() => handleStartTest(3)}>Start Algorithms Test</button> */} 

          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
