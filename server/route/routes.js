import express from 'express';
import verifyRequest from '../middleware/verify-request.js';
import checkInstallation from '../middleware/checkInstallation.js';
import { auth, authToplevel, authCallback, product_count, graphql, get_settings, update_settings } from '../controller/index.js';
import * as webhooks from '../webhooks/index.js';

const router = express.Router();

/** Installation process */
router.get('/auth', auth);
router.get('/auth/toplevel', authToplevel);
router.get('/auth/callback', authCallback);

/** Webhooks */
router.use('/webhook/app-unistall', webhooks.appUnistall);
router.use('/webhook/product-create', webhooks.productCreate);
router.use('/webhook/product-update', webhooks.product_update);

/** Shopify session verified APIs */
router.get('/products-count', verifyRequest, product_count);
router.get('/get-settings', verifyRequest, get_settings);
router.post('/update-settings', verifyRequest, update_settings);
router.post('/graphql', verifyRequest, graphql);

/** Check app install or not for dist request. Keep this route last. */
router.use(/^\/dist/, checkInstallation, (req, res, next) => {
    /** Set origin,frame header for open ui in shopify frame */
    const shop = req.query.shop || 'Un-available shop';
    res.setHeader("Content-Security-Policy", `frame-ancestors https://${shop} https://admin.shopify.com;`);
    next();
});

export default router;