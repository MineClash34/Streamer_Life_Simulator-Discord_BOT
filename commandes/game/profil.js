const Discord = require("discord.js");
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup) => {
    let ProfilEmbed = new Discord.MessageEmbed()
    .setAuthor("Profil", message.author.displayAvatarURL())
    .setColor(0x00f531)
    .addField(`${addEmoji("logo")} ${Lang.Channel}`, `**•》** ${message.author.username}\n**•》** ${Lang.CreatedThe} \`${await getProfilElement("CreatedAt", message.author.id)}\`\n**•》** \`${await getProfilElement("Subs", message.author.id)}\` ${Lang.Subscriber}`, true)
    .addField(`${addEmoji("owner")} ${Lang.Owner}`, `**•》** ${message.author.username}\n**•》** \`${message.author.id}\``, true)
    .addField(`${addEmoji("stats")} ${Lang.Stats}`, `**•》** Stream : \`0\`\n**•》** ${Lang.Up} : \`0\``, true)
    .addField(`${addEmoji("plus")} ${Lang.OtherInformation}`, `**•》** ${Lang.Money} : \`${await getProfilElement("Money", message.author.id)}\`$\n**•》** ${Lang.CurrentGame} : \`${await getProfilElement("Game", message.author.id)}\``, true)
    .addField(`${addEmoji("computer")} Setup`, `**•》** \`${Lang[Setup[await getProfilElement("Computer", message.author.id)].Name]}\`\n**•》** \`${Setup[await getProfilElement("Computer", message.author.id)].Ram}\`\n**•》** \`${Lang[Setup[await getProfilElement("Computer", message.author.id)].GraphicProcess]}\`\n**•》** \`${Setup[await getProfilElement("Computer", message.author.id)].Quality}\``, true)
    .addField(`:house: Maison`, `**•》** \`${Lang[await getProfilElement("House", message.author.id)]}\``, true)
    .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
    .setTimestamp();
    message.channel.send(ProfilEmbed);
};