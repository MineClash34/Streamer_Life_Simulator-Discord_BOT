const Discord = require("discord.js");
const client = new Discord.Client();
require("colors");
const fs = require("fs");
const Enmap = require("enmap");
require('dotenv').config(); //Launch environment config

client.login(process.env.TOKEN); //Connect bot to discord

/*
Events binding
*/

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err["red"]);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});
  
/*
Création et enregistrement des commandes
*/
  
client.commands = new Enmap(); //Command's maping
const commandList = [];  // Create new array with name of all command, to export
  
fs.readdir("./commandes/", (err, folders) => {
    if (err) return console.error(err["red"]);
    folders.forEach(folder => {
        fs.readdir("./commandes/" + folder + "/", (err, files) =>{
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let props = require(`./commandes/${folder}/${file}`);
                let commandName = file.replace(".js", "");
                console.log(`${`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`["yellow"]} ${`Chargement de la commande :`["cyan"]} ${`${commandName}`["green"]["underline"]} ${`en cours`["cyan"]}.`);
                commandList.unshift(commandName)
                client.commands.set(commandName, props);
            });
        });
    });
});

module.exports = {
    cmdList: commandList
}