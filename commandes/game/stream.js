const Discord = require("discord.js");
var streamUser = new Set();
var streamChannel = new Set();
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, CleanText, addMaj, queryAsync, newPartenaire) => {
    if (streamUser.has(message.author.id)) return message.reply(Lang.YouAlreadyStream);
    if (streamChannel.has(message.channel.id)) return message.reply(Lang.ChannelHasStream);
    streamChannel.add(message.channel.id);
    streamUser.add(message.author.id);
    const commentaire = require(`../../data/commentaire${await getProfilElement("Lang", message.author.id)}.json`).comList;
    var goodResponse = 0;
    var streamOnline = true;
    var totalCom = 0;
    var comType = null;

    /*
        Function to edit message with random commentaire
    */

    const sendNewCommentaire = function(StreamMessage) {
        let randomCommentaire = commentaire[Math.ceil(Math.random() * commentaire.length) - 1];
        comType = randomCommentaire.type;
        StreamMessage.edit(`[\`${require("../../data/pseudo.json").pseudo[Math.ceil(Math.random() * require("../../data/pseudo.json").pseudo.length) - 1]}\`] : ${randomCommentaire.com}`);
        let filter = (reaction, userReact) => {
            return ["739210690450948107", "739211087206940742"].includes(reaction.emoji.id) && userReact.id === message.author.id;
        };
        StreamMessage.awaitReactions(filter, {max: 1, time: 5000, errors: ['time']})
        .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.id === "739210690450948107") {
                if (!streamOnline) return;
                if (comType === "good") goodResponse++;
                totalCom++;
                StreamMessage.reactions.resolve("739210690450948107").users.remove(message.author);
                sendNewCommentaire(StreamMessage)
            } else if (reaction.emoji.id === "739211087206940742") {
                if (!streamOnline) return;
                if (comType === "bad") goodResponse++;
                totalCom++;
                StreamMessage.reactions.resolve("739211087206940742").users.remove(message.author);
                sendNewCommentaire(StreamMessage)
            };
        }).catch(() => {
            if (!streamOnline) return;
            totalCom++;
            sendNewCommentaire(StreamMessage)
        });
    };

    /*
        Send start message
    */

    await message.channel.send(Lang.ComWillSpawned).then(async (FirstStreamMessage) => {
        FirstStreamMessage.delete({timeout: 35000})
        await FirstStreamMessage.react("739210690450948107");
        await FirstStreamMessage.react("739211087206940742");
        sendNewCommentaire(FirstStreamMessage);
    });
    await message.channel.send(Lang.ComWillSpawned).then(async (SecondStreamMessage) => {
        SecondStreamMessage.delete({timeout: 35000})
        await SecondStreamMessage.react("739210690450948107");
        await SecondStreamMessage.react("739211087206940742");
        setTimeout(() => {sendNewCommentaire(SecondStreamMessage)}, 15000);
    });

    /*
        Stream Ending
    */

    setTimeout( async () => {
        streamChannel.delete(message.channel.id);
        streamUser.delete(message.author.id);
        var Joy = Math.round(goodResponse * 100 / totalCom)
        var newSubs = Math.round(await getProfilElement("Subs", message.author.id) * ((Math.round(Math.random() * 30) + 30) / 100) * (Joy / 100))
        if (newSubs === 0) newSubs = 10;
        var Viewers = Math.round(await getProfilElement("Subs", message.author.id) * ((Math.round(Math.random() * 100) + 75) / 100) * (Joy / 100))
        if (Viewers === 0) Viewers = 30;
        var Donation = Math.round(Math.random() * (await getProfilElement("Subs", message.author.id) * (Math.round(Math.random() * 15) + 10) / 100) * Joy / 100);
        if (Donation === 0) Donation = 10;
        var partResult = await queryAsync(`SELECT * FROM partenaire WHERE DiscordID = ${message.author.id}`);
        var _1 = partResult[0].Part1 === "/" ? "0" : partResult[0].Part1.split(":")[1]
        var _2 = partResult[0].Part2 === "/" ? "0" : partResult[0].Part2.split(":")[1]
        var _3 = partResult[0].Part3 === "/" ? "0" : partResult[0].Part3.split(":")[1]
        var Sponsor = Number(_1) + Number(_2) + Number(_3);
        var Product = 0;
        streamOnline = false;
        let endEmbed = new Discord.MessageEmbed()
        .setAuthor(Lang.StreamEnd.replace("{game}", await getProfilElement("Game", message.author.id)), message.author.displayAvatarURL())
        .setColor(0xff3030)
        .addField(`${addEmoji("stats")} Statistiques`, `**•》** ${Lang.Views} : \`${Viewers}\`\n**•》** ${addMaj(Lang.Subscriber)} : \`${newSubs}\`\n**•》** Stream : \`${await getProfilElement("Stream", message.author.id)}\` => \`${await getProfilElement("Stream", message.author.id) + 1}\``)
        .addField(`💰 ${Lang.Money}`, `**•》** ${Lang.Donation} : \`${Donation}\`\n**•》** ${Lang.Sponsor} : \`${Sponsor} (${_1} + ${_2} + ${_3})\`\n**•》** ${Lang.Product} : \`${Product}\``)
        .addField(`${addEmoji("Like")} \`${Joy}\`%`, `\u200B`)
        .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
        .setTimestamp();
        message.channel.send(endEmbed);
        newPartenaire(message)
        queryAsync(`UPDATE profile SET Stream = ${await getProfilElement("Stream", message.author.id) + 1}, Sleep = ${await getProfilElement("Sleep", message.author.id) + 1}, Subscriber = ${await getProfilElement("Subs", message.author.id) + newSubs}, Money = ${await getProfilElement("Money", message.author.id) + Donation + Sponsor + Product} WHERE DiscordID = '${message.author.id}'`);
    }, 30000);
};