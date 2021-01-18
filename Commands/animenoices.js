const discord = require('discord.js')
const ytdl = require('ytdl-core')

module.exports.run = async (bot, message, args) => {
    if (message.member.roles.cache.some(role => role.name === 'Peter-Programmør') || message.member.roles.cache.some(role => role.name === 'Ejer')){
        if (message.member.voice.channel) {
            const stream = await ytdl("https://www.youtube.com/watch?v=-xDkpnAMAa4", {
                opusEncoded: true,
                filter: 'audioonly',
            });
            const connection = await message.member.voice.channel.join();
            const play = connection.play(stream, {volume: 1});
            play.on('finish', end => {
                message.member.voice.channel.leave();
            })
        } else {
            message.reply("You need to be in a voice channel!")
        }
    }
}

module.exports.config = {
    cmdname: "animenoices",
    description: "Plays anime noices",
    usage: ";animenoices",
    permissions: "Members",
    aliases: ['troll']
}