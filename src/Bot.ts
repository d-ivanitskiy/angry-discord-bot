import dotenv from "dotenv";
import Discord, { GatewayIntentBits, Partials } from "discord.js";

import { changeNickname } from "./ulils/schedules";
import { playSound } from "./ulils/helpers";

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

bot.on('ready', async (client) => {
  // let channels = Object.fromEntries(client?.guilds?.cache?.get(process.env.GUILD_ID));
  // const kek = channels.map((channel: { id: any; name: any; }) => channel.id && channel.name)
  // console.log(channels)
  const guild = await bot.guilds.fetch(process.env.GUILD_ID || "");
  const members = await guild.members.fetch();
  const dataAsObject = Object.fromEntries(members);
  const usersData = Object.keys(dataAsObject).map((el: any) => dataAsObject[el])

  if (process.env.DEN_TESTER_ID && process.env.NIKITOS_ID) {
    changeNickname(usersData, false, [process.env.DEN_TESTER_ID, process.env.NIKITOS_ID]);
  }
});

bot.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  } else {
    let channel = message.member.voice.channel;
    await playSound(channel, "bruh");
  }
});

bot.on('voiceStateUpdate', async (oldState, newState) => {
  const channel = oldState?.member?.voice?.channel || newState?.member?.voice?.channel;
  await playSound(channel, "fuck-you");
});

bot.on('typingStart', (typing) => {
  // console.log(typing);
})

if (process.env.BOT_TOKEN) {
  bot
    .login(process.env.BOT_TOKEN)
    .then(() => console.log("bot is alive"))
    .catch(console.error);
}

