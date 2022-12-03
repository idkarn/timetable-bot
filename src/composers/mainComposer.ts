import { Composer } from 'grammy';
import MSGS from '../utils/messages';
import CustomContext from '../types/CustomContext';
import { chats } from '../init';

const composer = new Composer<CustomContext>();

composer.command('start', async (ctx) => {
  await ctx.reply(MSGS.greeting);
});

composer.command('widget', async (ctx) => {
  const msg = await ctx.reply('widget message');
  chats[ctx.chat.id] = msg.message_id;
});

export default composer;
