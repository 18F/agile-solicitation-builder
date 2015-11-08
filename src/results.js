var React = require('react');

var Results = React.createClass({
	render: function() {
		return (
			<div>
				<div>Results for RFP {this.props.params.id}!</div>
			</div>
		);
	},
});

module.exports = Results;