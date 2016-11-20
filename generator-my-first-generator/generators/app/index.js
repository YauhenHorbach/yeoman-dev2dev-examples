const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.someField = 'Hello, guys!';
        this.log('My first Generator: constructor');
    },
    someMethod: function () {
        this.log('My first Generator: someMethod');
        this.log(`My first Generator: ${this.someField}` );
    }
});