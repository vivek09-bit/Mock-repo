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
      const response = await axios.get(
        `https://mock-repo-backend.onrender.com/api/auth/profile/${username}`
      );
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
    navigate(`/tests/${testId}`);
  };

  return (
    <div className="container mt-5">
      {error && (
        <div className="alert alert-danger">
          <strong>Error!</strong> {error}
        </div>
      )}

      {user ? (
        <div className="card shadow-lg p-4 mb-5 bg-white rounded">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={user.profileImage || "https://via.placeholder.com/150"} // Use dynamic user image
                alt="Profile"
                className="rounded-circle mb-3"
                width="150"
                height="150"
              />
            </div>
            <div className="col-md-8">
              <h3>{user.name}</h3>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || "N/A"}</p>

              {/* Buttons Section */}
              <div className="d-flex">
                <button className="btn btn-danger me-3" onClick={handleLogout}>
                  Logout
                </button>
                <button className="btn btn-primary" onClick={() => handleStartTest(1)}>
                  Start Test
                </button>
              </div>

              {/* Additional test buttons (Optional) */}
              {/* <div className="mt-3">
                <button className="btn btn-warning me-3" onClick={() => handleStartTest(2)}>
                  Start JavaScript Test
                </button>
                <button className="btn btn-success" onClick={() => handleStartTest(3)}>
                  Start Algorithms Test
                </button>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
