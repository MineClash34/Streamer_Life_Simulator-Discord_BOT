const commandList = require("../../index.js").cmdList;
const Enmap = require("enmap")
const fs = require("fs")
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, CleanText) => {
    if (message.author.id !== process.env.MYID) return;
    var requete = message.content.split(" ")[1];
    if (!requete) return message.reply("Précise moi une commande :)");
        var commandFilter = commandList.filter(command => command.toLowerCase().startsWith(requete));
        if (commandFilter.length >= 2) return message.reply(Lang.ManyCommandsFind + "```" + commandFilter.join(", ") + "```");
        const cmd = client.commands.get(commandFilter.join(""));
        if (!cmd) return message.reply("J'ai rien trouvé chef !");
        delete require.cache[require.resolve(`../Game/${commandFilter.join("")}.js`)];
        client.commands.delete(commandFilter.join(""));
        const props = require(`../Game/${commandFilter.join("")}.js`);
        client.commands.set(commandFilter.join(""), props);
        message.reply(`La commande : **${commandFilter.join("")}** a été rechargé avec succès.`);
};