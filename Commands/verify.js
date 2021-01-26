const discord = require("discord.js")
const https = require("https")
const mongo = require('../Services/mongo')
const userSchema = require('../Schemas/user-schema')

module.exports.run = async (bot, message, args) => {
    await mongo.run().then(async (mongoose) => {
        try {
            const IDD = message.author.id
        
            var options = {
                host: 'verify.eryn.io',
                path: `/api/user/${IDD}`,
                headers: "",
                port: '443'
            };


            https.get(options, function (res) {
                var json = '';

                res.on('data', function (chunk) {
                    json += chunk;
                });

                res.on('end', async function () {
                    if (res.statusCode === 200) {
                        try {
                            var data = JSON.parse(json);
                            if (data.status === 'ok') {
                                var Roverusername = data.robloxUsername
                                var NotABot = message.guild.roles.cache.find(role => role.name === 'Verified')
                                message.member.roles.add(NotABot)
                                message.member.setNickname(Roverusername)
                                await userSchema.findOneAndUpdate(
                                    {
                                        RobloxUsername: data.robloxUsername,
                                        DiscordUsername: message.member.user.username,
                                        Coins: data.Coins,
                                    }, 
                                    {
                                        RobloxUsername: data.robloxUsername,
                                        DiscordUsername: message.member.user.username,
                                        Coins: data.Coins,
                                    },
                                    {
                                        upsert: true,
                                        new: true,
                                    }
                                    )
                                message.channel.send("You have been successfully verified!")
                            } else{
                                message.reply('You are not verified. Verify using the link and run the command again. **LINK:** https://verify.eryn.io')
                            }
                        } catch (e) {
                            console.log('Error parsing JSON')
                        }
                    } else {
                        console.log('Status', res.statusCode);
                    }
                })
            }).on('error', function (err) {
                console.log('Error:', err);
            });
        } finally {
            mongoose.connection.close()
         }
    })
}

module.exports.config = {
    cmdname: "verify",
    description: "Runs the verify command",
    usage: ";verify",
    permissions: "Members",
    aliases: ['Verify']
}