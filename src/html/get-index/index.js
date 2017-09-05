var arc = require('@architect/functions');
var page = require('./lib/page');

function route(req, res) {
  page(function (err, content) {
    res({ html: content })
  });
}

exports.handler = arc.html.get(route)
