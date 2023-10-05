import {
  createAudioResource,
  getVoiceConnection,
  createAudioPlayer,
  joinVoiceChannel,
} from "@discordjs/voice"
import path from "path";

import { getSound } from "./sounds";
import {GuildChannel, StageChannel, VoiceChannel} from "discord.js";

export class SoundBoard {
  constructor() {}

  async play(channel: GuildChannel, sound: string) {
    const Sound = getSound(sound);

    if (!Sound) throw new TypeError("[soundboard]: InValid Sound.");
    // @ts-ignore
    let connection = getVoiceConnection(channel?.guild?.id);

    if (!connection) {
      try {
        connection = joinVoiceChannel({
          channelId: channel?.id,
          // @ts-ignore
          guildId: channel?.guild?.id,
          adapterCreator: channel?.guild?.voiceAdapterCreator,
        })
      } catch (error) {
        console.error(error);
      }

    }

    let player = createAudioPlayer()
    let res = createAudioResource(path.join(__dirname, `../sounds/${Sound.file}`))
    res.volume?.setVolume(0.4)
    player.play(res)
    connection?.subscribe(player)

    // player.on(AudioPlayerStatus.Idle, () => {
    //   connection?.destroy()
    // })
  }
}
