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
                if (data.Method === "GetData") {
                    GetUser.run(res, data)
                } else if (data.Method === "SetData") {
                    CreateUser.run(data)
                    res.send("Successfully set the data!")
                }
                
            } catch (e) {
                console.log(`Error parsing JSON. Error: ${e}`)
            }
        }
    })
})


app.listen(port, function(){
    console.log(`started server at http://localhost:${port}`)
})