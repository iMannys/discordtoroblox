const Discord = require('discord.js')
const GetBot = require('../index')

const Guilds = GetBot.guilds.cache.map(guild => guild.id)
console.log(Guilds)