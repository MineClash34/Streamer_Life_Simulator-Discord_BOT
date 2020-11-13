const queryAsync = require("./queryAsync.js");
module.exports = function (lang, message) {
    var Days = null
    var Month = null
    if (new Date().getDate().toString().length === 1) Days = `0${new Date().getDate().toString()}`;
    else Days = new Date().getDate().toString();
    if (new Date().getMonth().toString().length === 1) Month = `0${new Date().getMonth().toString()}`;
    else Month = new Date().getMonth().toString();
    queryAsync(`INSERT INTO profile (Lang, DiscordID, CreatedAt, CreatedAtTimestamp) VALUES ('fr', '${message.author.id}', '${Days}/${Month}/${new Date().getFullYear()}', ${Date.now()})`);
    queryAsync(`INSERT INTO partenaire (DiscordID) VALUES ('${message.author.id}')`);
    queryAsync(`INSERT INTO product (DiscordID) VALUES ('${message.author.id}')`);
};