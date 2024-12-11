require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const { adminRouter } = require('./routes/AdminRoute')
const userRouter = require('./routes/UserRoute')

const app = express();

app.use(express.json());

app.use('/admin', adminRouter)

app.use('/user', userRouter)

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server listening on port ${process.env.SERVER_PORT}`)
    });
}

main();