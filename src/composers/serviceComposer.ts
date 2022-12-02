import { Composer } from 'grammy';
import { bot } from '../init';
import MSGS from '../messages';
import CustomContext from '../types/CustomContext';
import delay from '../utils/delay';

const composer = new Composer<CustomContext>();

// development only for now
composer.command('id', async (ctx) => {
  const id = String(ctx.from?.id);
  await ctx.reply(`${id} ${ctx.msg.message_id}`);
});

composer.command('help', async (ctx) => {
  await ctx.reply(MSGS.help);
});

composer.command('clear', async (ctx) => {
  await bot.api.unpinAllChatMessages(ctx.chat.id);

  const reportMsg = await ctx.reply(MSGS.unpin, {
    reply_markup: { remove_keyboard: true },
  });

  await delay(2000);

  await bot.api.deleteMessage(ctx.chat.id, reportMsg.message_id);
});

composer.command('cancel', async (ctx) => {
  ctx.session.route = '';
  await ctx.reply(MSGS.cancel);
});

export default composer;
