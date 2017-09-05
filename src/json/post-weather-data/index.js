var arc = require('@architect/functions');
var db = require('./lib/db');

function route(req, res) {
  db(req.body, function (err, response) {
    if (err) {
      res({
        json: err.message || err,
        status: 500
      })
    }
    else {
      res({
        json: "OK"
      })
    }
  });
}

var parseBody = function (body) {
  var parsedBody = null;
  if (typeof body === 'string') {
    try {
      parsedBody = JSON.parse(body);
    }
    catch (e) { }
  }

  return parsedBody;
}

exports.handler = arc.json.post(route)
