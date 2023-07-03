const userRouter = require("./userRouter")

const routes =[
    ["user",userRouter]
]

const router = (app) => {
    routes.forEach(([path,controller]) => {
        app.use(`/api/${path}`,controller)
    })
}

module.exports = router;