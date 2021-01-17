const Discord = require('discord.js');
const bot = new Discord.Client();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const web = require("./web")



bot.login(process.env.DJS_TOKEN);

console.log("Bot logged in!")