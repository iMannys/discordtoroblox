const discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const connection = await message.member.voice.channel.join();
}

module.exports.config = {
    cmdname: "join",
    description: "Joins the voice channel you are in",
    usage: ";join",
    permissions: "Members",
    aliases: ['joinn']
}