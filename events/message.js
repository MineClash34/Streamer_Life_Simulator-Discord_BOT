/*
JSON file
*/

const Lang = require("../lang/fr.json");
const Setup = require("../data/Setup.json");

/*
Function
*/

const getRandomColor = require("../function/getRandomColor.js");
const addEmoji = require("../function/addEmoji.js");
const getDBConnection = require("../function/getDBConnection.js");
const getProfilElement = require("../function/getProfilElement.js");
const register = require("../function/register.js");
const CleanText = require("../function/CleanText.js")
const addMaj = require("../function/addMaj.js")
const queryAsync = require("../function/queryAsync.js")
const newPartenaire = require("../function/newPartenaire.js");

/*
Other
*/

const commandList = require("../index.js").cmdList;

module.exports = async (client, message) => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (message.content[0] !== process.env.PREFIX) return;
    if (message.content.length === 1) return;
    var requete = message.content.replace("&", "").split(" ")[0];
    var commandFilter = commandList.filter(command => command.toLowerCase().startsWith(requete.toLowerCase()) === true);
    if (commandFilter.length >= 2) return message.reply(Lang.ManyCommandsFind + "```" + commandFilter.join(", ") + "```").then((BotMessage) => {
        BotMessage.delete({timeout:15000});
        message.delete({timeout:15000});
    });
    const cmd = client.commands.get(commandFilter.join(""));
    if (!cmd) return;
    getDBConnection.query(`SELECT * FROM profile WHERE DiscordID = ${message.author.id}`, function(err, result) {
        if (result.length <= 0) return register(message);
        const args = message.content.split(" ");
        cmd.run(message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, CleanText, addMaj, queryAsync, newPartenaire);
    });
};
