const { request } = require("express");

const Discord = require("discord.js")

module.exports.run = async (str) => {
    var method = /\d+/g
    var res = parseInt(str.match(method))
    console.log(res)
}