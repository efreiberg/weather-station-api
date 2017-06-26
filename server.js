const injector = require('class-inject');

injector.init({ entry: require('./lib/express.inject').name }, (err, server) => {
    if (err) {
        console.log('Failed To Start: ', err.message);
    }
    else {
        server.start();
    }
});