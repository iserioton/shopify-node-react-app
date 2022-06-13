import { query } from '../helpers/db_functions.js';

async function checkInstallation(req, res, next) {
    const { shop } = req.query;
    if (shop && /[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com[\/]?/.test(shop)) {
        let sql = `SELECT * FROM client_stores WHERE shop='${shop}' AND install_status = '1'`;
        let shopDetails = await query(sql);
        if (shopDetails?.length) {
            return next();
        }
        return res.redirect(`/auth?${new URLSearchParams(req.query).toString()}`);
    } else {
        return res.status(400).set("Content-Type", "text/html").send('<p>Invalid shop name.</p>');
    }
}

export default checkInstallation;