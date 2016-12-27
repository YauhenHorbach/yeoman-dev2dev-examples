'use strict';

const YeomanGenerator = require('yeoman-generator');

module.exports = class extends YeomanGenerator {
    prompting() {
        this.log('prompting - electric');
    }

    writing() {
        this.log('writing - electric');
    }
};
