const { request } = require('express')
const mongoose = require('mongoose')
const settings = require('../settings.json')
const mongoPass = settings.MONGO_PASS
const mongoUser = settings.MONGO_USER
const DBname = settings.MONGO_DBName

const mongopath = `mongodb+srv://${mongoUser}:${mongoPass}@discordtoroblox.in2nf.mongodb.net/${DBname}?retryWrites=true&w=majority`

module.exports.run = async (str) => {
    await mongoose.connect(mongopath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}