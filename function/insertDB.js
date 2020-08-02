const con = require("./getDBConnection.js");
module.exports = function (lang, message) {
    var Days = null
    var Month = null
    if (new Date().getDate().toString().length === 1) Days = `0${new Date().getDate().toString()}`;
    else Days = new Date().getDate().toString();
    if (new Date().getMonth().toString().length === 1) Month = `0${new Date().getMonth().toString()}`;
    else Month = new Date().getMonth().toString();
    con.query(`INSERT INTO profile (Lang, DiscordID, CreatedAt, CreatedAtTimestamp) VALUES ('fr', '${message.author.id}', '${Days}/${Month}/${new Date().getFullYear()}', ${Date.now()})`, function (err, result)  {
        if (err) return reject(err);
    });
};