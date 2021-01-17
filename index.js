const Discord = require('discord.js');
const bot = new Discord.Client();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const web = require("./web")
const settings = require('./Config/botsettings.json')

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    var prefix = settings.prefix
    let args = message.content.split(" ");
    let cmd = args[0];
    //var args =  message.content.substring(message.content.indexOf(' ')+1);
    
    let commandfile = bot.Commands.get(cmd.slice(prefix.length)) || bot.Commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
})



bot.login(process.env.DJS_TOKEN);

console.log("Bot logged in!")