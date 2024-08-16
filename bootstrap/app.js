var fs = require('fs');
/**
 * @author: <developer-team@world.com>
 * @todo:
 * @param 
 * @return {JSON}
 */
function autoload() {
    try {
        const data = JSON.parse(fs.readFileSync('./bootstrap/package.json', 'utf8'));
        const { autoload } = data;
        /**
         * @todo: Autoload files
         */
        if(autoload['files']) {
            autoload['files'].forEach(function(file) {
                let modules = require('../' + file);
                if(modules) {
                    for(const module in modules) {
                        global[module] = modules[module];
                    }                  
                }
            });
        }
    } catch (error) {console.error(error);}
}

module.exports = {autoload};