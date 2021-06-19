const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();
// queue(message.guild.id , queueConstructor{voiceChannel,textChannel,connection,song[]})

module.exports = {
    name : "play" ,
    aliases : ["skip", "stop"],
    description : "Music Bot",
    async execute(client,message,cmd,args,Discord){

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.reply("You must be in a voice channel");
        
        
        const serverQueue = queue.get(message.guild.id);

        if(cmd === 'play'){
            if (!args.length) return message.reply("You must add something to play");

            let song = {};

            if(ytdl.validateURL(args[0])){
                const songInfo = await ytdl.getInfo(args[0]);
                song = {
                    title : songInfo.videoDetails.title,
                    url : songInfo.videoDetails.video_url
                }
            } else{
                const videoFinder = async(query) => {
                    const videoResult = await ytSearch(query);
        
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        
                }
                
                const video = await videoFinder(args.join(' '));

                if(video){
                    song = {
                        title : video.title,
                        url : video.url
                    }
                } else{
                    message.channel.send("Error finding the video 😞");
                }

            }

            if(!serverQueue){
                const queueConstructor = {
                    voiceChannel : voiceChannel,
                    textChannel : message.channel,
                    connection : null,
                    songs : []
                }
    
                queue.set(message.guild.id,queueConstructor);
                queueConstructor.songs.push(song);
    
                try{
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
    
                    videoPlayer(message.guild,queueConstructor.songs[0]);
                } catch(err){
                    queue.delete(message.guild.id);
                    message.channel.send("There was an error connecting! 😞");
                    throw err;
                }
            } else{
                serverQueue.songs.push(song);
                return message.channel.send(`👍 **${song.title}** added to queue!`);
            }  
        }

        else if(cmd == "skip"){
            skipSong(message,serverQueue);
        }
        else if(cmd == "stop"){
            stopSong(message,serverQueue);
        }
        // console.log(serverQueue);
    }

}

const videoPlayer = async(guild,song) => {
    const songQueue = queue.get(guild.id);

    if(!song){
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly' });
    songQueue.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        songQueue.songs.shift();
        videoPlayer(guild, songQueue.songs[0]);
    });
    await songQueue.textChannel.send(`🎶 Now playing **${song.title}**`)
}

const skipSong = (message , serverQueue) =>{
    if(!message.member.voice.channel)return message.channel.send('You need to be in a channel to execute this');
    if(!serverQueue){
        return message.channel.send("There are no song in the queue");
    }
    serverQueue.connection.dispatcher.end();

}

const stopSong = async(message,serverQueue) =>{
    if(!message.member.voice.channel)return message.channel.send('You need to be in a channel to execute this');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    await message.channel.send('Leaving channel 😔');
}

