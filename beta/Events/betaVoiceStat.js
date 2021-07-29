const db = require("quick.db");
const Main = require("../Settings/Settings.json");
const Activites = new Map();

module.exports = async (oldState, newState) => {

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
}