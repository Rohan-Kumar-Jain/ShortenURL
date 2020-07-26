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



exports.reset_password = (req, res) => {

    if(req.body.resetLink){
          jwt.verify(req.body.resetLink,process.env.SECRET_KEY,function(error,decodedData)
          {
            if(error){
              return res.status(401).json({
                error : "Token expired"
              })
            }
            User.findOne({
                resetLink: req.body.resetLink
              })
              .then(user => 
                {
                if(user)
                {
    
                      var temp_password
                      bcrypt.hash(req.body.newPass, 10, (err, hash) => {
                        const obj = {
                            password : hash,
                            resetLink : ''
                          }
                
                          user = _.extend(user,obj)
                          user.save((err,result) =>{
                            if(err){
                              return res.status(400).json({error : "Password error"})
                            }
                            else{
                              
                                return res.status(200).json({message : "password changed"})                    
                            }          
                          })
                      })
    
                }
                else {
            
                    res.status(400).json({error : "User with this token not exist"})
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
    