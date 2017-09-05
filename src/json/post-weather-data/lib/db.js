var AWS = require('aws-sdk');
var config = require('config');
var TTL = 1000 * 60 * 24 * 7;
var PARTITION_KEY = 'id';

var searchIndex = config.get('db').index;
var awsConfig = {
    region: config.get('aws').region,
    accessKeyId: config.get('db').user,
    endpoint: config.get('db').url,
    secretAccessKey: process.env.AWS_USER_SECRET
};

AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = function write(data, callback) {
    if (!data[PARTITION_KEY]) {
        return callback(`Missing Partition Key ${PARTITION_KEY}`);
    }
    var doc = Object.assign({ _ttl: getTtl(), _id: data[PARTITION_KEY] }, data);
    var params = {
        TableName: config.get('db').table,
        Item: doc
    };
    docClient.put(params, function (err, data) {
        if (err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

var getTtl = function () {
    return Date.now() + TTL;
}