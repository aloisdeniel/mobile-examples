var FeedController = function(model) {
  this.model = model;
}

/* Public methods */

FeedController.prototype.all = function() {
  var model = this.model;
  return function*() {
    var offset = parseInt(this.request.query.offset);
    var limit = parseInt(this.request.query.limit);
    this.body = yield model.all(offset,limit);
  };
}

FeedController.prototype.create = function() {
  var model = this.model;
  return function*() {
    var entity = this.request.body;
    try {
      this.body = yield model.create(entity);
    } catch (e) {
      e.status = 400;
      throw e;
    }
  };
}

FeedController.prototype.delete = function() {
  var model = this.model;
  return function*(id) {
    try {
      this.body = {
        success : yield model.delete(id)
      };
    } catch (e) {
      e.status = 400;
      throw e;
    }
  };
}

module.exports = FeedController;
