
var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
require('dotenv').config()
var mongoose = require("mongoose")
var port = process.env.PORT || 5000

app.unsubscribe(bodyParser.json())
app.unsubscribe(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

const mongoURI = 'mongodb+srv://aditya1234:aditya1234@cluster0.nlxwh.mongodb.net/aditya-url-shortener-demo?retryWrites=true&w=majority'

mongoose
    .connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

var Users = require('./routes/Users')
app.use('/users', Users)
app.listen(port, () => {
    console.log("Server is Running on Port:" + port)
})