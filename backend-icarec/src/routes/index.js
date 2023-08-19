const userRouter = require("./userRouter")
const businessRouter = require("./businessRouter")
const authRouter = require("./authRouter")
const cloudinaryRouter = require('./cloudinaryRoute')
const servicesRouter = require("./servicesRouter")

const routes =[
    ['user',userRouter],
    ['business',businessRouter],
    ['auth', authRouter],
    ['cloudinary',cloudinaryRouter],
    ['services', servicesRouter],
]

const router = (app) => {
    routes.forEach(([path,controller]) => {
        app.use(`/api/${path}`,controller)
    })
}

module.exports = router