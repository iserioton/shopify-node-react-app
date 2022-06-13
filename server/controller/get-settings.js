import { query } from '../helpers/db_functions.js';

async function get_settings(req, res) {
    const settings = await query(`SELECT app_status,shop FROM client_stores where shop='${res.client.shop}';`);
    if (settings?.length) {
        return res.status(200).send({ status: 200, data: settings[0] });
    }
    res.status(204).send([]);
}

export default get_settings;