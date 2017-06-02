
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

var port = process.env.PORT || 8080;

var server = app.listen(port);

var io = require('socket.io')(server);

var vragenData = importedJson;

io.on('connection', (client) => {
    //console.log("een gebruiker heeft geconnect %s",client.id);
    io.emit('user', client.id)
    io.emit('vragen', vragenData);
    
    client.on('like', (vraag, gebruiker) => {
        console.log(gebruiker);
        vragenData[vraag].likes++;
		io.emit('updateLike', vragenData[vraag]);
        io.emit('update', gebruiker, vraag, 1);
	});
    client.on('dislike', (vraag, gebruiker) => {
        vragenData[vraag].dislikes++;
		io.emit('updateDislike', vragenData[vraag]);
        io.emit('update', gebruiker, vraag, 0);
	});
    
    client.on('geefVragen', () =>{
    io.emit('stuurVragen', vragenData);
    console.log(vragenData);
});

    
});


console.log('Server running');