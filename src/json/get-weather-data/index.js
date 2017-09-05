var arc = require('@architect/functions');
var db = require('./lib/db');

function route(req, res) {
  db(req.query || {}, function (err, response) {
    if (err) {
      res({
        json: err.message || err,
        status: 500
      })
    }
    else {
      res({
        json: { items: response }
      })
    }
  })
}

exports.handler = arc.json.get(route);