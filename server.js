var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var getProjects = require('./app/detect-projects-in-directory');
var runProject = require('./app/run-project');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    res.end('Dead Simple CI');
});

app.post('/gh/hook', function (req, res) {
    var repository = req.body.repository || {};

    getProjects('projects').then((projects) => {
        projects.forEach((project) => {
            if (project.config.name === repository.full_name)
                runProject(project);
        });
    });

    res.end('OK');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Dead Simple CI listening on port %s!', process.env.PORT || 3000);
});
