const queryAsync = require("./queryAsync.js");
const getProfilElement = require("./getProfilElement.js");
const Discord = require("discord.js");
const { query } = require("./getDBConnection.js");
module.exports = async function (message) {
    var partList = await queryAsync(`SELECT * FROM partenaire WHERE DiscordID = ${message.author.id}`);
    partList = Object.values(partList[0]);
    partList.splice(0, 2)
    var part1 = partList[0].replace(partList[0].split(":")[2], (Number(partList[0].split(":")[2]) - 1).toString());
    var part2 = partList[1].replace(partList[1].split(":")[2], (Number(partList[1].split(":")[2]) - 1).toString());
    var part3 = partList[2].replace(partList[2].split(":")[2], (Number(partList[2].split(":")[2]) - 1).toString());
    queryAsync(`UPDATE partenaire SET Part1 = "${part1}", Part2 = "${part2}", Part3 = "${part3}" WHERE DiscordID = ${message.author.id}`);
};