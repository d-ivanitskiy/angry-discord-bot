import dotenv from "dotenv";
import Discord, { GatewayIntentBits, Partials } from "discord.js";

dotenv.config();

const bot = new Discord.Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

bot.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  } else {
    console.log(message.content);
  }
});

bot
  .login(process.env.BOT_TOKEN || "")
  .then(() => console.log("bot is alive"))
  .catch(console.error);
