# telegram timetable bot

Это полезный и мультифункциональный телеграм бот для простой и удобной работы учеников с раписанием. Этот проект стремится обладать всем необходимым функционалом для учеников. Код-база написана, как пример решения задач конкретного учебного заведения. Структура бота устраена так, чтобы общий функционал оставался отделен от алгоритмов получения и парсинга расписания. Каждый имеет возможность повлиять и внести свой вклад через этот репозиторий.

## Принципы

- Не хранить личных данных
- Максимальная прозрачность
- Узкая направленность

## Установка

1. Установка зависимостей

   ```
   npm i
   ```

2. Транспиляция кода

   ```
   npm run compile
   ```

3. Установите значение для всех переменных среды в файле **.env**

## Запуск

У бота есть два режима работы: **Вебхуки** и **Лонг-пол**

> В связи с нынешней реализаций бот работает через **вебхуки**

### Вебхуки

1. Запуск

   ```
   npm run start
   ```

### Лонг-пол

1. Замените эту строчку в `src/index.ts`

   ```ts
   app.use(`/${secretPath}`, webhookCallback(bot, 'express'));
   ```

   на

   ```ts
   bot.start();
   ```

2. Транспиляция кода

   ```
   npm run compile
   ```

3. Запуск

   ```
   npm run start
   ```
