const { Router } = require('express');
const { AdminModel, CourseModel } = require('../db/index');
const jwt = require('jsonwebtoken');
const adminMiddleware = require('../middlewares/AdminMiddleware')

const adminRouter = Router();

adminRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await AdminModel.create({
        email,
        password
    })

    res.status(201).json({
        id: admin._id,
        message: "Admin created successfully!"
    })
})

adminRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await AdminModel.findOne({
        email,
        password
    })

    if(admin) {
        const token = jwt.sign({
            id: admin._id
        }, process.env.ADMIN_JWT_PASSWORD)

        res.status(200).json({
            token
        })

    } else {
        res.status(401).json({
            info: 'Invalid credentials!'
        })
    }
})

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const { title, description, imageLink, price } = req.body;

    const course = await CourseModel.create({
        title,
        description,
        imageLink,
        price
    })

    res.status(201).json({
        message: "Course created successfylly!",
        courseId: course._id
    })
})

adminRouter.get("/course", adminMiddleware, async (req, res) => {
    const courseList = await CourseModel.find();

    res.json({
        courseList
    })
})

module.exports = {
    adminRouter
}