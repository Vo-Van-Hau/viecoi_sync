const mysql = require('mysql2');
const Sequelize = require('sequelize');
const {connections} = require('../config/database');

// TODO:
const sequelizeDB = new Sequelize(connections.mysql.database, connections.mysql.username, connections.mysql.password, {
    host: connections.mysql.host,
    dialect: connections.mysql.driver, // Use the appropriate dialect for your database
    define: {
        timestamps: false,
    }
});
sequelizeDB
.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

// TODO:
const sequelizeSyncDB = new Sequelize(connections.mysql_sync.database, connections.mysql_sync.username, connections.mysql_sync.password, {
    host: connections.mysql_sync.host,
    dialect: connections.mysql_sync.driver, // Use the appropriate dialect for your database
    define: {
        timestamps: false,
    }
});
sequelizeSyncDB
.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

/**
 * @todo Create the connection pool. The pool-specific settings are the defaults
 */
const poolDB = mysql.createPool({
    host: connections.mysql.host,
    user: connections.mysql.username,
    database: connections.mysql.database,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

/**
 * @todo
 */
module.exports = {
    sequelizeDB, 
    sequelizeSyncDB,
    poolDB,
}