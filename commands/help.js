module.exports = {
    name: "help",
    aliases : [],
    description : "Shows the helper menu" ,
    execute(client,message,cmd,args,Discord){

        const embed = new Discord.MessageEmbed()
            // Set the title of the field
            .setTitle('Help Menu')
            // Set the color of the embed
            .setColor('#6600ff')
            // Set the main content of the embed
            .setDescription(`
            **.help** - Display the help menu
            **.play** - To play a song
            **.skip** - To skip a song
            **.stop** - To stop all song 
            **.meme** - To see a meme
            **.toss** - To toss a coin
            **.pic** - To generate a random image
            `);

        message.channel.send(embed);

    }
}