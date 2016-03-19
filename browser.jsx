var _              = require('underscore');
var browserHistory = require('react-router').browserHistory;
var rollbar        = require('rollbar');
var Provider       = require('react-redux').Provider;
var React          = require('react');
var ReactDOM       = require('react-dom');
var Router         = require('react-router').Router;

rollbar.init(process.env.ROLLBAR_CLIENT_ACCESS_TOKEN);
rollbar.init({
	accessToken:     process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
	captureUncaught: true,
	payload:         { environment: process.env.ROLLBAR_ENV || 'production' },
	verbose:         !process.env.NODE_ENV
});
if (!process.env.NODE_ENV) {
	rollbar.configure({ enabled: false });
}

var routes = require('./components/routes');
var Store  = require('./store');

var state = JSON.parse(document.getElementById('react-state').innerHTML);

global.ga = global.ga || _.noop;
ga('require', 'ec');

ReactDOM.render(
	<Provider store={Store(state)}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,
	document.getElementById('react-app'),
	function() {
		console.log('DOM rendered with state', state);
	}
);
