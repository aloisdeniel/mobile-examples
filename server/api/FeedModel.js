var Db = require('tingodb')().Db;
var path = require('path');
var db = new Db(path.join(__dirname, '../data'), {}).collection("feed");

var FeedModel = function() {}

/* Public methods */

FeedModel.prototype.all = function(offset,limit) {
  if(!offset) offset = 0;
  if(!limit) limit = 50;

  return new Promise(function(resolve,reject) {
    db.find({})
       .skip(offset)
       .limit(limit)
       .sort({date: -1})
       .toArray((e, v) => { if(e) return reject(e); resolve({ messages:v, offset: offset, limit: limit }); });
  });
}

FeedModel.prototype.create = function(message) {
  _validate(message);
  return new Promise(function(resolve,reject) {
    db.insert({
      author: message.author,
      content: message.content,
      date: new Date()
    },(e, v) => { if(e) return reject(e); resolve(v); });
  });
}

FeedModel.prototype.delete = function(id) {
  return new Promise(function(resolve,reject) {
    db.remove({ _id: id },{}, (e, v) => { if(e) return reject(e); resolve(v); });
  });
}

/* Private methods */

function _validate(message) {
  if(!message || !message.author || !message.content) {
    throw new Error("Invalid argument");
  }
}

module.exports = FeedModel;
