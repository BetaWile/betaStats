const Discord = require('discord.js');
const betaconf = require('../Settings/Settings.json');
const db = require('quick.db');

module.exports = async message => {

  if (message.author.bot || !message.guild || !message.content) return;
  let client = message.client;
  let prefix = betaconf.Prefix.filter(p => message.content.startsWith(p))[0]; 
  if (!prefix) return;
  let args = message.content.split(" ").slice(1);
  let command = message.content.split(" ")[0].slice(prefix.length);
  let load  = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (load) {
    if (!message.member.hasPermission(8) && client.cooldown.has(message.author.id)) return;
    load.beta(client, message, args);
  };
};
