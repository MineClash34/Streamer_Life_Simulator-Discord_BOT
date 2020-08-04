const Discord = require("discord.js");
const commentaire = require("../../data/commentaire.json").comList;
var streamUser = new Set();
var streamChannel = new Set();
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, addMaj) => {
    if (streamUser.has(message.author.id)) return message.reply(Lang.YouAlreadyStream);
    if (streamChannel.has(message.channel.id)) return message.reply(Lang.ChannelHasStream);
    streamChannel.add(message.channel.id);
    streamUser.add(message.author.id);
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
        await FirstStreamMessage.react("739210690450948107");
        await FirstStreamMessage.react("739211087206940742");
        sendNewCommentaire(FirstStreamMessage);
    });
    await message.channel.send(Lang.ComWillSpawned).then(async (SecondStreamMessage) => {
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
        var newSubs = Math.round(Math.random() * (await getProfilElement("Subs", message.author.id) * 15 / 100) + (await getProfilElement("Subs", message.author.id) * 5 / 100)) * Joy;
        if (newSubs === 0) newSubs = 10;
        var Viewers = Math.round(Math.random() * (await getProfilElement("Subs", message.author.id) * (Math.round(Math.random() * 20) + 20) / 100)) * Joy;
        if (Viewers === 0) Viewers = 30;
        var Donation = Math.round(Math.random() * (await getProfilElement("Subs", message.author.id) * (Math.round(Math.random() * 15) + 10) / 100)) * Joy;
        if (Donation === 0) Donation = 10;
        var Sponsor = 0;
        var Product = 0;
        streamOnline = false;
        let endEmbed = new Discord.MessageEmbed()
        .setAuthor(Lang.StreamEnd.replace("{game}", await getProfilElement("Game", message.author.id)), message.author.displayAvatarURL())
        .setColor(0xff3030)
        .addField(`${addEmoji("stats")} Statistiques`, `**•》** ${Lang.Views} : \`${Viewers}\`\n**•》** ${addMaj(Lang.Subscriber)} : \`${newSubs}\``)
        .addField(`💰 ${Lang.Money}`, `**•》** ${Lang.Donation} : \`${Donation}\`\n**•》** ${Lang.Sponsor} : \`${Sponsor}\`\n**•》** ${Lang.Product} : \`${Product}\``)
        .addField(`${addEmoji("Like")} \`${Joy}\`%`, `\u200B`)
        .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
        .setTimestamp();
        message.channel.send(endEmbed)
    }, 30000);
};