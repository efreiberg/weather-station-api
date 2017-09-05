var request = require('request');
var config = require('config');

module.exports = function (callback) {
    var apiConfig = config.get('api');
    var url = apiConfig.url + apiConfig.dataEndpoint;

    request({
        uri: url,
        json: true,
        method: 'GET',
        qs: {
            limit: 1
        }
    }, function (error, response, body) {
        if(error){
            callback(error);
        }
        else {
            callback(null, body);
        }
    })
}