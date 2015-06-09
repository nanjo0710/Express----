
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');
var http = require('http').createServer(app);
var path = require('path');
var fs = require('fs');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var io = require('socket.io')(http);
io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});


//app.get('/', routes.index);
app.get('/', function (req, res) {
  fs.readFile('./views/index.html', 'UTF-8', function(err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);  // 「Hello, world!」から変更
  });
});

app.get('/chat', function (req, res) {
  fs.readFile('./views/index.html', 'UTF-8', function(err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);  // 「Hello, world!」から変更
  });
});


http.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/*
var express = require('express')
  , app = express()
  , routes = require('./routes')
  , user = require('./routes/user')
  , chat = require('./routes/chat')
  , http = require('http').createServer(app)
  , path = require('path');

// 1.モジュールオブジェクトの初期化
var fs = require("fs");
var io = require("socket.io").listen(http);

// ユーザ管理ハッシュ
var userHash = {};

// 2.イベントの定義
io.sockets.on("connection", function (socket) {

  // 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
  socket.on("connected", function (name) {
    var msg = name + "が入室しました";
    userHash[socket.id] = name;
    io.sockets.emit("publish", {value: msg});
  });

  // メッセージ送信カスタムイベント
  socket.on("publish", function (data) {
    io.sockets.emit("publish", {value:data.value});
  });

  // 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
  socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      var msg = userHash[socket.id] + "が退出しました";
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: msg});
    }
  });
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

// will match acd and abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd')
})

// will match abcd, abbcd, abbbcd, and so on
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd')
})

// will match abcd, abxcd, abRABDOMcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd')
})

// will match /abe and /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e')
})

app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})


// will match anything with an a in the route name:
app.get('/a/', function(req, res) {
  res.send('/a/')
})

// will match butterfly, dagonfly; but not butterflyman, dragonfly man, and so on
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/')
})

var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  res.send('Hello from C!')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

app.get('/users/:userid', function (req, res) {
    res.send('userId:' + req.params.userid);
})

app.get('/chat', chat.index);

http.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
*/