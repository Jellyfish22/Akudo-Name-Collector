import { channelId, getClient, sendMessage } from './src/discord.js';
import {recordUsernames, getUsernames} from "./src/usernames.js"
import { registerCommands } from './src/commands.js';


const client = await getClient();    
registerCommands()

client.on('messageCreate', (message) => {
    const allowedChannelId = "1206005727974391808";
    console.log(message.channelId)
    // Check if the interaction occurred in the specific channel
    if (message.channelId !== channelId) {
        console.log(`Ignoring interaction in channel ${message.channelId}`);
        return; // Stop further execution if it's not the right channel
    }

    if(message.content.startsWith("!play")) {
        recordUsernames(message.author.username)
    }

    console.log(getUsernames())
})
