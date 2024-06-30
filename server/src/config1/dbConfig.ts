const Pool = require('pg').Pool;

export const pool = new Pool({
    user: 'postgresdb',
    host: 'superauto_db',
    database: 'superauto_db',
    password: 'root',
    port: 5432
})
