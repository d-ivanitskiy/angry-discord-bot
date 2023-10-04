import cron from 'node-cron';
import { GuildMember } from "discord.js";
import { Nicknames } from "../constants/enum";

export const changeNickname = (usersData: GuildMember[], stop?: boolean, ids?: string[]) => {
  const changeNicknameJob = cron.schedule('0 */1 * * *', async () => {
    if (!!ids?.length) {
      const usersToChange = usersData.filter((el) => ids.includes(el.id))
      await usersToChange.forEach((user, index) => {
        user.setNickname(user.nickname === Nicknames.GOOD_BOY ? Nicknames.BAD_BOY : Nicknames.GOOD_BOY)
      })
    }
  });

  if (stop) changeNicknameJob.stop();

  changeNicknameJob.start();
}
