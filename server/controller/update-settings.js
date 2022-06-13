import { query } from '../helpers/db_functions.js';

async function update_settings(req, res) {
    const { app_status } = req.body;
    const settings = await query(`UPDATE client_stores set app_status='${app_status}' where shop='${res.client.shop}';`);
    if (settings?.affectedRows) {
        return res.status(200).send({ status: 200, data: settings });
    }
    res.status(204).send([]);
}

export default update_settings;