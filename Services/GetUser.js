const mongo = require("./mongo")
const userSchema = require("../Schemas/user-schema")


module.exports.run = async (res, data) => {
    await mongo.run().then(async (mongoose) => {
        try {
            const userInfo = await userSchema.find({
                RobloxUsername: data.Username
            })
            if (userInfo === "[]") {
                res.send("Could not find anything!")
            } else {
                res.send(userInfo)
            }
        } finally {
            mongoose.connection.close()
        }
    })
}