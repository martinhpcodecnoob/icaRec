const userRouter = require("./userRouter")
const businessRouter = require("./businessRouter")
const authRouter = require("./authRouter")
const servicesRouter = require("./servicesRouter")
const cloudinaryRouter = require('./cloudinaryRoute')


const routes =[
    ['user',userRouter],
    ['business',businessRouter],
    ['auth', authRouter],
    ['services', servicesRouter],
    ['cloudinary',cloudinaryRouter]
]

const router = (app) => {
    routes.forEach(([path,controller]) => {
        app.use(`/api/${path}`,controller)
    })
}

module.exports = router