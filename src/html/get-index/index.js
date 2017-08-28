var arc = require('@architect/functions')

function route(req, res) {
  res({html:`Hello Lisa`})
}

exports.handler = arc.html.get(route)
