var os = require('os');
var Git = require('nodegit');

var cloneOptions = {
    fetchOpts: {
        callbacks: {
            certificateCheck: function () {
                return 1;
            },
            credentials: function (link, username) {
                var pubPath = os.homedir() + '/.ssh/id_rsa.pub';
                var prvPath = os.homedir() + '/.ssh/id_rsa';
                var passPhr = '';

                return Git.Cred.sshKeyNew(username, pubPath, prvPath, passPhr);
            }
        }
    }
};

function cloneRepository(project) {
    return function(){
        console.log(`[${project.config.name}] cloning repository...`);
        return Git.Clone(project.config.repository,
            project.dir + '/src',
            cloneOptions)
            .then(() => console.log(`[${project.config.name}] repository successfully cloned`));
    }
}

module.exports = cloneRepository;