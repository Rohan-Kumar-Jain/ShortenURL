const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const _ = require("lodash")
require('dotenv').config()
const nodemailer = require('nodemailer');
var api_key = 'b1df829f898334ff43ff5d5812a9e15a-ffefc4e4-b1b88ab7'
const mailgun = require("mailgun-js")
const DOMAIN = 'sandbox5dca1e6a485b4b6f9a8282de540bd818.mailgun.org'
const mg = mailgun({apiKey: api_key, domain: DOMAIN})
const { result } = require("lodash")
const User = require("../models/User")
const ShortUrl = require('../models/shortUrl')
users.use(cors())
const mongoose = require('mongoose')
process.env.SECRET_KEY = 'secret'
process.env.CLIENT_URL = 'https://shorten-url-1.herokuapp.com'



exports.register = (req, res) => {
    const today = new Date()
    const payload = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user)
        {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                payload.password = hash
            })
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: '5m'
              });

            let mailTransporter = nodemailer.createTransport({ 
                service: 'gmail', 
                auth: { 
                    user: 'compscncec@gmail.com', 
                    pass: '4321csec4321'
                } 
            });
            const data = {
              from : 'csecgroup2017@gmail.com',
              to : payload.email,
              subject : 'PASSWORD RESET LINK',
              html : `
                  <h3> Click here to Activate Your Account</h3>
                  <link><p>${process.env.CLIENT_URL}/users/authenticate/${token}</p></link>
              `
            };
            mailTransporter.sendMail(data, function(error, data) { 
                if(error){
                    return res.json({
                      error : error.message
                    })
                  }
                  return res.status(400).json({error : "Authentication mail has been sent successfully!"})
                })
        }
        else{
            res.json({error: 'User already exists'})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
}