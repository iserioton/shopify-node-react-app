import { query } from '../helpers/db_functions.js';

async function app_unistall(req, res) {
    const { domain: shop } = req.body;
    console.log('\app uninstall',shop);
    let sql = `UPDATE client_stores set install_status = '0', app_status = '0' where shop = '${shop}'`;
    query(sql);
    res.send('OK')
}

export default app_unistall;