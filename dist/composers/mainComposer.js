"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const messages_1 = __importDefault(require("../utils/messages"));
const composer = new grammy_1.Composer();
composer.command('start', async (ctx) => {
    await ctx.reply(messages_1.default.greeting);
});
exports.default = composer;
