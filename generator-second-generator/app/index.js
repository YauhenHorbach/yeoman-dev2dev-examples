const yeoman = require('yeoman-generator');
const yosay = require('yosay');
const fs = require('fs');
const StringDecoder = require('string_decoder').StringDecoder;

module.exports = yeoman.Base.extend({
    initializing: {
        start: function() {
            this.log('####### Initializing task has started! #######');
        },
        work: function() {
            try {
                const decoder = new StringDecoder('utf8');
                const buffer = fs.readFileSync('package.json');

                this.log(decoder.write(buffer));
            }
            catch (err) {
                this.log('package.json not found');
            }
        },
        end: function() {
            this.log('####### Initializing task has finished! #######\n');
        }
    },
    prompting: function() {
        const self = this;
        self.log('####### Prompting task has started! #######');

        return self.prompt([
            {
                type    : 'input',
                name    : 'projectName',
                message : 'Your project name',
                default : this.appname // Default to current folder name
            },
            {
                type    : 'confirm',
                name    : 'cool',
                message : 'Would you like to enable the Cool feature?'
            },{
                type    : 'input',
                name    : 'username',
                message : 'What\'s your Github username?',
                store   : true
            }
        ]).then(function (answers) {
            this.projectName = answers.projectName;
            this.cool = answers.cool;
            this.username = answers.username;

            this.log(answers.projectName);
            this.log(answers.cool);
            this.log(answers.username);
            this.log('####### Prompting task has finished! #######\n');
        }.bind(this));
    },
    configuring: function () {
        const self = this;

        self.log('####### Configuring task has started! #######');
        self.log(self.config.get('projectName'));
        self.log(self.config.get('username'));

        self.config.set('projectName', self.projectName);
        self.config.set('username', self.username);

        self.log('####### Configuring task has finished! #######\n');
    },
    default: {
        start: function () {
            this.log('####### Default task has started! #######');

        },
        finish: function () {
            this.log('####### Default task has started! #######\n');

        }
    },
    writing: function () {
        this.log('####### Writing task has started! #######');
        this.log('####### Writing task has finished! #######\n');
    },
    someMethod: function () {
        this.log('####### Some task has started! #######');
        this.log('####### Some task has finished! #######\n');
    },
    install: function () {
        this.log('####### Install task has started! #######');

        this.npmInstall(['lodash'], { 'save': true });

        this.log('####### Install task has finished! #######\n');
    },
    end: function () {
        this.log('####### End task has started! #######');

        this.log(yosay('I see you are about to be fucked up with this shit!'));

        this.log('####### End task has finished! #######\n');
    }
});