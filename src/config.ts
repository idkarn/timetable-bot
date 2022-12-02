import 'dotenv/config';

interface Config {
  [key: string]: string;
}

function getEnvVal(key: string): string {
  const VAL: string | undefined = process.env[key];
  if (VAL === undefined) throw new Error(`${key} must be provided`);
  return VAL;
}

const config: Config = {
  MAI_FILE_ID: '1NUDWEyRl3a9XxQD_P32ymjXd6B9HD6HGDRpORJ734Kw',
  FOLDER_ID: '1s3qk1KNs0FQ0_uXYWBiw8r2c0P8KCp2D',
  BOT_TOKEN: getEnvVal('BOT_TOKEN'),
  PORT: '5000',
  GOOGLE_CLIENT_EMAIL: getEnvVal('GOOGLE_CLIENT_EMAIL'),
  GOOGLE_PRIVATE_KEY: getEnvVal('GOOGLE_PRIVATE_KEY'),
};

export const {
  MAI_FILE_ID,
  FOLDER_ID,
  BOT_TOKEN,
  PORT,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
} = config;

export default config;
