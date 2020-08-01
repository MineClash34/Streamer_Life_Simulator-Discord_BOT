const Discord = require("discord.js");
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji) => {
    let ProfilEmbed = new Discord.MessageEmbed()
    .setAuthor("Profil", message.author.displayAvatarURL())
    .setColor(0x00f531)
    .addField(`${addEmoji("logo")} ${Lang.Channel}`, `**•》** ${message.author.username}\n**•》** ${Lang.CreatedThe} \`date\`\n**•》** \`0\` ${Lang.Subscriber}`, true)
    .addField(`${addEmoji("owner")} ${Lang.Owner}`, `**•》** ${message.author.username}\n**•》** \`${message.author.id}\``, true)
    .addField(`${addEmoji("stats")} ${Lang.Stats}`, `**•》** Stream : \`0\`\n**•》** ${Lang.Up} : \`0\``, true)
    .addField(`${addEmoji("plus")} ${Lang.OtherInformation}`, `**•》** ${Lang.Money} : \`0\`$\n**•》** ${Lang.CurrentGame} : \`Un jeu\``, true)
    .addField(`${addEmoji("computer")} Setup`, `**•》** \`Minitel\`\n**•》** \`512Mo RAM DDR1\`\n**•》** \`Pas de carte graphique\`\n**•》** \`180p\``, true)
    .addField(`:house: Maison`, `**•》** \`${Lang.GPHouse}\``, true)
    .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
    .setTimestamp();
    message.channel.send(ProfilEmbed);
};