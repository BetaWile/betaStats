const db = require("quick.db");
const Main = require("../Settings/Settings.json");

module.exports = async (message) => {

 if(!message.guild || message.author.bot || message.content.startsWith(Main.Prefix)) return;
    db.add(`messageData.${message.author.id}.channel.${message.channel.id}`, 1);
    db.push(`messageData.${message.author.id}.times`, {time: Date.now(), puan: 1})
};