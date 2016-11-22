const yeoman = require('yeoman-generator');
const yosay = require('yosay');
const camelCase = require('lodash/camelCase');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('projectName', { type: String, required: false });
        this.projectName = camelCase(this.projectName);

        this.option('serious', { alias: 's', type: Boolean }); // TODO doInstallLodash
        this.isSerious = this.options.serious;
        this.log(this.isSerious);
    },
    initializing: {
        start: function() {
            this.log('####### Initializing task has started! #######');
        },
        work: function() {
            this.username = this.config.get('username');
            this.log(this.username);
        },
        end: function() {
            this.log('####### Initializing task has finished! #######\n');
        }
    },
    prompting: function() {
        const self = this;
        self.log('####### Prompting task has started! #######');

        const questions = [
            {
                type    : 'input',
                name    : 'projectName',
                message : 'Your project name',
                default : self.projectName || self.appname // Default to current folder name
            },
            {
                type    : 'confirm',
                name    : 'doInstallLodash',
                message : 'Would you like to install lodash?'
            }
        ];

        if (!self.username) {
            questions.push({
                type    : 'input',
                name    : 'username',
                message : 'What\'s your Github username?',
                store   : true
            });
        }

        return self.prompt(questions)
            .then(function (answers) {
                self.projectName = answers.projectName;
                self.doInstallLodash = answers.doInstallLodash;
                self.username = answers.username;

                self.log('####### Prompting task has finished! #######\n');
            });
    },
    configuring: function () {
        const self = this;

        self.log('####### Configuring task has started! #######');

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
        this.log(this.templatePath('index.html'));
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(`${this.projectName}/index.html`),
            { title: `Hey, ${this.username}` }
        );

        this.log('####### Writing task has finished! #######\n');
    },
    install: function () {
        const self = this;
        self.log('####### Install task has started! #######');
        if (self.doInstallLodash) {
            self.npmInstall(['lodash'], { 'save': true }, () => self.log('####### Install task has finished! #######\n'));
        } else {
            self.log('####### Lodash have not been installed! #######');
            self.log('####### Install task has finished! #######\n');
        }
    },
    end: function () {
        this.log('####### End task has started! #######');

        this.log(yosay('I see you are about to be fucked up with this generator-shit!'));

        this.log('####### End task has finished! #######\n');
    },
    someMethod: function () {
        this.log('####### Some task has started! #######');
        this.log('####### Some task has finished! #######\n');
    }
});