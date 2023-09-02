const userRouter = require("./userRouter")
const businessRouter = require("./businessRouter")
const authRouter = require("./authRouter")
const cloudinaryRouter = require('./cloudinaryRoute')
const servicesRouter = require("./servicesRouter")
const interactionRouter = require("./interactionRouter")
const accountRouter = require("./accountRouter")

const routes =[
    ['user',userRouter],
    ['business',businessRouter],
    ['auth', authRouter],
    ['account', accountRouter],
    ['cloudinary',cloudinaryRouter],
    ['services', servicesRouter],
    ['interaction', interactionRouter],
]

const router = (app) => {
    routes.forEach(([path,controller]) => {
        app.use(`/api/${path}`,controller)
    })
}

module.exports = router