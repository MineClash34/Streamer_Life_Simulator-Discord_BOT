const queryAsync = require("./queryAsync.js");
const getProfilElement = require("./getProfilElement.js");
const Discord = require("discord.js");
module.exports = async function (message) {
    const Lang = require(`../lang/${await getProfilElement("Lang", message.author.id)}.json`)

    /*
    Function
    */

    const partSelect = async function(_Message) {
        var filter = m => m.author.id === message.author.id;
        _Message.channel.awaitMessages(filter, {max: 1, time: 90000, errors: ['time']})
        .then(async collected => {
            const messageCollected = collected.first();
            console.log(messageCollected.content)
            if (messageCollected.content) {
                if (isNaN(messageCollected.content) || Number(messageCollected.content) < 0) {
                    partSelect(_Message);
                    return message.reply(Lang.isNaN);
                };
                if (messageCollected.content.toLowerCase() === "cancel") return message.reply(Lang.Canceled);
                var partNumber = messageCollected.content === "1" ? "Part1" : messageCollected.content === "2" ? "Part2" : "Part3" ;
                queryAsync(`UPDATE partenaire SET ${partNumber} = "${newPart}:${partPayout}:${duration.toString()}" WHERE DiscordID = ${message.author.id}`);
                message.channel.send(Lang.PartAccept.replace("{part}", newPart).replace("{payout}", partPayout).replace("{periode}", durationStr));
            };
        });
    };


    var rows = await queryAsync(`SELECT * FROM partenaire WHERE DiscordID = ${message.author.id}`);
    if (rows[0].Part1 === "/" || rows[0].Part2 === "/" || rows[0].Part3 === "/") {
        var partNumber = rows[0].Part1 === "/" ? "Part1" : rows[0].Part2 === "/" ? "Part2" : "Part3";
        if (Math.round(Math.random() * 100) < 10) return;
        if (Math.round(Math.random() * 100) < 15) var duration = 0;
        else var duration = Math.round(Math.random() * 10 + 5);
        if (duration === 0) var durationStr = Lang.IllimityPart;
        else var durationStr = `${duration} ${Lang.Days}`;
        var newPart = require(`../data/sponsor${await getProfilElement("Lang", message.author.id)}.json`).sponsor[Math.ceil(Math.random() * require(`../data/sponsor${await getProfilElement("Lang", message.author.id)}.json`).sponsor.length) - 1];
        var partPayout = Math.round(await getProfilElement("Subs", message.author.id) * 0.35);
        let newPartEmbed = new Discord.MessageEmbed()
        .setAuthor(Lang.newPartnerOffer, message.author.displayAvatarURL())
        .setColor(0x00ffff)
        .setDescription(`${Lang.PartAsk.replace("{part}", newPart).replace("{payout}", partPayout).replace("{periode}", durationStr)}`)
        .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
        .setTimestamp();
        message.channel.send(`<@${message.author.id}>`, newPartEmbed).then(async (partMessage) => {
            await partMessage.react("✅");
            await partMessage.react("❌");
            let filter = (reaction, userReact) => {
                return ["✅", "❌"].includes(reaction.emoji.name) && userReact.id === message.author.id;
            };
            partMessage.awaitReactions(filter, {max: 1, time: 90000, errors: ['time']})
            .then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === "✅") {
                    queryAsync(`UPDATE partenaire SET ${partNumber} = "${newPart}:${partPayout}:${duration.toString()}" WHERE DiscordID = ${message.author.id}`);
                    message.channel.send(Lang.PartAccept.replace("{part}", newPart).replace("{payout}", partPayout).replace("{periode}", durationStr));
                };
                if (reaction.emoji.name === "❌") {
                    message.channel.send(Lang.PartRefused.replace("{part}", newPart));
                };
            });
        });
    } else {
        const Lang = require(`../lang/${await getProfilElement("Lang", message.author.id)}.json`)
        if (Math.round(Math.random() * 100) < 25) return;
        if (Math.round(Math.random() * 100) < 15) var duration = 0;
        else var duration = Math.round(Math.random() * 10 + 5);
        if (duration === 0) var durationStr = Lang.IllimityPart;
        else var durationStr = `${duration} ${Lang.Days}`;
        var newPart = require(`../data/sponsor${await getProfilElement("Lang", message.author.id)}.json`).sponsor[Math.ceil(Math.random() * require(`../data/sponsor${await getProfilElement("Lang", message.author.id)}.json`).sponsor.length) - 1];
        var partPayout = Math.round(await getProfilElement("Subs", message.author.id) * 0.35);
        let newPartEmbed = new Discord.MessageEmbed()
        .setAuthor(Lang.newPartnerOffer, message.author.displayAvatarURL())
        .setColor(0x00ffff)
        .setDescription(`${Lang.PartAsk.replace("{part}", newPart).replace("{payout}", partPayout).replace("{periode}", durationStr)}`)
        .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
        .setTimestamp();
        message.channel.send(`<@${message.author.id}>`, newPartEmbed).then(async (partMessage) => {
            await partMessage.react("✅");
            await partMessage.react("❌");
            let filter = (reaction, userReact) => {
                return ["✅", "❌"].includes(reaction.emoji.name) && userReact.id === message.author.id;
            };
            partMessage.awaitReactions(filter, {max: 1, time: 90000, errors: ['time']})
            .then(async (collected) => {
                const reaction = collected.first();
                if (reaction.emoji.name === "✅") {
                    var partList = await queryAsync(`SELECT * FROM partenaire WHERE DiscordID = ${message.author.id}`)
                    let partEmbed = new Discord.MessageEmbed()
                    .setAuthor(Lang.PartList, message.author.displayAvatarURL())
                    .setColor(0x00f531)
                    .setDescription(`**　 　▬▬▬▬　Partenariat 1　▬▬▬▬**\n**•》** ${partList[0].Part1 !== "/" ? Lang.Sponsor + " " + partList[0].Part1.split(":")[0] : Lang.NoPart}\n**•》** ${Lang.Payout} : ${partList[0].Part1 !== "/" ? "`" + partList[0].Part1.split(":")[1] + "`$" : Lang.NoPart}\n**•》** ${Lang.Period} : ${partList[0].Part1 !== "/" ? "**" + partList[0].Part1.split(":")[2] + "** " + Lang.Days: Lang.NoPart}\n**　 　▬▬▬▬　Partenariat 2　▬▬▬▬**\n**•》** ${partList[0].Part2 !== "/" ? Lang.Sponsor + " " + partList[0].Part2.split(":")[0] : Lang.NoPart}\n**•》** ${Lang.Payout} : ${partList[0].Part2 !== "/" ? "`" + partList[0].Part2.split(":")[1] + "`$" : Lang.NoPart}\n**•》** ${Lang.Period} : ${partList[0].Part2 !== "/" ? "**" + partList[0].Part2.split(":")[2] + "** " + Lang.Days: Lang.NoPart}\n**　 　▬▬▬▬　Partenariat 3　▬▬▬▬**\n**•》** ${partList[0].Part3 !== "/" ? Lang.Sponsor + " " + partList[0].Part3.split(":")[0] : Lang.NoPart}\n**•》** ${Lang.Payout} : ${partList[0].Part3 !== "/" ? "`" + partList[0].Part3.split(":")[1] + "`$" : Lang.NoPart}\n**•》** ${Lang.Period} : ${partList[0].Part3 !== "/" ? "**" + partList[0].Part3.split(":")[2] + "** " + Lang.Days: Lang.NoPart}`)
                    .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
                    .setTimestamp();
                    await message.channel.send(partEmbed)
                    await message.reply(Lang.ChoosePart).then((PartListMessage) => {
                        partSelect(PartListMessage);
                    });
                };
                if (reaction.emoji.name === "❌") {
                    message.channel.send(Lang.PartRefused.replace("{part}", newPart));
                };
            });
        });
    };
};