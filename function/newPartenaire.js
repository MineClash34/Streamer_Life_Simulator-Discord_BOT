const queryAsync = require("./queryAsync.js");
const getProfilElement = require("./getProfilElement.js");
const Discord = require("discord.js");
module.exports = async function (message) {
    var rows = await queryAsync(`SELECT * FROM partenaire WHERE DiscordID = ${message.author.id}`);
    if (rows[0].Part1 === "/" || rows[0].Part2 === "/" || rows[0].Part3 === "/") {
        const Lang = require(`../lang/${await getProfilElement("Lang", message.author.id)}.json`)
        if (Math.round(Math.random() * 100) < 10) return;
        if (Math.round(Math.random() * 100) < 5) var duration = 0;
        else var duration = Math.round(Math.random() * 15);
        if (duration === 0) var durationStr = Lang.IllimityPart
        else var durationStr = `${duration} ${Lang.Days}`
        var newPart = require(`../data/sponsor${await getProfilElement("Lang", message.author.id)}.json`).sponsor[Math.ceil(Math.random() * require(`../../data/sponsor${await getProfilElement("Lang"), message.author.id}.json`).sponsor.length) - 1];
        var partPayout = await getProfilElement("Subs", message.author.id) * 0.35;
        let newPartEmbed = new Discord.MessageEmbed()
        .setAuthor(Lang.newPartnerOffer, message.author.displayAvatarURL())
        .setColor(0x00ffff)
        .setDescription(`${Lang.PartAsk.replace("{part}", newPart).replace("{payout}", partPayout).replace("{periode}", durationStr)}`)
        .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
        .setTimestamp();
        message.channel.send(`<@${message.author.id}>`, newPartEmbed);
    };
};