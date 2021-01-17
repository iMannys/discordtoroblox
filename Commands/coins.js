const Discord = require('discord.js')
const mongo = require('../Services/mongo')
const userSchema = require('../Schemas/user-schema')

module.exports.run = async (bot, message, args) => {
    await mongo.run().then(async (mongoose) => {
        try {

            const result = await userSchema.find({
                DiscordUsername: message.author.username
            })
            const CoinsEmbed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setAuthor('Coins command', bot.user.avatarURL)
                .addField("Roblox Username: ", result.RobloxUsername)
            message.channel.send(CoinsEmbed)
            message.channel.send(bot.user.avatarURL)
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