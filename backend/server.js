const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors({ origin: "*" })); 

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

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

// Root Route - Fix for "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Server is running... ✅");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/test", require("./routes/testRoutes"));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
