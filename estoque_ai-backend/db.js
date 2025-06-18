const pgp = require('pg-promise')

const username = "username";
const password = "12345678";
const host = "";
const port = "";
const database = "estoque_ai_db" ;

const db = pgp(`postgres://${username}:${password}@${host}:${port}/${database}`);

