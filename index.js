require('babel-register');
var memory = require('feathers-memory');

var app = require('./application');

app.use('/api/messages', memory());
var i = 0;
setInterval(function() {
	app.service('/api/messages').create({ text: 'this is message #' + i, date: Date.now() });
	i++;
}, 1000);

app.listen(app.get('port'));
