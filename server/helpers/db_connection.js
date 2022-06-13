import mysql from "mysql";
import config from '../config/index.js';

const conn = mysql.createPool(config.mysqlCredentials);

export default conn;