const con = require("./getDBConnection.js")
module.exports = function (element, id) {
    return new Promise(function (resolve, reject) {
        con.query(`SELECT * FROM profile WHERE DiscordID = ${id}`, function (err, result)  {
            if (err) return reject(err);
            if (element.toLowerCase() === "lang") resolve(result[0].Lang);
            if (element.toLowerCase() === "money") resolve(result[0].Money);
            if (element.toLowerCase() === "subs") resolve(result[0].Subscriber);
            if (element.toLowerCase() === "game") resolve(result[0].Game);
            if (element.toLowerCase() === "computer") resolve(result[0].Computer);
            if (element.toLowerCase() === "house") resolve(result[0].House);
            if (element.toLowerCase() === "createdat") resolve(result[0].CreatedAt)
            if (element.toLowerCase() === "sleep") resolve(result[0].Sleep)
            if (element.toLowerCase() === "stream") resolve(result[0].Stream)
        });
    });
};