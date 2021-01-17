const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const reqNumber = {
    type: Number,
    required: true,
}

const userSchema = mongoose.Schema({
    Username: reqString,
    Coins: reqNumber,
})

module.exports = mongoose.model('users', userSchema)