module.exports = require('yeoman-generator').Base.extend({
    'initializing' : function () {
        this.composeWith('composition-example:turbo');
        this.composeWith('composition-example:electric');
    }
});