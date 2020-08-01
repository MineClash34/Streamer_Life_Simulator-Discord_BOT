const Discord = require("discord.js")
const client = new Discord.Client()
require("colors")
const fs = require("fs")
const Enmap = require("enmap")
require('dotenv').config() //Launch environment config

client.login(process.env.TOKEN) //Connect bot to discord

/*
Events binding
*/

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err["red"]);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client, fs));
    });
});
  
/*
Création et enregistrement des commandes
*/
  
  client.commands = new Enmap(); //Command's maping
  
fs.readdir("./commandes/", (err, folders) => {
    if (err) return console.error(err["red"]);
    folders.forEach(folder => {
        fs.readdir("./commandes/" + folder + "/", (err, files) =>{
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let props = require(`./commandes/${folder}/${file}`);
                let commandName = file.split(".js")[0];
                console.log(`${`Chargement de la commande :`["cyan"]} ${`${commandName}`["green"]} en cours`["cyan"]);
                client.commands.set(commandName, props);
            });
        });
    });
});