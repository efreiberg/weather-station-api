var arc = require('@architect/functions');
var db = require('./lib/db');
var resource = 'luxmeter';

function route(req, res) {
  db(resource, req.query, function (err, response) {
    if (err) { return res.status(500).json(err.message || err); }
    res({
      json: { items: response }
    })
  })
}

exports.handler = arc.json.get(route);