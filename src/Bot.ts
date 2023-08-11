import dotenv from "dotenv";
import Discord, { GatewayIntentBits } from "discord.js";

dotenv.config();

const client = new Discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client
  .login(process.env.BOT_TOKEN || "")
  .then(() => console.log("bot is alive"))
  .catch(console.error);
