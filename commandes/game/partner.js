const Discord = require("discord.js");
exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, CleanText, addMaj, queryAsync, newPartenaire) => {
    var partList = await queryAsync(`SELECT * FROM partenaire WHERE DiscordID = ${message.author.id}`)
    let partEmbed = new Discord.MessageEmbed()
    .setAuthor(Lang.PartList, message.author.displayAvatarURL())
    .setColor(0x00f531)
    .setDescription(`**　 　▬▬▬▬　Partenariat 1　▬▬▬▬**\n**•》** ${partList[0].Part1 !== "/" ? Lang.Sponsor + " " + partList[0].Part1.split(":")[0] : Lang.NoPart}\n**•》** ${Lang.Payout} : ${partList[0].Part1 !== "/" ? "`" + partList[0].Part1.split(":")[1] + "`$" : Lang.NoPart}\n**•》** ${Lang.Period} : ${partList[0].Part1 !== "/" ? "**" + partList[0].Part1.split(":")[2] + "** " + Lang.Days: Lang.NoPart}\n**　 　▬▬▬▬　Partenariat 2　▬▬▬▬**\n**•》** ${partList[0].Part2 !== "/" ? Lang.Sponsor + " " + partList[0].Part2.split(":")[0] : Lang.NoPart}\n**•》** ${Lang.Payout} : ${partList[0].Part2 !== "/" ? "`" + partList[0].Part2.split(":")[1] + "`$" : Lang.NoPart}\n**•》** ${Lang.Period} : ${partList[0].Part2 !== "/" ? "**" + partList[0].Part2.split(":")[2] + "** " + Lang.Days: Lang.NoPart}\n**　 　▬▬▬▬　Partenariat 3　▬▬▬▬**\n**•》** ${partList[0].Part3 !== "/" ? Lang.Sponsor + " " + partList[0].Part3.split(":")[0] : Lang.NoPart}\n**•》** ${Lang.Payout} : ${partList[0].Part3 !== "/" ? "`" + partList[0].Part3.split(":")[1] + "`$" : Lang.NoPart}\n**•》** ${Lang.Period} : ${partList[0].Part3 !== "/" ? "**" + partList[0].Part3.split(":")[2] + "** " + Lang.Days: Lang.NoPart}`)
    .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
    .setTimestamp();
    message.channel.send(partEmbed)
};