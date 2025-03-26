const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express(); // ✅ Initialize app first

// Middleware
app.use(cors({ origin: "*" })); // ✅ Moved after app initialization
app.use(express.json());

// Debugging: Check MongoDB URI
console.log("MongoDB URI:", process.env.MONGO_URI);
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in environment variables");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/test", require("./routes/testRoutes"));

// Root route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
