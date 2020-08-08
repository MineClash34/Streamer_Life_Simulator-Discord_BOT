exports.run = async (message, Lang, args, getRandomColor, client, addEmoji, getProfilElement, Setup, CleanText, addMaj, queryAsync) => {
    if (message.author.id !== process.env.MYID) return;
    args.shift();
    try {
        var code = args.join(" ");
        let evaled = eval(await code);
        if (typeof evaled !== "string");
        evaled = require("util").inspect(await evaled);
        if (CleanText(await evaled).includes(process.env.TOKEN)) return message.channel.send("T'as cru tu pouvais avoir le token ? Mdr");
        if (CleanText(await evaled).includes("}") && CleanText(await evaled).includes("Packet") && CleanText(await evaled).includes("Row")) message.channel.send(CleanText(await evaled), {code:"xl"});
        else message.channel.send(CleanText(await evaled));
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${CleanText(err)}\n\`\`\``);
    };
};