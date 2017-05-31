
var express = require('express');
var path = require('path');
var importedJson = require('./data.json');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var _collection = require('lodash/collection'); // find
var _util = require('lodash/util'); // matches

var app = express();
var app2 = express();

// Hot reloading
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
// End hot reloading

app.use(express.static('./public'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app2.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});

var server = app.listen(3000);
var server2 = app2.listen(4000)

var io = require('socket.io')(server);
var io2 = require('socket.io')(server2);

var vragenData = importedJson;

io.on('connection', (client) => {
    //console.log("een gebruiker heeft geconnect %s",client.id);
    io.emit('vragen', vragenData);
    io2.emit('vragen', vragenData);
    
    client.on('like', (vraag, gebruiker) => {
        console.log(gebruiker);
        vragenData[vraag].likes++;
		io.emit('updateLike', vragenData[vraag]);
        io2.emit('update', gebruiker, vraag, 1);
	});
    client.on('dislike', (vraag, gebruiker) => {
        vragenData[vraag].dislikes++;
		io.emit('updateDislike', vragenData[vraag]);
        io2.emit('update', gebruiker, vraag, 0);
	});
    
});

var test = "Dit is een test"

io2.on('connection', (client2) => {
    console.log("een gebruiker heeft geconnect %s",client2.id);
    io2.emit('vragen', test);
    
});


//console.log('Server running at http://localhost:3000');