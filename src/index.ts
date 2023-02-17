import dotenv from "dotenv";
import { Client, IntentsBitField, GatewayIntentBits, Events } from "discord.js";
import fetchLinks from "./utils/fetchLinks";

dotenv.config();

const prefix = "!search ";
const PORT = process.env.PORT || 4000;
const BOT_TOKEN = process.env.BOT_TOKEN as string;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag} 🤖!`);
});

client.on(Events.MessageCreate, async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  else {
    const query = msg.content.slice(prefix.length);
    if (query?.trim().length === 0) {
      msg.reply("Please enter a valid query");
      return;
    }
    const reply = await fetchLinks(query);
    msg.reply(reply);
  }
});

// for slash commands

// const commands = [
//   {
//     name: "ping",
//     description: "Replies with Pong!",
//   },
// ];

// const rest = new REST({ version: "10" }).setToken(BOT_TOKEN);

// (async () => {
//   try {
//     console.log("Started refreshing application (/) commands.");

//     await rest.put(
//       Routes.applicationCommands(process.env.CLIENT_ID as string),
//       {
//         body: commands,
//       }
//     );

//     console.log("Successfully reloaded application (/) commands.");
//   } catch (error) {
//     console.error(error);
//   }
// })();

// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "ping") {
//     const data = new SlashCommandBuilder()
//       .setName("echo")
//       .setDescription("Replies with your input!")
//       .addStringOption((option) =>
//         option
//           .setName("input")
//           .setDescription("The input to echo back")
//           .setRequired(true)
//       );

//     const row = new ActionRowBuilder().addComponents(
//       new ButtonBuilder()
//         .setCustomId("primary")
//         .setLabel("Click me!")
//         .setStyle(ButtonStyle.Primary)
//     );

//     // @ts-ignore
//     await interaction.reply({
//       content: "Hey there!",
//       options: data,
//     });
//   }
// });

client.login(BOT_TOKEN);
