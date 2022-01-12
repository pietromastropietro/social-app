const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    // Get the auth header value
    const authHeader = req.headers['authorization'];

    // Check if header is undefined
    if (authHeader){
        // Split at the space and get token from array
        // const token = authHeader.split(' ')[1];

        // temp for testing
        const token = authHeader;

        jwt.verify(token, process.env.JWT_KEY, (err) => {
            if (err) {
                console.log(err.message);
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


// module.exports = function verifyToken(req, res, next) {
    
//     // Get the auth header value
//     const authHeader = req.headers['authorization'];

//     // Check if bearer is undefined
//     if (authHeader){
//         // Split at the space and get token from array
//         const bearer = authHeader.split(' ')[1];

//         // Set the token
//         req.token = bearerToken;

//         next();
//     } else {
//         // Forbidden
//         res.sendStatus(403);
//     }
// };