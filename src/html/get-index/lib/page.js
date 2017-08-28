var getData = require('./data');

module.exports = function () {
    getData(function (err, data) {
        if (err) {
            return getPage({ body: 'Error Fetching Data. My bad.' })
        }
        else {
            return getPage({ body: JSON.stringify(data) })
        }
    })
}
var style =
    `
        body { 
            background-color: #222f35; 
            color: #4bd000;
            font-family: sans-serif
        }
    `
var getPage = function (config) {
    `
        <html>
            <head>
                <style>${style}</style>
            </head>
            <body>${config.body}</body>
        </html>
    `
}