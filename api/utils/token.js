const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    // Get the token from the Authorization header
    const token = req.headers['authorization'];

    if (token){
        jwt.verify(token, process.env.JWT_KEY, (err) => {
            if (err) {
                // Forbidden
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        // Unauthorized
        res.sendStatus(401);
    }
};