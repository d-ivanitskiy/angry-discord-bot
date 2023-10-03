import dotenv from "dotenv";
import Discord, {GatewayIntentBits, Partials} from "discord.js";

dotenv.config();

const bot = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
  ],
  partials: [
    Partials.User,
    Partials.GuildScheduledEvent,
    Partials.GuildMember,
    Partials.ThreadMember,
    Partials.Channel,
    Partials.Message,
    Partials.Reaction
  ],
});

bot.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  } else {
    console.log(message.content);
  }
});

bot.on('typingStart', (typing) => {
  console.log(typing);
})

bot
  .login(process.env.BOT_TOKEN || "")
  .then(() => console.log("bot is alive"))
  .catch(console.error);
