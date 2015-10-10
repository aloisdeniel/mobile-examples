var route = require('koa-route');

var FeedRoutes = function(controller) {
  this.controller = controller;
}

FeedRoutes.prototype.register = function (app) {
    app.use(route.get('/api/feed', this.controller.all()));
    app.use(route.post('/api/feed', this.controller.create()));
    app.use(route.delete('/api/feed/:id', this.controller.delete()));
}

module.exports = FeedRoutes;
