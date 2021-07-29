const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports.beta = async(client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(config.Yetkili.AltYt)) return;

        let dataMessage = await db.get(`messageData`) || {};
        let dataVoice = await db.get(`voiceData`) || {};

        const topMessage = Object.keys(dataMessage).map(id => {
            return {
                userID: id,
                data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, i) => `⦁ ${message.guild.members.cache.get(data.userID)}: \`${data.data} Mesaj\``)

        const topVoice = Object.keys(dataVoice).map(id => {
            return {
                userID: id,
                data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, i) => `⦁ ${message.guild.members.cache.get(data.userID)}: \`${moment.duration(data.data).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")}\``)

        const embed = new MessageEmbed()
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('#5963f3')
            .addField("**Mesaj | Top 10**", topMessage.length >= 1 ? topMessage : "Veri Yok!")
            .addField("**Sesli | Top 10**", topVoice.length >= 1 ? topVoice : "Veri Yok!")
        return message.channel.send(embed)
    };

module.exports.config = { 
    name: 'top',
    aliases: ['top', 'topstat']
};
