import { getApiList } from "../helpers/functions.js";

async function product_count(req, res) {
    const response = await getApiList(res.client.token, res.client.shop, `products/count.json`);
    res.status(200).send(response);
}

export default product_count;