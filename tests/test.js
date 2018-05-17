'use strict';

var test = require('unit.js');
var index = require('../index.js');

describe('Tests index', function() {
    it('verifies successful response', function(done) {
        index({}, (err, response) => {
            console.log(err)
            console.log(response)
        });
    });
});
