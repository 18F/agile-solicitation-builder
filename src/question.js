var React = require('react');

// Custom components
var questionList = require('./question_list');

var Question = React.createClass({
	render: function() {
		// Store the question to display in `question`.
		var question;
		questionList.forEach(function(q) {
			if(q.code == this.props.params.qid) {
				var Component = q.component;
				question = (
					<Component params={this.props.params} />
				);
			}
		}.bind(this));
		
		// If there was no match
		if(!question) {
			question = "Unknown question: '"+this.props.params.qid+"'";
		}

		return (
			<div>{question}</div>
		);
	},
});

module.exports = Question;