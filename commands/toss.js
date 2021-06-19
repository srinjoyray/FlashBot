module.exports = {
    name: "toss",
    execute(client,message, cmd, args, Discord) {
        const tossCoin = Math.floor(Math.random() * 2);
        const embed = new Discord.MessageEmbed()
            // Set the title of the field
            .setTitle('Coin Toss')
            // Set the color of the embed
            .setColor([79, 238, 13])
            // Set the main content of the embed
            .setDescription('Hello, this is a slick embed!');
        // Send the embed to the same channel as the message
        if (tossCoin == 1) {
            embed.setDescription('Heads');
        }
        else {
            embed.setDescription('Tails');
        }
        message.channel.send(embed);
    }
}