var React = require('react');

var Request = React.createClass({
	render: function() {
		return (
			<div>
				<div>Request!</div>
				{this.props.children}
			</div>
		);
	},
});

module.exports = Request;