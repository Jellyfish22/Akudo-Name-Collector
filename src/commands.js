import { REST, Routes, SlashCommandBuilder, ChannelType } from 'discord.js'
import { CONFIG } from '../config.js';

const getCommands = () => [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  new SlashCommandBuilder()
    .setName("configure")
    .setDescription("Configures the bot to select a certain channel to listen to !play")
    .addChannelOption(option => 
        option.setName('channel')
        .setDescription('Select the channel to listen to !play')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)

    ),
  new SlashCommandBuilder()
    .setName("output")
    .setDescription("Outputs the names"),
  new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Resets the names")
]

export const registerCommands = async () => {
    const rest = new REST({ version: '10' }).setToken(CONFIG.TOKEN);

    try {      
        await rest.put(Routes.applicationCommands(CONFIG.CLIENT_ID, CONFIG.GUILD_ID), { body: getCommands() });
      } catch (error) {
        console.error(error);
      }
}
