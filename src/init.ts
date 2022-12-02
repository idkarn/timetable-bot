import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { Bot } from 'grammy';
import CustomContext from './types/CustomContext';

const TOKEN: string = process.env.BOT_TOKEN || '';
if (!TOKEN) throw new Error('BOT_TOKEN must be provided');

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || '';
if (!GOOGLE_CLIENT_EMAIL)
  throw new Error('GOOGLE_CLIENT_EMAIL must be provided');

const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY || '';
if (!GOOGLE_PRIVATE_KEY) throw new Error('GOOGLE_PRIVATE_KEY must be provided');

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

export { drive, bot };
