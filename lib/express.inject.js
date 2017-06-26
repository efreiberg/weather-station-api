const express = require('express');
const config = require('config');

module.exports = class ExpressService {
    constructor() {
        this.app = express();
        this.port = config.get('express').port;
        this.server = null;
        this.logger;
    }

    onInit(DbService, LoggerService) {
        this.logger = LoggerService;
        this.db = DbService;
        let routePrefix = config.get('api').prefix;
        let routes = config.get('api').routes;
        //Setup routes
        Object.keys(routes).forEach((route) => {
            let path = routePrefix + route;
            this.logger.debug(`API server adding route: ${path}`);
            this.app.get(path, this._onRequestReceived.bind(this, routes[route]));
            //Add error middleware
            this.app.use(require('./error'));
        });
    }
    _onRequestReceived(resource, req, res, next) {
        this.db.query(resource, req.query, (err, response) => {
            if (err) { return next(err); }
            res.json({
                items: response
            });
        })
    }

    start() {
        if (!this.server) {
            this.server = this.app.listen(this.port);
            this.logger.debug(`API server started on port ${this.port}`);
        }
    }
    stop() {
        if (this.server) {
            this.server.close();
            this.server = null;
            this.logger.debug(`API server stopped`);
        }
    }
}