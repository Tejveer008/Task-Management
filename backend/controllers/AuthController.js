const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

// Signup
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;  // Include role in the request body
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: 'User already exists, please login',
                success: false
            });
        }

        // Hash password and save user with the role
        const userModel = new UserModel({ name, email, password, role });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({
            message: 'Signup successful',
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed, email or password is incorrect';

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        // Create JWT token with role
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role },  // Include role in the JWT payload
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email,
            name: user.name,
            role: user.role  // Send role to the frontend
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
