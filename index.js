require("dotenv").config();
const Discord = require("discord.js");
const fs = require('fs');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

// console.log(client);


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.BOT_TOKEN);

