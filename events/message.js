var commandList = [];
const Lang = require("../lang/fr.json");
module.exports = async (fs, client, message) => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (message.content[0] !== process.env.Prefix) return;
    if (message.content.length === 1) return;
    fs.readdir("./commandes/", (err, folders) => {
        if (err) return console.error(err["red"]);
        folders.forEach(folder => {
            fs.readdir("./commandes/" + folder + "/", (err, files) => {
                files.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    commandList.unshift(file.replace(".js", ""));
                });
            });
        });
    });
    var commandFilter = commandList.filter(command => command.toLowerCase().startsWith(requete.toLowerCase()) === true);
    if (commandFilter.length === commandsList.length) return;
    if (commandFilter.length >= 2) return message.reply(Lang.ManyCommandsFind + "```" + CommandFilter.join(", ") + "```").then((BotMessage) => {
        BotMessage.delete({timeout:15000});
        message.delete({timeout:15000});
    });
    const cmd = client.commands.get(CommandFilter.join(""));
    if (!cmd) return;
    const args = message.content.split(" ");
    cmd.run(message, Lang, args)
}
