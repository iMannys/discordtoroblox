const bodyparser = require('body-parser')
const express = require('express')
const settings = require("./settings.json")

const app = express()

const mongoPass = settings.MONGO_PASS
const mongoUser = settings.MONGO_USER
const DBname = settings.MONGO_DBName

//mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@discordtoroblox.in2nf.mongodb.net/${DBname}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true });

var port = process.env.port || 5000

app.use(bodyparser.text())

app.post('/post', (request, response) => {
    response.send("Gotten POST request")
    console.log(request.body)
})

app.listen(port, function(){
    console.log(`started server at http://localhost:${port}`)
})