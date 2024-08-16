const fs = require('fs');
const path = require('path');

/**
 * Logs an error message with a timestamp to the specified log file.
 * @param {string} errorMessage - The error message to log.
 * @param {string} logFilePath - The path to the log file.
 */
function logError(errorMessage, logFilePath) {
    const timestamp = new Date().toISOString(); // Get the current date and time in ISO format
    const logMessage = `[${timestamp}] ${errorMessage}\n`; // Format the log message with the timestamp

    // Ensure the directory exists before writing the log file
    const logDir = path.dirname(logFilePath);
    fs.mkdirSync(logDir, { recursive: true });

    // Append the log message to the specified log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        } else {
            console.log('Error logged successfully');
        }
    });
}


module.exports = {
    logError,
};