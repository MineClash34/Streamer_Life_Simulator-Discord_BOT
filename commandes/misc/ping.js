const Discord = require("discord.js")
exports.run = async (message, Lang, args, getRandomColor, client) => {

    let startTime = Date.now();
    let embed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setDescription(`⏲ Bot's ping : ***${(new Date() - startTime).toFixed(0)} ms***\n💓 API's ping  : ***${Math.round(client.ws.ping).toFixed(0)} ms***`)
    .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
    .setTimestamp();
    message.channel.send(embed).then((botmessage) => {
        let embed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setDescription(`⏲ Bot's ping : ***${(new Date() - startTime).toFixed(0)} ms***\n💓 APIS's ping : ***${Math.round(client.ws.ping).toFixed(0)} ms***\n:satellite: Total ping : ***${(new Date() - startTime).toFixed(0)} ms***`)
        .setFooter(`Streamer Life Simulator Bot, By ${process.env.OWNER}`, process.env.PPURL)
        .setTimestamp();
        botmessage.edit(embed);
    });
};