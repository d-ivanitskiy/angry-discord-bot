import dotenv from "dotenv";
import Discord, { GatewayIntentBits, Partials } from "discord.js";

dotenv.config();

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return
  } else {
    console.log(message.content)
  }
});

client
  .login(process.env.BOT_TOKEN || "")
  .then(() => console.log("bot is alive"))
  .catch(console.error);
