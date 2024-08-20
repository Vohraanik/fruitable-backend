const jwt = require('jsonwebtoken');
const Users = require('../model/users.model');

const auth = (roles = []) => async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                message: "You are not authorized to access this resource"
            })
        }

        try {
            const validateToken = await jwt.verify(token, process.env.ACCESSTOKEN);

            const user = await Users.findById(validateToken._id);
            console.log(user, roles);

            if (!roles.some((v) => v === user.role)) {
                return res.status(401).json({
                    success: false,
                    message: "You are not access"
                })
            }

            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access this resource" + error.message
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

module.exports = auth;