import jwt from 'jsonwebtoken';
import { query } from '../helpers/db_functions.js';
const { default: config } = await import('../config/index.js');

async function verifyRequest(req, res, next) {
    try {
        let shop = req.query.shop;
        const authHeader = req.headers?.authorization || '';
        const matches = authHeader?.match(/Bearer (.*)/);

        const verifyed = jwt.verify(matches[1], config.SHOPIFY_API_SECRET);
        if (verifyed.dest) {
            verifyed.dest = verifyed.dest.replace('https://', '');
            let sql = `SELECT * FROM client_stores WHERE shop='${verifyed.dest}' AND install_status = '1'`;
            let shopDetails = await query(sql);
            if (shopDetails?.length) {
                res.client = shopDetails[0];
                return next();
            }
        }
        res.status(403);
        res.header("X-Shopify-API-Request-Failure-Reauthorize", "1");
        res.header("X-Shopify-API-Request-Failure-Reauthorize-Url", `/auth?shop=${shop}`);
        return res.redirect(`/auth?shop=${shop}`);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

export default verifyRequest