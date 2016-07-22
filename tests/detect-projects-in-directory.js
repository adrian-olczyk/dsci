var assert = require('chai').assert;
var detectProjectsInDirectory = require('../app/detect-projects-in-directory');

var expectedProjectStructure = [{
    dir: 'tests/projects/test1',
    config: {
        name: 'test1',
        repository: 'https://github.com/stevemao/left-pad.git'
    }
},{
    dir: 'tests/projects/test2',
    config:{
        name: 'test2',
        repository: 'https://github.com/stevemao/left-pad.git'
    }
}];

describe('detect-projects-in-directory.js', function(){
    it('should get expected project structure', function(done){
        detectProjectsInDirectory('tests/projects')
            .then((projects) => {
                assert.deepEqual(projects, expectedProjectStructure);
                done();
            })
            .catch(done);
    });
});
