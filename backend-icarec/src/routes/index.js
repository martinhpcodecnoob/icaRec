const userRouter = require("./userRouter")
const businessRouter = require("./businessRouter")
const authRouter = require("./authRouter")
const servicesRouter = require("./servicesRouter")

const routes =[
    ['user',userRouter],
    ['business',businessRouter],
    ['auth', authRouter],
    ['services', servicesRouter],
]

const router = (app) => {
    routes.forEach(([path,controller]) => {
        app.use(`/api/${path}`,controller)
    })
}

module.exports = router