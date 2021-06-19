const fetch = require('node-fetch');

module.exports = {
    name: "meme",
    description: "Displays a meme",
    async execute(client, message, cmd, args, Discord) {
        fetch("https://meme-api.herokuapp.com/gimme")
            .then((res) => res.json())
            .then(async json => {
                
                const embed = new Discord.MessageEmbed()
                    .setTitle(json.title)
                    .setColor('#5200cc')
                    .setImage(json.url)
                    .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`);

                message.channel.send(embed);
            });
    },
};
