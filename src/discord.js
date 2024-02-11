import { Client, GatewayIntentBits, AttachmentBuilder, PermissionsBitField } from 'discord.js';
import {resetUsernames, getUsernames} from "./usernames.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getClient = async () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
    });

    handleCommands(client)
    client.login(process.env.TOKEN);

    return client;
}

export const sendMessage = async (client, channelId) => {
    console.log(`Sending message to ${channelId}`)
}

export let channelId = ""
export const handleCommands = (client) => {
    client.on('interactionCreate', async (interaction) => {
        try {
            if (!interaction.isChatInputCommand()) return

           
            // Define the ID of the channel you want to limit interactions to
         
             const roleName = "TEAM";
             const member = await interaction.guild.members.fetch(interaction.user.id);
             
             // Check if the member has the specific role
             const hasRole = member.roles.cache.some(role => role.name === roleName);
             
            if (!hasRole) {
                 await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
                 return; // Stop further execution for users without the role
            }

            if (interaction.commandName === 'configure') {
                // Retrieve the channel object from the command options
                const channel = interaction.options.getChannel('channel');
                
                // Check if the channel object was successfully retrieved
                if (channel) {
                    // Get the ID from the channel object
                    channelId = channel.id;
                    
                    await interaction.reply(`Configured to listen to this channel: ${channel.name} (ID: ${channelId})!`);
                } else {
                    // Handle the case where no channel was found or provided
                    await interaction.reply('No channel was selected.');
                }
            }
            if (interaction.commandName === 'ping') {
                await interaction.reply('Pong!')
            }
            if (interaction.commandName === 'reset') {
                await interaction.reply('Reseting names')
                resetUsernames()
            }
            if (interaction.commandName === 'output') {
                const usernamesArray = Array.from(getUsernames());
                const csvContent = usernamesArray.join('\n'); 

                const tempFilePath = path.join(__dirname, 'usernames.csv');

                fs.writeFileSync(tempFilePath, csvContent);

                const file = new AttachmentBuilder(tempFilePath);

                try {
                    await interaction.reply({ content: 'Here are the usernames:', files: [file], ephemeral: true });
                } catch (error) {
                    console.error('Could not send message to the user.', error);
                } finally {
                    // Delete file
                    fs.unlinkSync(tempFilePath);
                }
            }
        } catch (e) {
            console.error("Error " + e)
        }
    })
}
