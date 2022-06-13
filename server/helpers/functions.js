import { shopify_call } from "http-call";
import config from '../config/index.js';

function getApiList(token, shop, endpoint, query = false, method = 'GET', header = false) {
    return shopify_call(token, shop, `${config.SHOPIFY_API_VERSION}${endpoint}`, query, method, header);
}

export {
    getApiList
}