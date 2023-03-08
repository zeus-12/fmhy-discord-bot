import dotenv from "dotenv";
import { Client, IntentsBitField, GatewayIntentBits, Events } from "discord.js";
import fetchLinks from "./utils/fetchLinks";

dotenv.config();

const prefix = "!search ";
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

client.login(BOT_TOKEN);
