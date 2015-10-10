var FeedModel = require('./FeedModel.js');
var FeedController = require('./FeedController.js');
var FeedRoutes = require('./FeedRoutes.js');

module.exports = function(app) {
  var model = new FeedModel();
  var controller = new FeedController(model);
  var routes = new FeedRoutes(controller);
  routes.register(app);
}
