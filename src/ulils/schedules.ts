import cron from 'node-cron';
import { GuildChannel, GuildMember } from "discord.js";

import { Nicknames } from "../constants/enum";
import { playSound } from "./helpers";

export const changeNickname = (usersData: GuildMember[], stop?: boolean, ids?: string[], channel?: GuildChannel) => {
  const changeNicknameJob = cron.schedule('0 */1 * * *', async () => {
    if (!!ids?.length) {
      const usersToChange = usersData.filter((el) => ids.includes(el.id))
      await usersToChange.forEach((user, index) => {
        user.setNickname(user.nickname === Nicknames.GOOD_BOY ? Nicknames.BAD_BOY : Nicknames.GOOD_BOY)
      })
      if (!!channel) {
        await playSound(channel, "surprise-motherfucker");
      }
    }
  });

  if (stop) changeNicknameJob.stop();

  changeNicknameJob.start();
}
