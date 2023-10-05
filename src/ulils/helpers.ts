import { GuildChannel } from "discord.js";

import { SoundBoard } from "./soundBoard";

export const playSound = async (channel: GuildChannel, noise: string) => {
  const sound = new SoundBoard()
  await sound?.play(channel, noise);
}
