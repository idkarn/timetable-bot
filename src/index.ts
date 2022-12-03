import app from './server';
import { bot } from './init';
import { startup, updateWidgets } from './bot';
import { PORT } from './config';

// start bot
startup();

setInterval(updateWidgets, 1000 * 60);

// start bot
bot.start();

// start express server
app.listen(Number(PORT), async () => {
  console.log(
    `The web server succesfully starts up and listens on port ${PORT}!`
  );
});
