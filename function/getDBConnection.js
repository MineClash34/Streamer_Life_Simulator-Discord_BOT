const MySQL = require("mysql")
module.exports = function () {
    var con = MySQL.createConnection({
        database: "sls",
        host: "localhost",
        user: process.env.LOGIN,
        password: process.env.PASSWORD,
    });
    return con;
};