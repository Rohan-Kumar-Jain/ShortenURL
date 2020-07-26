const mongoose = require("mongoose")
const schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    first_name : {
        type : String
    },
    last_name : {
        type : String
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    resetLink:{
        type: String,
        default: ''
    }

})

module.exports = User = mongoose.model('users', UserSchema)