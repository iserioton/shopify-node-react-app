import { Shopify } from "@shopify/shopify-api";
import config from "../config/index.js";
import { query } from '../helpers/db_functions.js';
import { getApiList } from "../helpers/functions.js";

async function authCallback(req, res) {
    try {
        const session = await Shopify.Auth.validateAuthCallback(
            req,
            res,
            req.query
        );

        const host = req.query.host;

        let sql = `INSERT INTO client_stores(shop,token) VALUES('${session.shop}','${session.accessToken}') ON DUPLICATE KEY UPDATE token = '${session.accessToken}', install_status = '1';`;
        query(sql);

        const webhhoks = {
            'app/uninstalled': `${config.HOST}/webhook/app-unistall`,
            'products/create': `${config.HOST}/webhook/product-create`,
            'products/update': `${config.HOST}/webhook/product-update`
        }

        Object.keys(webhhoks).forEach(webhook => {
            let query = {
                'webhook': {
                    'topic': webhook,
                    'address': webhhoks[webhook],
                    'format': 'json'
                }
            }
            getApiList(session.accessToken, session.shop, 'webhooks.json', query, 'POST');
        })

        /** Redirect to app with shop parameter upon auth */
        return res.redirect(`/dist/?shop=${session.shop}&host=${host}`);
    } catch (e) {
        switch (true) {
            case e instanceof Shopify.Errors.InvalidOAuthError:
                res.status(400);
                res.send(e.message);
                break;
            case e instanceof Shopify.Errors.CookieNotFound:
            case e instanceof Shopify.Errors.SessionNotFound:
                // This is likely because the OAuth session cookie expired before the merchant approved the request
                res.redirect(`/auth?shop=${req.query.shop}`);
                break;
            default:
                res.status(500);
                res.send(e.message);
                break;
        }
    }
}

export default authCallback;