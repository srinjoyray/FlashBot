var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});

module.exports = {
    name: "pic",
    aliases: ["picture", "image"],
    descripton: " This send a pic",
    async execute(client, message,cmd,args,Discord){
        const imageQuery = args.join(' ');
        if(!imageQuery) return message.channel.send('Please enter an image name');
        console.log(imageQuery);
        const imageResult = await google.scrape(imageQuery,1);
        message.reply(imageResult[0].url);
    }
}