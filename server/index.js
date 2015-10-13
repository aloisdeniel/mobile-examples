var koa = require('koa');
var json = require('koa-json');
var render = require('koa-ejs');
var serve = require('koa-serve');
var mount = require('koa-mount');
var bodyParser = require('koa-bodyparser');
var api = require('./api');
var Files = require('./files');
var path = require('path');
var config = require('config');

var port = 3000;

var state = {
  name: 'Server',
  icon: 'cloud',
  colors: {
    accent: '#4ec8b0'
  }
}

if (config.has('name')) { state.name = config.get('name'); };
if (config.has('icon')) { state.icon = config.get('icon'); };
if (config.has('colors.accent')) { state.colors.accent = config.get('colors.accent'); };

var app = koa();

// Middlewares

app.use(bodyParser());
app.use(json({ pretty: true, param: 'pretty' }));
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  cache: false
});


// Api

api(app);
    
// Files
new Files('/files').mount(app)

// Views

app.use(function *() {
  this.state = state;
  yield this.render('index');
});


// Starting server

app.listen(port);
console.log('[Server] Started on port '+port+' ...')
