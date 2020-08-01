const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
const Enmap = require("enmap")
require('dotenv').config()

client.login(process.env.TOKEN)


