import dotenv from "dotenv";
import Discord, { GatewayIntentBits, Partials } from "discord.js";

import { changeNickname } from "./ulils/schedules";

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
    let channel = message.member.voice.channel
    // console.log(message.content);
    console.log(channel)
    // sound.play(channel, 'niconiconii')
  }
});

bot.on('typingStart', (typing) => {
  console.log(typing);
})

bot.on('ready', async function() {
  const guild = await bot.guilds.fetch(process.env.GUILD_ID || "");
  const members = await guild.members.fetch();
  const dataAsObject = Object.fromEntries(members);
  const usersData = Object.keys(dataAsObject).map((el: any) => dataAsObject[el])

  if (process.env.DEN_TESTER_ID && process.env.NIKITOS_ID) {
    changeNickname(usersData, false, [process.env.DEN_TESTER_ID, process.env.NIKITOS_ID]);
  }

});

bot
  .login(process.env.BOT_TOKEN || "")
  .then(() => console.log("bot is alive"))
  .catch(console.error);
