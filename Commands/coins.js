const Discord = require('discord.js')
const mongo = require('../Services/mongo')
const userSchema = require('../Schemas/user-schema')

module.exports.run = async (bot, message, args) => {
    await mongo.run().then(async (mongoose) => {
        try {

            const result = await userSchema.find({
                DiscordUsername: message.author.username
            })
            const WhoisEmbed = new Discord.MessageEmbed()
                .setColor("GREY")
                .setAuthor('**Whois command**', bot.user.avatarURL)
                .addField("Roblox Username: ", result.RobloxUsername)
            message.channel.send(WhoisEmbed)
        } finally {
            mongoose.connection.close()
         }
    })
}

module.exports.config = {
    cmdname: "coins",
    description: "Checks the user",
    usage: ";coins",
    permissions: "Members",
    aliases: ['bigwallet']
}