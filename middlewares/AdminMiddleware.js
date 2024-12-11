const jwt = require('jsonwebtoken');
const { AdminModel } = require('../db/index');

async function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, process.env.ADMIN_JWT_PASSWORD);

    const admin = await AdminModel.findById(decodedData.id);

    if (decodedData) {
        req.body.email = admin.email
        next();
    } else {
        res.status(401).json({
            message: 'Invalid token!'
        })
    }
}

module.exports = adminMiddleware;