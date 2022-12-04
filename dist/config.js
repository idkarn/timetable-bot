"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOOGLE_PRIVATE_KEY = exports.GOOGLE_CLIENT_EMAIL = exports.PORT = exports.BOT_TOKEN = exports.FOLDER_ID = exports.MAI_FILE_ID = void 0;
require("dotenv/config");
function getEnvVal(key) {
    const VAL = process.env[key];
    if (VAL === undefined)
        throw new Error(`${key} must be provided`);
    return VAL;
}
const config = {
    MAI_FILE_ID: '1NUDWEyRl3a9XxQD_P32ymjXd6B9HD6HGDRpORJ734Kw',
    FOLDER_ID: '1s3qk1KNs0FQ0_uXYWBiw8r2c0P8KCp2D',
    BOT_TOKEN: getEnvVal('BOT_TOKEN'),
    PORT: getEnvVal('PORT'),
    GOOGLE_CLIENT_EMAIL: getEnvVal('GOOGLE_CLIENT_EMAIL'),
    GOOGLE_PRIVATE_KEY: getEnvVal('GOOGLE_PRIVATE_KEY'),
};
exports.MAI_FILE_ID = config.MAI_FILE_ID, exports.FOLDER_ID = config.FOLDER_ID, exports.BOT_TOKEN = config.BOT_TOKEN, exports.PORT = config.PORT, exports.GOOGLE_CLIENT_EMAIL = config.GOOGLE_CLIENT_EMAIL, exports.GOOGLE_PRIVATE_KEY = config.GOOGLE_PRIVATE_KEY;
exports.default = config;
