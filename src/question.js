var React = require('react');

// Question components
var Declarations = require('./questions/01_declaration');
var Services = require('./questions/02_services');

var Question = React.createClass({
	render: function() {
		console.log("Question:"+this.props.params.qid, typeof this.props.params.qid);

		// Store the question to display in el;
		var question;
		switch(this.props.params.qid) {
			case "1":
				question = <Declarations />;
				break;
			
			case "2":
				question = <Services />;
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