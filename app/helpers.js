const path = require('path');
const fs = require('fs');
const {
    glob,
    globSync,
    globStream,
    globStreamSync,
    Glob,
} = require('glob');
const moment = require('moment');

/**
 * @author: <developer-team@world.com>
 * @todo:
 * @param pattern
 * @return {JSON}
 */
const getDirectories = (pattern) => {
    const result = fs.readdirSync(pattern).filter(file => {
        const itemPath = `${pattern}/${file}`;
        const stats = fs.statSync(itemPath);
        if(stats.isDirectory()) return file;
    });
    return result;
};

/**
 * @author: <developer-team@world.com>
 * @todo:
 * @param 
 * @return {JSON}
 */
const getConfig = (name = '') => {

}

/**
 * @author: <developer-team@world.com>
 * @todo:
 * @param 
 * @return {JSON}
 */
function getTimeFromNow(timestamp) {
    if(!moment.isMoment(timestamp)) {
        // Handle non-moment objects by converting them to a moment object
        timestamp = moment(timestamp);
    }
    return timestamp.fromNow();
}

module.exports = {
    getDirectories, getConfig, getTimeFromNow,
}