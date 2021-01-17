const bodyparser = require('body-parser')
const express = require('express')
const settings = require("./settings.json")
const CreateUser = require("./Services/CreateUser")
const app = express()


var port = process.env.PORT || 5000


app.use(bodyparser.text())

app.post('/', (request, response) => {
    CreateUser.run(request.body)
    response.send("Gotten POST request")
})

app.listen(port, function(){
    console.log(`started server at http://localhost:${port}`)
})