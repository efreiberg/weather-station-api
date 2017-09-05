var getData = require('./data');

module.exports = function (callback) {
    getData(function (err, data) {
        if (err) {
            callback(null, getPage({ body: 'Error Fetching Data. My bad.' }))
        }
        else {
            callback(null, getPage({ body: getDataBody(data.items[0] || null) }))
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

        .data-container {
            display: flex;
            flex-wrap: wrap;
        }

        .pressure-container, .humidity-container,  .temp-container, .time-container, .lux-container {
            margin-bottom: 20px;
        }

        .temp-container {
            flex: 0 1 100%;
            font-size: 250px;
            text-align: center;
            padding: 20px 0px 20px 0px;
        }

        .pressure-container, .humidity-container, .lux-container {
            flex: 0 1 100%;
            font-size: 50px;
            text-align: center;
        }

        .time-container {
            flex: 0 1 100%;
            font-size: 30px;
            text-align: center;
        }

        .no-data{
            text-align: center;
            margin-top: 50px;
            font-size: 100px;
        }
    `
var getPage = function (config) {
    return `
        <html>
            <head>
                <style>${style}</style>
            </head>
            <body>${config.body}</body>
        </html>
    `
}

var getDataBody = function (data) {
    if (!data) {
        return `<div class="no-data">No Data!</div>`
    }
    var temp = (data.temp || {}).ambient,
        pressure = (data.barometer || {}).pressure,
        humidity = (data.humidity || {}).humidity,
        lux = (data.luxmeter || {}).lux,
        time = new Date(data.time),
        timeOptions = {
            timeZone: 'America/Chicago'
        };
    return `
        <div class="data-container">
            <div class="temp-container">
                ${temp || ''}&deg;
            </div>
            <div class="pressure-container">
                ${pressure} mBar
            </div>
            <div class="humidity-container">
                ${humidity}%
            </div>
            <div class="lux-container">
                ${lux} lux
            </div>
            <div class="time-container">
                ${time.toLocaleString('en-US', timeOptions).replace(',', '')}
            </div>
        </div>
    `
}