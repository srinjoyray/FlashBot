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




/*const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}




const DisTube = require("distube");
// Create a new DisTube
const distube = new DisTube(client, {
    searchSongs: true,
    emitNewSongOnly: true,
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    console.log(message);
    const [command, ...args] = message.content
        .trim()
        .substring(prefix.length)
        .split(/\s+/);

    console.log(command);
    console.log(args);

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

    if (command == "play") {
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel");
        if (!args[0]) return message.channel.send("You must add something to play");
        distube.play(message, args.join(" "));
    }

    if (command == "stop") {
        const bot = message.guild.members.cache.get(client.user.id);
        if (!message.member.voice.channel) return message.channel.send("You must be in a voice channel");
        if (bot.voice.channel !== message.member.voice.channel) return message.channel.send("You are not in the same voice channel as Melody");
        distube.stop(message);
        // message.channel.send("Stopped");
        message.react('🛑');
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if(command == "toss"){
        const tossCoin = Math.floor(Math.random()*2);
        console.log(tossCoin);
        const embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle('Coin Toss')
      // Set the color of the embed
      .setColor([79, 238, 13])
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!');
    // Send the embed to the same channel as the message
        if(tossCoin==1){
            embed.setDescription('Heads');
        }
        else{
            embed.setDescription('Tails');
        }
        message.channel.send(embed);
        
    }
    
});

// Queue status template
const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"
    }\` | Loop: \`${queue.repeatMode
        ? queue.repeatMode == 2
            ? "All Queue"
            : "This Song"
        : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) =>
        message.channel.send(
            `Playing \`${song.name}\` - \`${song.formattedDuration
            }\`\nRequested by: ${song.user.tag}\n${status(queue)}`
        )
    )
    .on("addSong", (message, queue, song) =>
        message.channel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.tag}`
        )
    )
    .on("playList", (message, queue, playlist, song) =>
        message.channel.send(
            `Play \`${playlist.name}\` playlist (${playlist.songs.length
            } songs).\nRequested by: ${song.user.tag}\nNow playing \`${song.name
            }\` - \`${song.formattedDuration}\`\n${status(queue)}`
        )
    )
    .on("addList", (message, queue, playlist) =>
        message.channel.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length
            } songs) to queue\n${status(queue)}`
        )
    )
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    (song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``
                )
                .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
        );
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e);
        message.channel.send("An error encountered: " + e);
    });

*/
client.login(process.env.BOT_TOKEN);
