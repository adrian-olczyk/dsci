var fs = require('fs');
var _ = require('lodash');
var Promise = require('bluebird').Promise;
var readDir = Promise.promisify(fs.readdir);
var isFile = require('./helpers/is-file');
var readJSONFile = Promise.promisify(require('jsonfile').readFile);

/**
 *
 * @param {String} rootProjectsDir
 * @returns {Promise.<*[]>}
 */
function detectProjectsInDirectory(rootProjectsDir) {
    return readDir(rootProjectsDir)
        .then((projectsDirs) => {
            return Promise.all(projectsDirs.map(
                parseProjectDir(rootProjectsDir)
            ));
        })
        .then(_.compact);
}

/**
 *
 * @param rootDir
 * @returns {Function}
 */
function parseProjectDir(rootDir) {
    return function (projectDir) {
        return isFile(`${rootDir}/${projectDir}/config.json`)
            .then((configExists) => {
                if (configExists)
                    return readJSONFile(`${rootDir}/${projectDir}/config.json`);
            })
            .then((config) => {
                if (config)
                    return {
                        dir: `${rootDir}/${projectDir}`,
                        config: config
                    };
            });
    };
}

module.exports = detectProjectsInDirectory;