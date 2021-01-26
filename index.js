const Discord = require('discord.js');
const bot = new Discord.Client();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const fs = require('fs')
const settings = require('./Config/botsettings.json')
const CreateUser = require("./Services/CreateUser")
const userSchema = require("./Schemas/user-schema")
const mongo = require("./Services/mongo")
const app = express()

// WEB RELATED

var port = process.env.PORT || 5000


app.use(bodyparser.text())



app.post('/', (req, res) => {
    var json = ''

    req.on('data', function (chunk) {
        json += chunk;
    });

    req.on('end', async function () {
        if (res.statusCode === 200) {
            try {
                var data = JSON.parse(json)
                if (data.Method === "GetData") {
                    await mongo.run().then(async (mongoose) => {
                        try {
                            const userInfo = await userSchema.find({
                                RobloxUsername: data.Username
                            })
                            if (userInfo === "[]") {
                                res.send("There was no document with that user!")
                            } else {
                                res.send(userInfo)
                            }
                           
                        } finally {
                            mongoose.connection.close()
                        }
                    })
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





// DISCORD BOT RELATED

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./Commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./Commands/${f}`);
        bot.commands.set(pull.config.cmdname, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});



bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    var prefix = settings.prefix
    let args = message.content.split(" ");
    let cmd = args[0];
    //var args =  message.content.substring(message.content.indexOf(' ')+1);
    
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)
})


bot.login(process.env.DJS_TOKEN);

console.log("Bot logged in!")