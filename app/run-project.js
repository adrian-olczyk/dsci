var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');
var Promise = require('bluebird').Promise;
var isFile = require('./helpers/is-file');
var readFile = Promise.promisify(fs.readFile);
var rmdirIfExists = require('./helpers/rmdir-if-exists');
var cloneRepository = require('./clone-repository');

function runProject(project){
    function cleanProject(project){
        return rmdirIfExists(project.dir + '/src');
    }

    function runScripts(project){
        let scripts = ['before.sh', 'build.sh', 'test.sh', 'deploy.sh'];

        function runNextScript(){
            if (scripts.length === 0)
                return Promise.resolve();

            let script = scripts.shift();
            return isFile(`${project.dir}/${script}`)
                .then((isFile) => isFile ? runScript(script).then(runNextScript) : runNextScript());
        }

        function runScript(script){
            console.log(`[${project.config.name}] running script ${script}...`);

            return readFile(`${project.dir}/${script}`)
                .then((contents) => contents.toString())
                .then((commands) => {
                    console.log(commands);

                    return new Promise(function(resolve, reject){
                        exec(commands, { cwd: project.dir  + '/src/' }, function(err, result){
                            console.log(result);

                            err ? reject(err) : resolve(result);
                        });
                    });
                });
        }

        return function(){
            return runNextScript();
        }
    }

    cleanProject(project)
        .then(cloneRepository(project))
        .then(runScripts(project))
        .catch((err) => console.error(err));
}

module.exports = runProject;