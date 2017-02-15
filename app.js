/* jslint node: true */
'use strict';

// Require express, socket.io, and vue
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var webpack = require("webpack");
var webpackMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpackConfig = require("./webpack.conf");

// Pick arbitrary port
var port = 3000;
app.set('port', (process.env.PORT || port));

var compiler = webpack(webpackConfig);
var devMiddleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: false
});
var hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

// Create a new PubAPI (this controls the WebSocket server)
let PubAPI = require('./server/PubAPI');
let pubApi = new PubAPI(io);

// Serve static assets from public/
app.use(express.static(path.join(__dirname, 'public/')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});


http.listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
});
