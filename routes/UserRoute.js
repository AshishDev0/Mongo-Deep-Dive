const { Router } = require('express');
const { UserModel, CourseModel } = require('../db/index');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middlewares/UserMiddleware');

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.create({
        email,
        password
    })

    res.status(201).json({
        details: 'User created successfully!',
        id: user._id
    })
})

userRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email,
        password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, process.env.USER_JWT_PASSWORD)

        res.status(200).json({
            token
        })
    } else {
        res.status(401).json({
            info: "Invalid Credentials!"
        })
    }

})

userRouter.get("/course", async (req, res) => {
    const courseList = await CourseModel.find();

    res.json({
        courseList
    })
})

userRouter.post("/course/:courseId", userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;

    await UserModel.updateOne({
        email: req.body.email
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })

    res.json({
        message: "Purchase successful!"
    })
})

userRouter.get("/purchasedCourses", userMiddleware, async (req, res, next) => {
    const user = await UserModel.findOne({
        email: req.body.email
    })

    const courses = await CourseModel.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        purchasedCourses: courses
    })
})

module.exports = userRouter;