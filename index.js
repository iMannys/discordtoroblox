const Discord = require('discord.js');
const bot = new Discord.Client();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const fs = require('fs')
const web = require("./web")
const settings = require('./Config/botsettings.json')

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./Commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    var prefix = settings.prefix
    let args = message.content.split(" ");
    let cmd = args[0];
    //var args =  message.content.substring(message.content.indexOf(' ')+1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
})



bot.login(process.env.DJS_TOKEN);

console.log("Bot logged in!")