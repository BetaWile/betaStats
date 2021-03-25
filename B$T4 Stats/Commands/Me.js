const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const vt = new Database("Database", "Voice");
const mdb = new Database("Database", "Message");
const moment = require("moment");
require("moment-duration-format");
// exports.onLoad = (client) => {};
/**
 * 
 * @param {Discord.Client} client 
 * @param {Discord.Message} message 
 * @param {Array<String>} args 
 */
exports.run = async (client, message, args) => {

    let voiceData = vt.get(`stats.${message.guild.id}.${message.author.id}`) || {voice: 0, channels: {}};
    let messageData = mdb.get(`stats.${message.guild.id}.${message.author.id}`) || {messages: 0, channels: {}};

    let cuser = message.mentions.users.first() || message.author
    let cmember = message.guild.member(cuser)
    let cDurum = message.author.presence.status;
    let cdurum;
    if(cDurum === 'online') cdurum = "Çevrimiçi"
    if(cDurum === 'idle') cdurum = "Boşta"
    if(cDurum === 'dnd') cdurum = "Rahatsız Etmeyin"
    if(cDurum === 'Invisible') cdurum = "Görünmez/Çevrimdışı"

    let voiceList = Object.keys(voiceData.channels).map(vd => {
        return {
            Id: vd,
            Total: voiceData.channels[vd]
        };
    }).sort((a, b) => b.Total - a.Total);

    let messageList = Object.keys(messageData.channels).map(md => {
        return {
            Id: md,
            Total: messageData.channels[md]
        };
    }).sort((a, b) => b.Total - a.Total);

    voiceList = voiceList.length > 10 ? voiceList.splice(0, 10) : voiceList;
    voiceList = voiceList.map((vd, index)=> `\`${index + 1}.\` ${client.channels.cache.has(vd.Id) ? client.channels.cache.get(vd.Id).toString() : "#deleted-channel"}: \`${moment.duration(vd.Total).format("H [hours,] m [minutes]")}\``).join("\n");
    messageList = messageList.length > 10 ? messageList.splice(0, 10) : messageList;
    messageList = messageList.map((md, index)=> `\`${index + 1}.\` ${client.channels.cache.has(md.Id) ? client.channels.cache.get(md.Id).toString() : "#deleted-channel"}: \`${md.Total} message\``).join("\n");
    let embed = new Discord.MessageEmbed();
    embed.setColor(message.member.displayHexColor)
    .setFooter(`${message.author.tag}`)
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .addField("Kullanıcı Bilgi",` 
    
    \`Nickname:\` ${message.member.displayName}
    \`ID:\` ${message.author.id} 
    \`Roles:\` ${message.member.roles.cache.size >= 5 ? "Roller çok fazla..." : message.member.roles.cache.map(role => role.toString())}
    \`Oluşturulma:\` ${moment(cmember.user.createdAt).format("DD/MM/YYYY")}
    \`Sunucuya Katılma:\` ${moment(cmember.joinedAt).format("DD/MM/YYYY")}
    \`Durum:\` ${cdurum}
    `)
    .addField("Ses Aktivite", `
    Son Aktivite: ${new Date(voiceData.activity).toLocaleDateString()}

    ** **${voiceList}
    `)
    .addField("Mesaj Aktivite", `
     Son Aktivite: ${new Date(messageData.activity).toLocaleDateString()}

    ** **${messageList}
    `);

    message.channel.send(embed);
};

exports.conf = {
    commands: ["ben", "istatistik", "i", "me"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'Me', 
    description: 'Provides information about your statistics on the server.',
    usage: '[p]me',
    kategori: 'User'
};
