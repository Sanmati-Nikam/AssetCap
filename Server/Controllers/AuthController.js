const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 

module.exports.Signup = async (req, res, next) => {
    try {
        const { email, password, username, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = await User.create({ email, password, username, createdAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res
            .status(201)
            .json({ message: "User signed in successfully", success: true, user });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Signout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true
    });
    res.status(200).json({message: "User signed out successfully"});
}

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate Input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Check if User Exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" }); // Don't specify which is wrong (security)
        }

        // 3. Compare Passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 4. Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 5. Set Secure HTTP-Only Cookie
        res.cookie('token', token, {
            httpOnly: true,      // Prevent XSS attacks
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict',  // CSRF protection
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
        });

        // 6. Send Success Response (without sensitive data)
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { email: user.email, username: user.username }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};