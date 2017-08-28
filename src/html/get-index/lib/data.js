var request = require('request');
var config = require('config');

module.exports = function (callback) {
    var apiConfig = config.get('api');
    var url = apiConfig.url + apiConfig.dataEndpoint;

    request({
        uri: url,
        json: true,
        method: 'GET'
    }, function (error, response, body) {
        if(err){
            callback(err);
        }
        else {
            callback(null, body);
        }
    })
}