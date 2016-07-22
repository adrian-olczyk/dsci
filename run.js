var getProjects = require('./app/detect-projects-in-directory');
var runProject = require('./app/run-project');
var _ = require('lodash');

if (process.argv.length < 3){
    console.log('Usage: node run.js <project-name>');
    process.exit();
}

var projectName = process.argv[2];

getProjects('./projects')
    .then((projects) => {
        var project = _.find(projects, (project) => project.config.name === projectName);

        if (!project)
            throw new Error(`Project "${projectName}" not found`);

        runProject(project);
    })
    .catch(console.error);
