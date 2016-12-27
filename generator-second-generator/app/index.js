'use strict';

const YeomanGenerator = require('yeoman-generator');
const yosay = require('yosay');
const camelCase = require('lodash/camelCase');

module.exports = class extends YeomanGenerator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('projectName', { type: String, required: false });
        this.projectName = camelCase(this.options.projectName);

        this.option('lodash', { alias: 'l', type: Boolean });
        this.doInstallLodash = this.options.lodash;
    }

    initializing() {
        this.log('####### Initializing task has started! #######');

        this.username = this.config.get('username');
        this.log(this.username);

        this.log('####### Initializing task has finished! #######\n');
    }

    prompting() {
        const self = this;
        self.log('####### Prompting task has started! #######');

        const questions = [];

        if (!self.projectName) {
            questions.push({
                type    : 'input',
                name    : 'projectName',
                message : 'Your project name',
                default : self.projectName || self.appname // Default to current folder name
            });
        }

        if (!self.doInstallLodash) {
            questions.push({
                type    : 'confirm',
                name    : 'doInstallLodash',
                message : 'Would you like to install lodash?',
                store   : true
            });
        }

        if (!self.username) {
            questions.push({
                type    : 'input',
                name    : 'username',
                message : 'What\'s your Github username?'
            });
        }

        return self.prompt(questions)
            .then(function (answers) {
                self.projectName = answers.projectName || self.projectName;
                self.doInstallLodash = answers.doInstallLodash || self.doInstallLodash;
                self.username = answers.username || self.username;

                self.log('####### Prompting task has finished! #######\n');
            });
    }

    configuring() {
        const self = this;

        self.log('####### Configuring task has started! #######');

        if (self.username) {
            self.config.set('username', self.username);
        }

        self.log('####### Configuring task has finished! #######\n');
    }

    default() {
        this.log('####### Default task has started! #######');
    }

    writing() {
        this.log('####### Writing task has started! #######');
        this.log(this.templatePath('index.html'));
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(`${this.projectName}/index.html`),
            { title: `Hey, ${this.username}!` }
        );

        this.log('####### Writing task has finished! #######\n');
    }

    install() {
        const self = this;
        self.log('####### Install task has started! #######');
        if (self.doInstallLodash) {
            self.npmInstall(['lodash'], { 'save': true },
                () => self.log('####### Install task has finished! #######\n'));
        } else {
            self.log('####### Lodash have not been installed! #######');
            self.log('####### Install task has finished! #######\n');
        }
    }

    end() {
        this.log('####### End task has started! #######');

        this.log(yosay('See ya later, guys!'));

        this.log('####### End task has finished! #######\n');
    }

    someMethod() {
        this.log('####### Some task has started! #######');
        this.log('####### Some task has finished! #######\n');
    }
};