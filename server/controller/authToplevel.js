import { Shopify } from "@shopify/shopify-api";
import config from '../config/index.js';
import topLevelAuthRedirect from "../helpers/top-level-auth-redirect.js";

function authToplevel(req, res) {
    res.cookie(config.TOP_LEVEL_OAUTH_COOKIE, "1", {
        signed: true,
        httpOnly: true,
        sameSite: "strict",
    });

    res.set("Content-Type", "text/html").send(
        topLevelAuthRedirect({
            apiKey: Shopify.Context.API_KEY,
            hostName: Shopify.Context.HOST_NAME,
            host: req.query.host,
            query: req.query,
        })
    );
}

export default authToplevel;