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
const {login} = require("../controllers/login")
const {register} = require("../controllers/register")
const {authenticate} = require("../controllers/authenticate")
const {social_login} = require("../controllers/socialLogin")
const {profile} = require("../controllers/profile")
const {delete_profile} = require("../controllers/delete")
const {forgot_password} = require("../controllers/forgotPassword")
const {reset_password} = require("../controllers/resetPassword")
const {url_history} = require("../controllers/urlHistory")
const {short_url} = require("../controllers/shortenUrl")
process.env.SECRET_KEY = 'secret'
process.env.CLIENT_URL = 'https://shorten-url-1.herokuapp.com'


users.post('/register', register);

users.post('/authenticate', authenticate);

users.post('/social_login', social_login);

users.post('/login', login);

users.get('/profile', profile);

users.get('/delete', delete_profile);

users.put('/forgot-password', forgot_password);

users.put('/resetpassword', reset_password);

users.post('/urlhistory', url_history);

users.post('/shortUrls', short_url);


users.get('/:shortUrl', async(req, res) =>{
        const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
        if(shortUrl == null) 
            return res.sendStatus(404)
        res.redirect(shortUrl.full)
    })













// users.post('/register', (req, res) => {
//     const today = new Date()
//     const userData = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         password: req.body.password,
//         created: today
//     }

//     User.findOne({
//         email: req.body.email
//     })
//     .then(user => {
//         if(!user)
//         {
//             bcrypt.hash(req.body.password, 10, (err, hash) => {
//                 userData.password = hash
//                 User.create(userData)
//                 .then(user => {
//                     res.json({status: user.email + 'registered!'})
//                 })
//                 .catch(err => {
//                     res.send('error: ' + err)
//                 })
//             })
//         }
//         else{
//             res.json({error: 'User already exists'})
//         }
//     })
//     .catch(err => {
//         res.send('error: ' + err)
//     })
// })



// users.put('/forgot-password',(req,res)=>{
//     User.findOne({
//         email: req.body.email
//       })
//         .then(user => {
//             if(user)
//             {
//                 const payload = {
//               _id: user._id,
//               first_name: user.first_name,
//               last_name: user.last_name,
//               email: user.email
//             }
                
//                 const token = jwt.sign(payload, process.env.SECRET_KEY, {
//                     expiresIn: 1440
//                   });
//                 const data = {
//                   from : 'csecgroup2017@gmail.com',
//                   to : payload.email,
//                   subject : 'PASSWORD RESET LINK',
//                   html : `
//                       <h3> Click here to reset the password!</h3>
//                       <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
//                   `
//                 };
//                 return user.updateOne({resetLink: token}, function(err,success) {
//                   if(err){
//                     return res.status(400).json({error : "Error in the link"})
//                   }
//                   else{
//                     mg.messages().send(data, function(error,body){
//                       if(error){
//                         return res.json({
//                           error : error.message
//                         })
//                       }
//                       return res.status(400).json({error : "Email sent!"})
//                     })
//                   }
          
//                 })
//             }
//             else {
        
//                 res.json({ error: 'User does not exist' })
//               }
//             })
//             .catch(err => {
//               res.send('error: ' + err)
//             })
//         })



module.exports = users