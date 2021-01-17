const bodyparser = require('body-parser')
const express = require('express')
const settings = require("./settings.json")
const CreateUser = require("./Services/CreateUser")
const app = express()


var port = process.env.PORT || 5000


app.use(bodyparser.text())

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
    //CreateUser.run(request)
    res.send("Gotten POST request")
})

app.listen(port, function(){
    console.log(`started server at http://localhost:${port}`)
})