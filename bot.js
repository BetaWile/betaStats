const client = global.client;

client.on("ready", () => {
    console.log("Bot Hazır!");
});

client.login(global.Settings.Token);