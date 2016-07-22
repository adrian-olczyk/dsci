var Promise = require('bluebird').Promise;
var rmdir = Promise.promisify(require('rimraf'));
var isDirectory = require('./is-directory');

/**
 *
 * @param dir
 * @returns {Promise.<TResult>}
 */
function rmdirIfExists(dir){
    return isDirectory(dir)
        .then((directoryExists) => {
            if (directoryExists)
                return rmdir(dir);
        });
}

module.exports = rmdirIfExists;