const Discord = require("discord.js");
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup) => {
    const commentaire = require("../../data/commentaire.json").comList;
    var streamTime = 60;
    var nextCommentaire = 5;
    message.channel.send(Lang.StreamStart).then(async (StreamMessage) => {
        await StreamMessage.react("739210690450948107")
        await StreamMessage.react("739211087206940742")
        let filter = (reaction, userReact) => {
            return ["739210690450948107", "739211087206940742"].includes(reaction.emoji.id) && userReact.id === message.author.id;
        };
        StreamMessage.awaitReactions(filter, {time: 65000, errors: ['time']})
        .then(collected => {
            const reaction = collected.first();
            let commentaireInterval = setInterval(function() {
                if (streamTime > 45 && nextCommentaire === 5) {
                    let randomCommentaire = commentaire[Math.round(Math.random() * commentaire.length)];

                };
            }, 1000);
        }).catch(collected => {
            message.channel.send("Stream fini")
        })
    });
};