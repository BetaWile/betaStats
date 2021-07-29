const Discord = require("discord.js");
const client = new Discord.Client()
const Settings = require("./beta/Settings/Config.json");
const betaconf = require("./beta/Settings/Settings.json");
const fs = require("fs");

require('./beta/Util/betaLoader')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./beta/Commands', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./beta/Commands/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
   });
});

fs.readdir("./beta/Events", (err, files) => {
  if (err) return console.error(err);
  files.filter(file => file.endsWith(".js")).forEach(file => {
      let prop = require(`./beta/Events/${file}`);
      if (!prop.configuration) return;
      client.on(prop.configuration.name, prop);
  });
});

client.login(betaconf.Token).catch(() => console.log('Tokeni kontrol ediniz.'));
