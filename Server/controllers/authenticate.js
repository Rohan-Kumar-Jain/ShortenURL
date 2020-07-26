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

exports.authenticate = (req, res) => {

    if(req.body.token){
          jwt.verify(req.body.token,process.env.SECRET_KEY,function(error,decodedData)
          {
            if(error){
              return res.status(401).json({
                error : "Incorrect or Expired Link"
              })
            }
            const {first_name, last_name, email, password, created}=decodedData;
            const temp_email = email
            User.findOne({
               email : temp_email
              })
              .then(user => 
                {
                if(!user)
                {
                    const userData = {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: password,
                        created: created
                    }
                    bcrypt.hash(password, 10, (err, hash) => {
                        userData.password = hash
                        User.create(userData)
                       .then(user => {
                            res.json({status: user.email + ' registered!'})
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                    })
    
                }
                else {
            
                    res.status(400).json({error : "User Already Exist"})
                  }
                })
                .catch(err => {
                    res.send('error: ' + err)
                  })
            })
    
        }
        else{
            return res.status(401).json({error : "Authentication Error"})
        }
      
}