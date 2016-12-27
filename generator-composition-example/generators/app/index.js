'use strict';

const YeomanGenerator = require('yeoman-generator');

module.exports = class extends YeomanGenerator {

    initializing() {
        this.composeWith('composition-example:turbo');
        this.composeWith('composition-example:electric');
    }
};
