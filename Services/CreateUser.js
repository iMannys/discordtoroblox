const mongo = require("./mongo")
const userSchema = require('../Schemas/user-schema')

module.exports.run = async (res, data, info) => {
    await mongo.run().then(async (mongoose) => {
        try {
            if(info){
                await userSchema.findOneAndUpdate(
                {
                    RobloxUsername: info.RobloxUsername,
                    DiscordUsername: info.Discordusername,
                    Coins: info.Coins,
                },
                {
                    RobloxUsername: info.RobloxUsername,
                    DiscordUsername: info.DiscordUsername,
                    Coins: info.Coins
                }
                )
            }else{
                await userSchema.findOneAndUpdate(
                {
                    RobloxUsername: data.Username,
                    Coins: data.Coins,
                }, 
                {
                    RobloxUsername: data.Username,
                    Coins: data.Coins,
                },
                {
                    upsert: true,
                    new: true,
                }
                )
            }
        } finally {
            mongoose.connection.close()
        }
    })
}