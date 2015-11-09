var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var IndexLink = require('react-router').IndexLink;

var Welcome = React.createClass({
	render: function() {
		return (
			<div>
				<div>Welcome to Playbook in Action!</div>
				<IndexLink to="/rfp/1">
					<Button bsStyle="primary">
						Start a request!
					</Button>
				</IndexLink>
			</div>
		);
	},
});

module.exports = Welcome;