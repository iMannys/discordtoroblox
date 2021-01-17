const mongo = require("./mongo")
const userSchema = require('../Schemas/user-schema')

module.exports.run = async (data) => {
    await mongo.run().then(async (mongoose) => {
        try {
            const user = {
                Username: data.Username,
                Coins: data.Coins
            }

            await new userSchema.findOneAndUpdate(
            {
                Username,
                Coins,
            }, 
            {
                user
            },
            {
                upsert: true,
                new: true
            }
            )
        } finally {
            mongoose.connection.close()
         }
    })
}