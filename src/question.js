var React = require('react');

var Question = React.createClass({
	render: function() {
		return (
			<div>
				<div>Question #{this.props.params.qid} for RFP {this.props.params.id}!</div>
			</div>
		);
	},
});

module.exports = Question;