require('dotenv').config()
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('morgan')

const router = require('./src/routes/index')

const {DB_URL} = process.env

const app = express()
/* mongoose
    .connect(`${DB_URL}`)
    .then((res) => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })
 */
const dbConnectionPromise = mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

dbConnectionPromise
  .then(() => {
    console.log("Connected to DB")
  })
  .catch((err) => {
    console.log(err)
  })

app.use(
    cors({
        origin:["http://localhost:3004", process.env.FRONT_URL],
        credentials:true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Allow-Headers",
            "Access-Control-Request-Headers",
            "Access-Control-Allow-Origin",
        ],
    })
)

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
router(app)

app.use((req,res) => {
    res.status(404).send({
        ok:false,
        url: req.originalUrl + " not found"
    });
})

module.exports = { app, dbConnectionPromise }