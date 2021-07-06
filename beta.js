const Discord = require('discord.js')
const client = new Discord.Client({ fetchAllMembers: true })
const fs = require('fs')
const Main = require('./src/Settings/Settings.json');
const config = require('./src/Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');
const Activites = new Map();


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Set();

client.on('ready', async () => {
  client.user.setPresence(`${Main.Status}`, { status: "online"} ,{ type: 'PLAYİNG'})
  .then(console.log(`${client.user.tag} İsmiyle Discord Bağlantısı kuruldu.`))
  .catch(() => console.log(`Bir hata ile karşılaştım.`))
});

fs.readdir('./src/Command', (err, files) => { 
    files.forEach(fs => { 
    let command = require(`./src/Command/${fs}`); 
    client.commands.set(command.config.name, command);
    if(command.config.aliases) command.config.aliases.forEach(Aliases => client.aliases.set(Aliases, command.config.name));
    });
  });

  client.on('message', async message => {
    if (!message.guild || message.author.bot || message.channel.type === 'dm') return;
    let prefix = Main.Prefix.filter(p => message.content.startsWith(p))[0]; 
    if (!prefix) return;
    let args = message.content.split(' ').slice(1);
    let command = message.content.split(' ')[0].slice(prefix.length); 
    let load = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
    if (load){
     if (!message.member.hasPermission(8) && client.cooldown.has(message.author.id)) return;
      client.cooldown.add(message.author.id);
      setTimeout(() => client.cooldown.delete(message.author.id), 5);
      load.beta(client, message, args);
    };
  });

client.on('message', async(message) => {
  if(!message.guild || message.author.bot || message.content.startsWith(client.prefix)) return;
  db.add(`messageData.${message.author.id}.channel.${message.channel.id}`, 1);
  db.push(`messageData.${message.author.id}.times`, {time: Date.now(), puan: 1})
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
  if(!oldState.channelID && newState.channelID) { 
    Activites.set(oldState.id, Date.now());
  }
      let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); 
    } else data = Activites.get(oldState.id);
  
    let duration = Date.now() - data;
    if(oldState.channelID && !newState.channelID) { 
        Activites.delete(oldState.id);
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    } else if(oldState.channelID && newState.channelID){
        Activites.set(oldState.id, Date.now());
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, {time: Date.now(), puan:  duration})
    }
  
});

client.login(Main.Token).catch(() => console.log('Tokeni kontrol ediniz.'))
