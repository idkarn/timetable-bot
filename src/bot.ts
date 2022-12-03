import { session } from 'grammy';
import { InlineKeyboardButton } from 'grammy/out/types.node';
import mainComposer from './composers/mainComposer';
import scheduleComposer from './composers/scheduleComposer';
import scheduleRouter from './routers/scheduleRouter';
import SessionData from './types/SessionData';
import serviceComposer from './composers/serviceComposer';
import { bot, chats } from './init';
import checkUser from './utils/antispam';
import getSchedule from './utils/getSchedule';
import { getIndexByTime } from './utils/utils';

function startup(): void {
  bot.use(
    session({
      initial(): SessionData {
        return {
          route: '',
          user: {
            name: '',
            class: 0,
          },
          data: null,
        };
      },
    })
  );

  bot.use(checkUser);

  bot.use(mainComposer);

  bot.use(serviceComposer);

  bot.use(scheduleRouter);

  bot.use(scheduleComposer);

  bot.catch((err) => {
    console.log(err);
  });
}

async function updateWidgets(): Promise<void> {
  const day = new Date().getDay(); // weekday

  for await (const [userId, msgId] of Object.entries<number>(chats)) {
    const chat = await bot.api.getChat(userId);
    const btn = chat.pinned_message?.reply_markup?.inline_keyboard[0]?.[0] as
      | InlineKeyboardButton.CallbackButton
      | undefined;

    if (btn !== undefined) {
      const name = btn.callback_data.slice(1); // student's name without day
      const data = await getSchedule(`${day}${name}`);

      const [isItlessonTime, idx] = getIndexByTime();
      const msgContent: string =
        isItlessonTime || idx === -1 ? data[idx].title : 'чил';

      try {
        bot.api.editMessageText(userId, msgId, msgContent);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { startup, updateWidgets };
