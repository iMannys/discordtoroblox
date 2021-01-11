const Discord = require('discord.js');
const bot = new Discord.Client();


bot.login(process.env.DJS_TOKEN);
console.log("Bot logged in!")