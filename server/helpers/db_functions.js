import conn from './db_connection.js';

function query(sql, val = []) {
    return new Promise(resolve => {
        try {
            conn.query(sql, val, (err, dbData) => {
                if (err) {
                    // geerate logs here
                    console.log('\nerr', err);
                    return resolve(false);
                }
                return resolve(dbData);
            })
        } catch (error) {
            resolve(false);
        }
    })
}

export {
    query
}