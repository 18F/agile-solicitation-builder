var React = require('react');

// Question components
var Declarations = require('./questions/01_declaration');
var Services = require('./questions/02_services');

var Question = React.createClass({
	render: function() {
		// Store the question to display in el;
		var question;
		switch(this.props.params.qid) {
			case "1":
				question = <Declarations params={this.props.params} />;
				break;
			
			case "2":
				question = <Services params={this.props.params} />;
				break;

			default:
				question = "Unknown question: '"+this.props.params.qid+"'";
		}

		return (
			<div>
				{question}
			</div>
		);
	},
});

module.exports = Question;