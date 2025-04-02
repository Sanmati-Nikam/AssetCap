require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT isn't in .env
const authRoute = require("./Routes/AuthRoute");

const { MONGO_URL } = process.env;

const app = express();

// Enable CORS
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

mongoose.set("debug", true);

mongoose.connect(MONGO_URL, {})
    .then(() => console.log("✅ MongoDB is connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/", authRoute);

app.get("/check", (req, res) => {
    res.send("Server is working");
});

app.listen(PORT, () => {
    console.log(`✅ Server is listening at port ${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});