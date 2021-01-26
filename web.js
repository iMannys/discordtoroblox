const bodyparser = require('body-parser')
const express = require('express')
const http = require('https')
const settings = require("./Config/botsettings.json")
const CreateUser = require("./Services/CreateUser")
const GetUser = require("./Services/GetUser")
const GetGuild = require('./index')
const { response } = require('express')
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

app.get('/', function (req, res) {
    var json = ''

    req.on('data', function (chunk) {
        json += chunk;
    });

    req.on('end', function () {
        if (res.statusCode === 200) {
            try {
                var data = JSON.parse(json)
                res.send(data)
            } catch (e) {
                console.log(`Error parsing JSON. Error: ${e}`)
            }
        }
    })
    //GetUser.run(res)
})

app.listen(port, function(){
    console.log(`started server at http://localhost:${port}`)
})