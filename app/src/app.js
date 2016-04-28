var React = require('react');
var ReactDOM = require('react-dom');

// Dependencies
var View = require('react-flexbox');

// Router stuff
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
var Redirect = require('react-router').Redirect;

// Custom elements
var Welcome = require('./welcome');
var Request = require('./request');
var RequestOverview = require('./request_overview');
var Question = require('./question');
var Results = require('./results');
var AuthButton = require('./auth/login-button');
var RepoLink = React.createElement('a', {
    href: 'https://github.com/18F/playbook-in-action/issues',
    'target': '_blank',
}, 'Help us improve');

var Header = React.createClass({
	render: function() {
		var inheritStyle = {
			color: "inherit",
			textDecoration: "inherit",
		};

		return (
      <div>
        <div className="usa-disclaimer">
          <span className="usa-disclaimer-official">
            <img className="usa-flag_icon" alt="US flag signifying that this is a United States Federal Government website" src="/assets/img/us_flag_small.png" />
            An official website of the United States Government
          </span>
          <span className="usa-disclaimer-stage">This site is currently in alpha. {RepoLink}.</span>
        </div>
        <AuthButton className="top-right-auth-button" hideIfLoggedOut={true} />
        <div className="usa-grid">
          <div className="usa-width-one-whole header">
            <h1>
              <IndexLink to="/" style={inheritStyle}>Playbook in Action</IndexLink>
            </h1>
          </div>
        </div>
      </div>
		);
	},
});

var App = React.createClass({
	render: function() {
		var appStyle = {
			padding: 8,
		};

		return (
			<div style={appStyle}>
        <Header />
				{this.props.children}
			</div>
		);
	},
});

ReactDOM.render(
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Welcome} />
			<Route path="rfp" component={RequestOverview} />
				<Route path="rfp/:id" component={Request}>
					<Route path="question/:qid" component={Question} />
					<Route path="results" component={Results} />
				</Route>
			</Route>
	</Router>,
	document.getElementById('mount')
);
