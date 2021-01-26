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
    RobloxUsername: reqString,
    DiscordUsername: String,
    Coins: Number,
})

module.exports = mongoose.model('users', userSchema)