const elasticsearch = require('elasticsearch');
const httpAwsEs = require('http-aws-es');
const config = require('config');
const DEFAULT_RESPONSE_SIZE = 10;
const MAX_RESPONSE_SIZE = 100;

module.exports = class DbService {
    constructor() {
        this.db = new elasticsearch.Client({
            host: config.get('db').host,
            connectionClass: httpAwsEs,
            amazonES: {
                region: config.get('aws').region,
                accessKey: config.get('db').user,
                secretKey: process.env.AWS_USER_SECRET
            }
        });
        this.searchIndex = config.get('db').index;
    }
    onInit(LoggerService, callback) {
        this.logger = LoggerService;
        this.db.ping({}, (error) => {
            if (error) {
                this.logger.error(`Error connecting to db: ${JSON.stringify(error)}`)
            } else {
                this.logger.debug('Connected To DB');
            }
            callback(error);
        });
    }

    query(resource, query, callback) {
        let size = query.size || DEFAULT_RESPONSE_SIZE;
        if (size > MAX_RESPONSE_SIZE) {
            size = MAX_RESPONSE_SIZE;
        }
        let offset = query.offset || 0;
        this.db.search({
            index: this.searchIndex,
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

    _buildQuery(qString) {

    }
}