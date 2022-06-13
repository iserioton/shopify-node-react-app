import path from 'path';
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, ApiVersion } from "@shopify/shopify-api";
import routes from './route/routes.js';
import { readFileSync } from 'fs';
const { default: config } = await import('./config/index.js');


const app = express();
app.use(express.json());
app.use(cookieParser(config.SHOPIFY_API_SECRET));

/** Initialize shopify context */
Shopify.Context.initialize({
    API_KEY: config.SHOPIFY_API_KEY,
    API_SECRET_KEY: config.SHOPIFY_API_SECRET,
    SCOPES: config.SCOPES.split(","),
    HOST_NAME: config.HOST.replace(/https:\/\//, ""),
    API_VERSION: ApiVersion.April22,
    IS_EMBEDDED_APP: true,
    SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

/** All Routes,APIs */
app.use(routes);

/** Serve react files using static or via fs */
app.use(/^\/dist/, (req, res) => {
    const html = readFileSync(`${process.cwd()}/dist/index.html`);
    res.status(200).set("Content-Type", "text/html").send(html);
});
app.use('/static', express.static(path.join(process.cwd(), 'dist', 'static')));

/** 404 API */
app.use("/*", (req, res, next) => {
    res.redirect('/dist/random?' + new URLSearchParams(req.query).toString());
    /* res.status(404).set("Content-Type", "text/html").send('<p>You are looking for page in unavailable.</p>'); */
});

app.listen(config.PORT, () => console.log(`Service listen on port ${config.PORT}`));