/**
 * @var
 */
const connections = {
    mysql: {
        driver: 'mysql',
        url: '',
        host: process.env.DB_HOST||'127.0.0.1',
        port: process.env.DB_PORT||'3306',
        database: process.env.DB_DATABASE||'viecoi_db',
        username: process.env.DB_USERNAME||'root',
        password: process.env.DB_PASSWORD||'',
        unix_socket: '',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        prefix: '',
        prefix_indexes: true,
        strict: false,
        engine: null,
        options: new Array(),
    },
    mysql_sync: {
        driver: 'mysql',
        url: '',
        host: process.env.SYNC_DB_HOST||'127.0.0.1',
        port: process.env.SYNC_DB_PORT||'3306',
        database: process.env.SYNC_DB_DATABASE||'viecoi_db',
        username: process.env.SYNC_DB_USERNAME||'root',
        password: process.env.SYNC_DB_PASSWORD||'',
        unix_socket: '',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        prefix: '',
        prefix_indexes: true,
        strict: false,
        engine: null,
        options: new Array(),
    }
};

module.exports = {connections};