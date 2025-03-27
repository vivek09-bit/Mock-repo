const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// ✅ Initialize Express App First
const app = express(); 

// ✅ Enable CORS for Frontend
app.use(cors({
  origin: ["https://mock-repo-frontend.onrender.com"], // Allow frontend requests
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());  // Parse JSON requests

// ✅ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "your_fallback_mongo_uri_here";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/testRoutes", require("./routes/testRoutes"));

// ✅ Test Route to Check Server Status
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
