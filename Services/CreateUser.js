const mongo = require("./mongo")
const userSchema = require('../Schemas/user-schema')

module.exports.run = async (data) => {
    await mongo.run().then(async (mongoose) => {
        try {

            await new userSchema.findOneAndUpdate(
            {
                Username,
                Coins,
            }, 
            {
                Username: data.Username,
                Coins: data.Coins
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