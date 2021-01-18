const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (args[1]){
        if (args[2]){
            const user = bot.users.cache.get(args[1]) || message.mentions.users.first()
            user.send(args.slice(2).join(" "))
            message.channel.send("They have recieved the DM!")
        } else {
            message.channel.send("Please provide a message!")
        }
    } else {
        message.channel.send("Please provide a users id!")
    }
}

module.exports.config = {
    cmdname: "dm",
    description: "DM's the user",
    usage: ";dm",
    permissions: "Member",
    aliases: ['silencewench']
}