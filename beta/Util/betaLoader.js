const reqEvent = (event) => require(`../Events/${event}`);
module.exports = beta => {
    beta.on('message', reqEvent('betaMessage'));
    beta.on('ready', () => reqEvent('betaReady')(beta));
    beta.on('message', reqEvent('betaMessageStat'))
    beta.on('voiceStateUpdate', reqEvent('betaVoiceStat'))
};