var Promise = require('bluebird').Promise;
var fs = require('fs');
var stat = Promise.promisify(fs.stat);

/**
 * @param {String} file
 * @returns {Promise.<Boolean>}
 */
function isFile(file){
    return new Promise(function(resolve, reject){
        stat(file)
            .then((stats) => resolve(stats.isFile()))
            .catch((err) => {
                if (err.code == 'ENOENT')
                    resolve(false);
                else
                    reject(err);
            });
    });
}

module.exports = isFile;