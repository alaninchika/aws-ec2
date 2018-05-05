'use strict';

const AWS   = require('aws-sdk');
const axios = require('axios');
const qs    = require('querystring');

const startEC2Server = (instancesId, cb) => {
    cb(null, {data: 'Hello World'});
};

const stopEC2Server = (instancesId, cb) => {
    cb(null, {data: 'Hello World'});
};

const statusEC2Server = (instancesId, cb) => {

    let ec2 = new AWS.EC2();

    let params = {
        InstanceIds: [
            instancesId
        ]
    };

    ec2.describeInstanceStatus(params, function(err, data) {
        if (err) {
            console.log(err);
            cb(err, []);
        } else {

            let results = {};

            if(data && data.InstanceStatuses.length){
                results = {
                    id: data.InstanceStatuses[0].InstanceId,
                    CurrentState: data.InstanceStatuses[0].InstanceState.Name
                };
            } else {
                results = {
                    CurrentState: 'stopped'
                };
            }

            cb(null, results);
        }
    });
};

const buildResponse = (err, results, cb) => {
    let response = {
        statusCode: 500,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({error: 'application error' , data: err})
    };

    if (!err) {
        response.statusCode = 200;
        response.body = JSON.stringify({data: results});
    }

    cb(response);
};

exports.handler = (event, context) => {
    if (!event.queryStringParameters) {
        buildResponse(null, [], context.succeed);
    } else if (event.queryStringParameters.hasOwnProperty('action') &&
        event.queryStringParameters.hasOwnProperty('reference')
    ) {
        let instancesId = event.queryStringParameters.reference;

        switch (event.queryStringParameters.action) {
            case 'start':
                startEC2Server(instancesId, (err, results) => {
                        buildResponse(err, results, context.succeed);
                    }
                );
                break;
            case 'stop':
                stopEC2Server(instancesId, (err, results) => {
                        buildResponse(err, results, context.succeed);
                    }
                );
                break;
            default:
                statusEC2Server(instancesId, (err, results) => {
                        buildResponse(err, results, context.succeed);
                    }
                );
        }
    } else {
        buildResponse(null, [], context.succeed);
    }
};
