Available in: [English](README.md) | [Русский](README_ru.md)

# telegram timetable bot
This is a useful and multifunctional telegram bot for make it easier for students to work with their timetables! This projects goal is to have everything a student will ever need. The code is written for a specific school, but it separates the logic of getting and parsing the information and displaying it. Everyone can (and is encouraged to) contribute!

## Principles

- Don't store personal data
- Maximum transparency 
- Narrow focus

## Installing

1. Dependencies
   ```
   npm i
   ```

2. Compiling TypeScript
   ```
   npm run compile
   ```

3. Set all the required variables in the `.env` file

## Launching
The bot has two modes of operation: **Webhooks** и **Long poll**

> In the current implementation, the bot works with webhooks only.

### Webhooks

1. Launch

   ```
   npm run start
   ```

### Long poll

1. Change this line in `src/index.ts`

   ```ts
   app.use(`/${secretPath}`, webhookCallback(bot, 'express'));
   ```

   to

   ```ts
   bot.start();
   ```

2. Compile code

   ```
   npm run compile
   ```

3. Launch

   ```
   npm run start
   ```
