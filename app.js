require("dotenv").config();
const Discord = require("discord.js");
const { GatewayIntentBits } = require("discord.js");

const client = new Discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client
  .login(process.env.BOT_TOKEN || "")
  .then(() => console.log("bot is alive"))
  .catch(console.error);
