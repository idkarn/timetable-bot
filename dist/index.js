"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const server_1 = __importDefault(require("./server"));
const init_1 = require("./init");
const bot_1 = require("./bot");
const config_1 = require("./config");
(0, bot_1.startup)();
server_1.default.use(`/${config_1.BOT_TOKEN}`, (0, grammy_1.webhookCallback)(init_1.bot, 'express'));
server_1.default.listen(Number(config_1.PORT), async () => {
    console.log(`The web server succesfully starts up and listens on port ${config_1.PORT}!`);
});
