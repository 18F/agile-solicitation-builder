var React = require('react');
var ReactDOM = require('react-dom');

// Router stuff
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
var Redirect = require('react-router').Redirect;

// Other elements
Request = require('./request');
RequestOverview = require('./request_overview');
Question = require('./question');
Results = require('./results');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<div>Hello, world!</div>
				<div>
					<IndexLink to="/rfp/1">RFP #1</IndexLink><br/>
					<Link to="/rfp/1/question/2">Question 2</Link><br/>
					<Link to="/rfp/1/results">Results</Link>
				</div>
				{this.props.children}
			</div>
		);
	},
});

ReactDOM.render(
	<Router>
		<Route path="/" component={App}>
			<Route path="rfp/:id" component={Request}>
				<IndexRoute component={RequestOverview} />
				<Route path="question/:qid" component={Question} />
				<Route path="results" component={Results} />
			</Route>
		</Route>
	</Router>,
	document.getElementById('mount')
);