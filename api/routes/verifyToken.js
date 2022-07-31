const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json({
            "error": {
                "errors": [
                    {
                        "domain": "global",
                        "reason": "required",
                        "message": "Login Required",
                        "locationType": "header",
                        "location": "Authorization"
                    }
                ],
                "code": 401,
                "message": "Login Required"
            }
        });
    } else {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWTKEY, (error, user) => {
            if (error) {
                res.status(403).json("Token is incorrect!")
            } else {
                req.user = user;
                next();
            }
        })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({
                "error": {
                    "errors": [
                        {
                            "domain": "global",
                            "reason": "required",
                            "message": "Login Required",
                            "locationType": "header",
                            "location": "Authorization"
                        }
                    ],
                    "code": 401,
                    "message": "Login Required"
                }
            });
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization };