const mongoose = require('mongoose')
const shortId = require('shortid')
const schema = mongoose.Schema

const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    }

})

module.exports = User = mongoose.model('ShortUrl', shortUrlSchema)
