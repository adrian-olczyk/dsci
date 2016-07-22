var Promise = require('bluebird').Promise;
var fs = require('fs');
var stat = Promise.promisify(fs.stat);

/**
 * @param {String} dir
 * @returns {Promise.<Boolean>}
 */
function isDirectory(dir){
    return new Promise(function(resolve, reject){
        stat(dir)
            .then((stats) => resolve(stats.isDirectory()))
            .catch((err) => {
                if (err.code == 'ENOENT')
                    resolve(false);
                else
                    reject(err);
            });
    });
}

module.exports = isDirectory;