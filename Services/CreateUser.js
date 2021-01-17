const mongo = require("./mongo")
const userSchema = require('../Schemas/user-schema')

module.exports.run = async (req) => {
    await mongo().then(async (mongoose) => {
        try {
            const user = {
                username: req.Username,
                coins: req.Coins
            }
            await new userSchema(user).save()
        } finally {
            mongoose.connection.close()
         }
    })
}