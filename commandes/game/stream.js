const Discord = require("discord.js");
const commentaire = require("../../data/commentaire.json").comList;
var commentaireInterval = null;
var goodResponse = 0
var totalCom = 0
var comType = null;
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup) => {
    var nextCommentaire = Math.round(Math.random() * 3) + 2;
    message.channel.send(Lang.StreamStart).then(async (StreamMessage) => {
        await StreamMessage.react("739210690450948107");
        await StreamMessage.react("739211087206940742");
        let filter = (reaction, userReact) => {
            return ["739210690450948107", "739211087206940742"].includes(reaction.emoji.id) && userReact.id === message.author.id;
        };
        commentaireInterval = setInterval(function() {
                if (nextCommentaire === 0) {
                    totalCom++
                    nextCommentaire = Math.round(Math.random() * 3) + 2;
                    let randomCommentaire = commentaire[Math.round(Math.random() * commentaire.length)];
                    comType = randomCommentaire.type;
                    StreamMessage.edit(randomCommentaire.com);
                } else nextCommentaire--;
        }, 1000);
        StreamMessage.awaitReactions(filter, {time: 65000, errors: ['time']})
        .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.id === "739210690450948107") {
                if (comType === "good") goodResponse++;
            } else if (reaction.emoji.id === "739211087206940742") {
                if (comType === "bad") goodResponse++;
            };
        }).catch(collected => {
            clearInterval(commentaireInterval);
            StreamMessage.edit(`Stream fini ! Ambiance : ${goodResponse * 100 / totalCom}.`);
        });
    });
};