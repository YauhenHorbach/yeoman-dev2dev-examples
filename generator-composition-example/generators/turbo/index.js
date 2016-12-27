'use strict';

const YeomanGenerator = require('yeoman-generator');

module.exports = class extends YeomanGenerator {
    prompting() {
        this.log('prompting - turbo');
    }

    writing() {
        this.log('writing - turbo');
    }
};
