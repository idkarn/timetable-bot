import { Composer } from 'grammy';
import MSGS from '../utils/messages';
import CustomContext from '../types/CustomContext';

const composer = new Composer<CustomContext>();

composer.command('start', async (ctx) => {
  await ctx.reply(MSGS.greeting);
});

export default composer;
