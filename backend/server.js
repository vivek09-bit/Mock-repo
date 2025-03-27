const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors({
  origin: ["https://mock-repo-frontend.onrender.com"], // Allow frontend requests
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


const app = express();  // ✅ Initialize app FIRST

app.use(cors({ origin: "*" }));  // ✅ Enable CORS
app.use(express.json());  // ✅ Middleware to parse JSON

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/testRoutes", require("./routes/testRoutes"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
