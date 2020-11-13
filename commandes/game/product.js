const Discord = require("discord.js");
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, CleanText, addMaj, queryAsync, newPartenaire) => {
    var proArray = new Array();
    var proResult = await queryAsync(`SELECT * FROM product WHERE DiscordID = ${message.author.id}`);
    var proList = require(`../../data/product${await getProfilElement("Lang", message.author.id)}.json`).productList;


    let listIndex = 0;
    Object.values(proResult[0]).splice(0, 8).forEach(r => {
        proArray.push(`　 　**▬▬▬▬　${proList[listIndex].product}　▬▬▬▬**\n`);
        proArray.push(`${r === 0 ? `**•》** ${Lang.Requirement} : ${proList[listIndex].req}\n**•》** ${Lang.Price} : \`${proList[listIndex].req * 12}\`` : `**•》** ${Lang.Level} : ${r}\n**•》** ${Lang.Price} : \`${(r + 1) * proList[listIndex].req * 12}\``}\n`);
        listIndex++;
    });

    let productEmbed = new Discord.MessageEmbed()
    .setAuthor(Lang.Product, message.author.displayAvatarURL())
    .setColor(0x00f531)
    .setDescription(proArray.join(""))
    .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
    .setTimestamp();
    message.channel.send(productEmbed);
};