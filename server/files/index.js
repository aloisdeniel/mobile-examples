var koa = require('koa');
var json = require('koa-json');
var sendfile = require('koa-sendfile');
var fs = require('fs');
var path = require('path');
var route = require('koa-route');
var mount = require('koa-mount');

var App = function(relative) {

  this.path = relative;

  this.app = koa();

  var $this = this;

  this.app.use(route.get('/',function*(){
    this.body = yield $this.listFiles();
  }));

  this.app.use(route.get('/doc/:name',function*(name){
    var filepath = path.join(__dirname ,'../doc', name);
    yield* sendfile.call(this, filepath);
    console.log('File > ' + filepath);
    if (!this.status) this.throw(404)
  }));

  this.app.use(route.get('/:name',function*(name){
    yield* sendfile.call(this, path.join(process.cwd(),name));
    if (!this.status) this.throw(404)
  }));
};

App.prototype.mount = function(parent) {
    parent.use(mount(this.path, this.app));
}

App.prototype.listFiles = function(){
  var $this = this;
  return new Promise(function(resolve,reject){
    fs.readdir(process.cwd(), function(err, files){
      if(err) return reject(err);

      var result = [];
      files.forEach(function(f){
        if(!fs.lstatSync(f).isDirectory()) {
          var name = path.basename(f);
          var url = path.join($this.path,name);
          url = url.replace(/\\/g,'/');
          result.push({
            name: name,
            path: url
          });
        }
      });

      resolve(result);
    });
  });
}

module.exports = App;
