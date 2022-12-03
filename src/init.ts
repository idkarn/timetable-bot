import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { Bot } from 'grammy';
import CustomContext from './types/CustomContext';
import {
  BOT_TOKEN as TOKEN,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
} from './config';

// init bot
const bot = new Bot<CustomContext>(TOKEN);

// init google drive
const auth = new GoogleAuth({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: `-----BEGIN PRIVATE KEY-----\n${GOOGLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`,
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });

interface Query {
  [userId: string]: number;
}
const chats: Query = {};

export { drive, bot, chats };
