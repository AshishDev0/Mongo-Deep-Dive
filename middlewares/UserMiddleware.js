const jwt = require('jsonwebtoken');
const { UserModel } = require('../db/index');

async function userMiddleware(req, res, next) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, process.env.USER_JWT_PASSWORD);

    const user = await UserModel.findById(decodedData.id);

    if (decodedData) {
        req.body.email = user.email
        next();
    } else {
        res.status(401).json({
            message: 'Invalid token!'
        })
    }
}

module.exports = userMiddleware;