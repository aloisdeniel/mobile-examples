var koa = require('koa');
var json = require('koa-json');
var render = require('koa-ejs');
var serve = require('koa-serve');
var bodyParser = require('koa-bodyparser');
var api = require('./api');
var path = require('path');

var port = 3000;

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

// Static

app.use(serve('doc'));

// Views

app.use(function *() {
  this.state.colors = { accent: '#4ec8b0' } ;
  yield this.render('index');
});

// Starting server

app.listen(port);
console.log('[Server] Started on port '+port+' ...')
