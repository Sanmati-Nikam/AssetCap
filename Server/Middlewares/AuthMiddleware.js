const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await User.findById(data.id);
            console.log("here")
            if (user) return res.json({ status: true, user: user.username });
            else return res.json({ status: false });
        }
    });
};