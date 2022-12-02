import { session } from 'grammy';
import mainComposer from './composers/mainComposer';
import scheduleComposer from './composers/scheduleComposer';
import scheduleRouter from './routers/scheduleRouter';
import SessionData from './types/SessionData';
import 'dotenv/config';
import serviceComposer from './composers/serviceComposer';
import { bot } from './init';
import checkUser from './utils/antispam';

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

// eslint-disable-next-line import/prefer-default-export
export { startup };
