'use strict';

var test = require('tape').test;
var sinon = require('sinon');

var index = require('../index.js');

test('test that succeed passes back json to context', function (assert) {
    assert.plan(1);

    let event = {
        path: '/ec2',
        httpMethod: 'GET',
        headers: {'Access-Control-Allow-Origin': '*'},
        queryStringParameters: 'action=start',
        body: ''
    };

    var context = { succeed: function (arg) {} };
    var spy = sinon.spy(context, "succeed");

    index.handler(event, context);

    console.log(spy.withArgs(event.payload).calledOnce);
    console.log(spy);
    console.log(event.payload);

    //assert.true(spy.withArgs(event.payload).calledOnce, "Succeed on context called with payload");
});
