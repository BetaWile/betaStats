const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports.beta = async(client, message, args) => {

        let dataMessage = await db.get(`messageData`) || {};
        const topMessage = Object.keys(dataMessage).map(id => {
            return {
                userID: id,
                data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 20).map((data, i) => `⦁ ${message.guild.members.cache.get(data.userID)}: \`${data.data} Mesaj\``)


        const embed = new MessageEmbed()
            .setColor('#5963f3')
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
            .addField("**Mesaj | Top 10**", topMessage.length >= 1 ? topMessage : "Veri Yok!")
            .setTimestamp()
        return message.channel.send(embed)
    };

module.exports.config = { 
    name: 'toptext',
    aliases: ['toptext', 'top-text', 'topyazı']
};