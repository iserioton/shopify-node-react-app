import { Shopify } from "@shopify/shopify-api";
import config from '../config/index.js';

async function auth(req, res) {
    if (!req.signedCookies[config.TOP_LEVEL_OAUTH_COOKIE]) {
        return res.redirect(`/auth/toplevel?${new URLSearchParams(req.query).toString()}`
        );
    }

    const redirectUrl = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/callback",
        config["use-online-tokens"]
    );

    res.redirect(redirectUrl);
}

export default auth;