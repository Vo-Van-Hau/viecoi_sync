require('./index');
const { logError } = require('./app/log.js');
const vHelper = require('./vHelper.js');
//
const { QueryTypes } = require('sequelize');


// =======================================================================
// ============================APP LOGIC==================================
// =======================================================================
const sequelize = global.sequelizeDB;
const sequelizeSync = global.sequelizeSyncDB;
// 
const viecoiTables = require('./constants/viecoi_tables.js');

// =======================================================================
// ============================FUNCTIONS==================================
// =======================================================================
/**
 * Retrieves all data from the specified table in the database.
 * @param {string} tableName - The name of the table to fetch data from.
 * @returns {Promise<Array<Object>>} The array of records as objects.
 */
async function handleTableData(tableName) {
    try {
        const fetchData = await sequelize.query(`SELECT * FROM \`${tableName}\``, {
            type: QueryTypes.SELECT,
        });
        return fetchData;
    } 
    catch (error) {
        console.error(`Error occurred while fetching data for table: ${tableName}`);
        logError(error + ` => FROM ${tableName}`, 'logs/error.log');
    }
}

/**
 * Inserts data into the specified table in the target database.
 * @param {string} sourceTable - The name of the source table to fetch data from.
 * @param {string} targetTable - The name of the target table to insert data into.
 */
async function syncTableData(sourceTable, targetTable, options = {}) {
    try {
        const { isTruncated, sourceTableKey } = options;
        const data = await handleTableData(sourceTable);
        // Check if data is available and is an array
        if(data && Array.isArray(data)) {
            // TODO: Truncate the target table before inserting new data
            if(isTruncated) {
                await sequelizeSync.query(`TRUNCATE TABLE \`${targetTable}\``, {
                    type: QueryTypes.RAW,
                });
            }
            // TODO: Insert data into the target table
            for(let item of data) {
                // TODO: Clean data items before inserting into the target database
                if(item) {
                    if(vHelper.CLEAN_FUNCTIONS[`getCleanData_${sourceTableKey}`]) {
                        item = vHelper.CLEAN_FUNCTIONS[`getCleanData_${sourceTableKey}`](item);
                    }
                }

                // Get column names and corresponding values dynamically
                const columns = Object.keys(item)
                .map(column => `\`${column}\``) // Escape column names
                .join(', '); // Join column names with a comma
                const values = Object.values(item);
                const placeholders = values.map(() => '?').join(', '); // Create placeholders for query

                // TODO: Insert data into the target database
                await sequelizeSync.query(
                    `INSERT INTO \`${targetTable}\` (${columns}) VALUES (${placeholders})`,
                    {
                        replacements: values,
                        type: QueryTypes.INSERT,
                    }
                );
            }
        }
    }
    catch (error) {
        console.error(`Error occurred while syncing data for table: ${sourceTable}`);
        logError(error + ` => FROM ${sourceTable}`, 'logs/error.log');
    }
}


// =======================================================================
// ==========================EXECUTION LOGIC=============================
// =======================================================================
for(const table in viecoiTables) {
    // TODO:
    const { isSynced, isTruncated, sourceTable, targetTable } = viecoiTables[table];
    // TODO:
    if(!isSynced) {
        // console.log(`Table: ${sourceTable.name} is not permissioned for syncing data`); 
        continue;
    }   
    syncTableData(
        sourceTable.name, 
        targetTable.name, 
        { 
            isTruncated,
            sourceTableKey: table, 
        }
    )
    .then(() => {
        console.log(`Data synced successfully for table: ${sourceTable.name}`);
    })
    .catch((error) => {
        console.error(`Error occurred while syncing data for table: ${sourceTable.name}`);
        logError(error, 'logs/error.log');
    });
}

// Exit the process with a failure code
// process.exit(1);