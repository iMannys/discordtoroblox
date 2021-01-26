const mongo = require("./mongo")
const userSchema = require("../Schemas/user-schema")


module.exports.run = async (res) => {
    await mongo.run().then(async (mongoose) => {
        try {
            const userInfo = await userSchema.find({
                
            })
        } finally {
            mongoose.connection.close()
        }
    })
}