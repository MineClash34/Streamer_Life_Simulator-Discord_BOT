const Lang = require("../lang/fr.json");
const commandList = require("../index.js").cmdList
const getRandomColor = require("../function/getRandomColor.js");
const addEmoji = require("../function/addEmoji.js")
const getDBConnection = require("../function/getDBConnection.js")
module.exports = async (client, message) => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (message.content[0] !== process.env.Prefix) return;
    if (message.content.length === 1) return;
    var requete = message.content.replace("&", "");
    var commandFilter = commandList.filter(command => command.toLowerCase().startsWith(requete.toLowerCase()) === true);
    if (commandFilter.length >= 2) return message.reply(Lang.ManyCommandsFind + "```" + commandFilter.join(", ") + "```").then((BotMessage) => {
        BotMessage.delete({timeout:15000});
        message.delete({timeout:15000});
    });
    const cmd = client.commands.get(commandFilter.join(""));
    if (!cmd) return;
    getDBConnection()
    const args = message.content.split(" ");
    cmd.run(message, Lang, args, getRandomColor, client, addEmoji, getDBConnection);
};
