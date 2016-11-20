const yeoman = require('yeoman-generator');
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
            this.log('####### Initializing task has finished! #######');
        }
    },
    prompting: {
        start: function() {
            this.log('####### Prompting task has started! #######');
        },
        work: function() {
            this.log('Prompting!')
        },
        end: function() {
            this.log('####### Prompting task has finished! #######');
        }
    }
});