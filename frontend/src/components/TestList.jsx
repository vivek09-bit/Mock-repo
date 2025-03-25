import React, { useEffect, useState } from "react";
import axios from "axios";
import StartTestButton from "./StartTestButton";

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://https://mock-repo-backend.onrender.com:5000/api/test") // Make sure this matches your backend route
      .then((response) => {
        setTests(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load tests. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tests...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Available Tests</h2>
      <ul>
        {tests.map((test) => (
          <li key={test._id}>
            <strong>{test.name}</strong> - {test.description}
            <StartTestButton testId={test._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;
