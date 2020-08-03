const commandList = require("../../index.js").cmdList;
const Enmap = require("enmap")
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, CleanText) => {
    if (!message.author.id === process.env.MYID) return;
    var requete = message.content.split(" ")[1];
    if (!requete) return message.reply("Précise moi une commande :)");
    if (requete === "all") {
        client.commands = new Enmap();
        fs.readdir("./commandes/", (err, folders) => {
            if (err) return console.error(err["red"]);
            folders.forEach(folder => {
                fs.readdir("./commandes/" + folder + "/", (err, files) =>{
                    files.forEach(file => {
                        if (!file.endsWith(".js")) return;
                        let props = require(`./commandes/${folder}/${file}`);
                        let commandName = file.replace(".js", "");
                        console.log(`${`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`["yellow"]} ${`Chargement de la commande :`["cyan"]} ${`${commandName}`["green"]["underline"]} ${`en cours`["cyan"]}.`);
                        commandList.unshift(commandName)
                        client.commands.set(commandName, props);
                    });
                });
            });
        });
        message.reply(`Toutes les commandes ont été rechargé avec succès.`);
    } else {
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
};