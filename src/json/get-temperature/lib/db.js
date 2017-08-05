var elasticsearch = require('elasticsearch');
var httpAwsEs = require('http-aws-es');
var config = require('config');
var DEFAULT_RESPONSE_SIZE = 10;
var MAX_RESPONSE_SIZE = 100;

var db = new elasticsearch.Client({
    host: config.get('db').host,
    connectionClass: httpAwsEs,
    amazonES: {
        region: config.get('aws').region,
        accessKey: config.get('db').user,
        secretKey: process.env.AWS_USER_SECRET
    }
});
var searchIndex = config.get('db').index;

module.exports = function query(resource, query, callback) {
    let size = query.size || DEFAULT_RESPONSE_SIZE;
    if (size > MAX_RESPONSE_SIZE) {
        size = MAX_RESPONSE_SIZE;
    }
    let offset = query.offset || 0;
    db.search({
        index: searchIndex,
        _source: ['time', resource],
        size: size,
        from: offset,
        body: {
            query: {
                "match_all": {}
            }
        },
        sort: ["time:desc"]
    }, (err, response) => {
        if (err) { return callback(err) }
        callback(null, response.hits.hits.map((entry) => entry._source));
    });
}