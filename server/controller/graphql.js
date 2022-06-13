import { getApiList } from "../helpers/functions.js";

async function graphql(req, res) {
    try {
        const response = await getApiList(res.client.token, res.client.shop, 'graphql.json', req.body, 'POST');
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default graphql;