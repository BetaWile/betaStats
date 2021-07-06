const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports.beta = async(client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(config.Yetkili.AltYt)) return;

        let dataVoice = await db.get(`voiceData`) || {};

        const topVoice = Object.keys(dataVoice).map(id => {
            return {
                userID: id,
                data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 20).map((data, i) => `⦁ ${message.guild.members.cache.get(data.userID)}: \`${moment.duration(data.data).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")}\``)

        const embed = new MessageEmbed()
            .setColor('#03003d')
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
            .addField("**Ses kanalları sıralaması**", topVoice.length >= 1 ? topVoice : "Veri Yok!")
            .setTimestamp()
        return message.channel.send(embed)
    };

module.exports.config = { 
    name: 'topvoice',
    aliases: ['topvoice', 'top-voice', 'topases']
};