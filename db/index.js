const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String
})

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
})

const UserModel = mongoose.model('User', UserSchema);
const AdminModel = mongoose.model('Admin', AdminSchema);
const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel
}