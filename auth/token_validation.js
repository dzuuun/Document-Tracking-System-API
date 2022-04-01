const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if (token) {
            token = token.slice(7);
            verify(token, "my-32-character-ultra-secure-and-ultra-long-secret", (err, decoded) => {
                if (err) {
                 res.json({
                     success: 0,
                     message: "invalid token"
                 });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied. "
            });
        }
    }
};