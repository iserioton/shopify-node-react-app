/** Congfig env */
import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/server/config/.env.${process.env.NODE_ENV}` });

const config = {
    PORT: process.env.PORT,
    MODE: process.env.MODE,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOP: process.env.SHOP,
    SCOPES: process.env.SCOPES,
    SHOPIFY_API_VERSION: '/admin/api/2022-04/',
    HOST: process.env.HOST,
    TOP_LEVEL_OAUTH_COOKIE: 'shopify_top_level_oauth',
    'use-online-tokens': true,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '1440s',
    mysqlCredentials: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    }
}

export default config;