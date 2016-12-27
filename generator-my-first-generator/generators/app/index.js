'use strict';

const YeomanGenerator = require('yeoman-generator');

module.exports = class extends YeomanGenerator {

    constructor(args, opts) {
        super(args, opts);

        this.someField = 'Hello, guys!';
        this.log('My first Generator: constructor');
    }

    someMethod () {
        this.log('My first Generator: someMethod');
        this.log(`My first Generator: ${this.someField}` );
    }
};
