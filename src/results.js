var React = require('react');

var Results = React.createClass({
	render: function() {
		return (
			<div>
				<div>Yay results for RFP/RFQ {this.props.params.id}!</div>
			</div>
		);
	},
});

module.exports = Results;