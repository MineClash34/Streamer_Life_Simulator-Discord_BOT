const MySQL = require("mysql")
module.exports = MySQL.createConnection({
        database: "sls",
        host: "localhost",
        user: process.env.LOGIN,
        password: process.env.PASSWORD,
    });