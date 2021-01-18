const discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const connection = await message.member.voice.channel.leave();
}

module.exports.config = {
    cmdname: "leave",
    description: "Leaves the voice channel you are in",
    usage: ";leave",
    permissions: "Members",
    aliases: ['leavee']
}