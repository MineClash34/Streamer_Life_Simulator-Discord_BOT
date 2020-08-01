require("colors");
module.exports = async (client) => {
    client.user.setActivity(`Maintenance | ${client.guilds.cache.size} guilds | ${client.users.cache.size} users !`);
    console.log(`${`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`["yellow"]} ${`Bot connected to`["green"]} ${`${client.guilds.cache.size}`["red"]["bold"]["underline"]} ${`guilds for`["green"]} ${`${client.users.cache.size}`["red"]["bold"]["underline"]} ${`users`["green"]}.`);
};