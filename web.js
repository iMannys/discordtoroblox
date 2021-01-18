const bodyparser = require('body-parser')
const express = require('express')
const http = require('https')
const settings = require("./Config/botsettings.json")
const CreateUser = require("./Services/CreateUser")
const GetGuild = require('./index')
const app = express()


var port = process.env.PORT || 5000


app.use(bodyparser.text())

//http.get()

app.post('/', (req, res) => {
    var json = ''

    req.on('data', function (chunk) {
        json += chunk;
    });

    req.on('end', function () {
        if (res.statusCode === 200) {
            try {
                var data = JSON.parse(json)
                CreateUser.run(data)
            } catch (e) {
                console.log(`Error parsing JSON. Error: ${e}`)
            }
        }
    })
    res.send("Gotten POST request")
})

app.listen(port, function(){
    console.log(`started server at http://localhost:${port}`)
})