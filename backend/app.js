const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to db
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Test route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Set up port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
