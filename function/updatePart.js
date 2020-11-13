const queryAsync = require("./queryAsync.js");
const getProfilElement = require("./getProfilElement.js");
const Discord = require("discord.js");
module.exports = async function (message) {
    var partList = await queryAsync(`SELECT * FROM partenaire WHERE DiscordID = ${message.author.id}`)
};