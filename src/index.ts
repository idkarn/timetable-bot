import { webhookCallback } from 'grammy';
import app from './server';
import { bot } from './init';
import { startup, updateWidgets } from './bot';
import { BOT_TOKEN, PORT } from './config';

// start bot
startup();

setInterval(updateWidgets, 1000 * 60);

// start express server
app.use(`/${BOT_TOKEN}`, webhookCallback(bot, 'express'));
app.listen(Number(PORT), async () => {
  console.log(
    `The web server succesfully starts up and listens on port ${PORT}!`
  );
});
