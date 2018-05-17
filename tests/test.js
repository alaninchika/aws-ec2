'use strict';

var test = require('tape').test;
var sinon = require('sinon');

var index = require('../index.js');

test('test that succeed passes back json to context', function (assert) {
    assert.plan(1);

    var event = {
        "operation" : "succeed",
        "payload" : {
            "value1" : "some value 1",
            "value2" : "some value 2"
        }
    };

    var context = { succeed: function (arg) {} };
    var spy = sinon.spy(context, "succeed");

    index.handler(event, context);

    assert.true(spy.withArgs(event.payload).calledOnce, "Succeed on context called with payload");
});
