var AWS = require('aws-sdk');
var config = require('config');
var DEFAULT_RESPONSE_SIZE = 10;
var MAX_RESPONSE_SIZE = 100;

var searchIndex = config.get('db').index;
var awsConfig = {
    region: config.get('aws').region,
    accessKeyId: config.get('db').user,
    endpoint: config.get('db').url,
    secretAccessKey: process.env.AWS_USER_SECRET
};

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();


module.exports = function query(query, callback) {
    let limit = query.limit || DEFAULT_RESPONSE_SIZE;
    if (limit > MAX_RESPONSE_SIZE) {
        limit = MAX_RESPONSE_SIZE;
    }
    var params = {
        TableName: config.get('db').table,
        Limit: limit,
        ScanIndexForward: false,
        KeyConditionExpression: `deviceId=:a`,
        ExpressionAttributeValues: {
            ":a": config.get('device').id
        }
    };
    
    docClient.query(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err);
        } else {
            callback(null, data.Items);
        }
    });
}