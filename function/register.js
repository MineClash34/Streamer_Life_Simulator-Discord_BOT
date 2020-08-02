const insertDB = require("./insertDB.js")
module.exports = function(message) {
    message.reply("\n:flag_gb: Hello and Welcome in **SLS : Streamer Life Simulator**! To start, please select in which language you want to play, it can be changed later.\n\n:flag_fr: Bonjour et Bienvenue dans SLS : Streamer Life Simulator ! Pour commencer, veuillez m'indiquer dans quel langue vous souhaitez jouer ! Celui-ci peut être changer plus tard.").then(async (FirstMessage) => {
        await FirstMessage.react("🇬🇧");
        await FirstMessage.react("🇫🇷");
        let filter = (reaction, userreact) => {
            return ["🇫🇷", "🇬🇧"].includes(reaction.emoji.name) && userreact.id === message.author.id;
        };
        FirstMessage.awaitReactions(filter, {max: 1, time: 90000, errors: ['time']})
        .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === "🇫🇷") {
                let Lang = require("../lang/fr.json");
                insertDB("fr", message);
                message.channel.send(Lang.FirstStepReg);
            } else if (reaction.emoji.name === "🇬🇧") {
                let Lang = require("../lang/fr.json");
                insertDB("en", message);
                message.channel.send(Lang.FirstStepReg);
            };
        });
    });
};