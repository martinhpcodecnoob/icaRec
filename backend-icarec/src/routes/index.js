const userRouter = require("./userRouter")
const businessRouter = require("./businessRouter")

const routes =[
    ["user",userRouter],
    ["business",businessRouter]
]

const router = (app) => {
    routes.forEach(([path,controller]) => {
        app.use(`/api/${path}`,controller)
    })
}

module.exports = router;