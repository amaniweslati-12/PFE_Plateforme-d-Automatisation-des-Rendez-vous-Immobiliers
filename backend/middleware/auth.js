const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authentication failed: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Include role in req.userData
        req.userData = {
            userId: decodedToken.userId,
            email: decodedToken.email,
            role: decodedToken.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};

// Role-based access control middleware
module.exports.checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.userData || !roles.includes(req.userData.role)) {
            return res.status(403).json({
                message: `Forbidden: Access restricted to ${roles.join(' or ')}`
            });
        }
        next();
    };
};
