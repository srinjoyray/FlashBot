module.exports = (Discord, client, message) => {
    
    const prefix=process.env.prefix;

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    console.log(cmd);
    console.log(args);

    const command = client.commands.get(cmd) || client.commands.find(a=> a.aliases && a.aliases.includes(cmd));

    if(command){
        command.execute(client, message,cmd, args, Discord);
    }

}