require("colors");
module.exports = async (client) => {
    client.user.setActivity(`Maintenance | ${client.guilds.cache.size} guilds | ${client.users.cache.size} users !`);
    console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] Bot connected to ${client.guilds.cache.size} guilds for ${client.users.cache.size} users`["green"]);
};