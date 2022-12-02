import { Composer } from 'grammy';
import CustomContext from '../types/CustomContext';

const composer = new Composer<CustomContext>();

// development only for now
composer.command('id', async (ctx) => {
  const id = String(ctx.from?.id);
  await ctx.reply(`${id} ${ctx.msg.message_id}`);
});

export default composer;
