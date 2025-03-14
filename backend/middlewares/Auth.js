const jwt = require('jsonwebtoken');

// Role-based access middleware
const ensureAuthenticated = (roles = []) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401) // Unauthorized
            .json({ message: 'Unauthorized, JWT token is required' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
    if (!token) {
        return res.status(401)
            .json({ message: 'Unauthorized, Bearer token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token data to request object

        // Check if user has required role(s)
        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied, insufficient permissions',
            });
        }

        next();
    } catch (err) {
        console.error('JWT verification failed:', err);
        return res.status(401)
            .json({ message: 'Unauthorized, JWT token is invalid or expired' });
    }
};

module.exports = ensureAuthenticated;
