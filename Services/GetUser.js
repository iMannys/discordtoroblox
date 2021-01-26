const mongo = require("./mongo")
const userSchema = require("../Schemas/user-schema")


module.exports.run = async (res, data) => {
    await mongo.run().then(async (mongoose) => {
        try {
            const userInfo = await userSchema.find({
                RobloxUsername: data.Username
            })
            res.send(userInfo)
        } finally {
            mongoose.connection.close()
        }
    })
}