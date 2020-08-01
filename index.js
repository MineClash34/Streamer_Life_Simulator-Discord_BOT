const Discord = require("discord.js")
const client = new Discord.Client()
require('dotenv').config()

client.login(process.env.TOKEN)


