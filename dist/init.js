"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = exports.drive = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleapis_1 = require("googleapis");
const grammy_1 = require("grammy");
const config_1 = require("./config");
const bot = new grammy_1.Bot(config_1.BOT_TOKEN);
exports.bot = bot;
const auth = new google_auth_library_1.GoogleAuth({
    credentials: {
        client_email: config_1.GOOGLE_CLIENT_EMAIL,
        private_key: `-----BEGIN PRIVATE KEY-----\n${config_1.GOOGLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = googleapis_1.google.drive({ version: 'v3', auth });
exports.drive = drive;
