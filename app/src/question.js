var React = require('react');

// Bootstrap
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;
var History = require('react-router').History;

// Custom components
var questionList = require('./question_list');

var Question = React.createClass({
	mixins: [History],

	linkForOffset: function(offset) {
		var currentIndex;
		questionList.forEach(function(question, i) {
			if(question.code == this.props.params.qid) {
				currentIndex = i;
			}
		}.bind(this));

		var baseURL = "/rfp/"+this.props.params.id;
		var nextIndex = currentIndex + offset;
		if(nextIndex < 0) {
			return baseURL;
		} else if(nextIndex >= questionList.length) {
			return baseURL + "/results";
		} else {
			return baseURL + "/question/" + questionList[nextIndex].code;
		}
	},
	handlePrev: function() {
		this.save(function() {
			var prevLink = this.linkForOffset(-1);
			this.history.pushState(null, prevLink, null);
		}.bind(this));
	},
	handleNext: function() {
		this.save(function() {
			var nextLink = this.linkForOffset(1);
			this.history.pushState(null, nextLink, null);
		}.bind(this));
	},
	save: function(callback) {
		this.refs.question.save(callback);
	},
	getComponentForQuestionID: function(qid) {
		for(var i = 0; i < questionList.length; i++) {
			var question = questionList[i];
			if(question.code == qid) {
				return question.component;
			}
		}
		return null;
	},

	getInitialState: function() {
		return {saving: false};
	},
	render: function() {
		var Component = this.getComponentForQuestionID(this.props.params.qid);

		if(Component) {
			return (
				<div>
          <Component
            params={this.props.params}
            questionData={this.props.questionData}
            updateQuestion={this.props.updateQuestion} ref="question"
          />
					<ButtonToolbar>
						<Button onClick={this.handlePrev} disabled={this.state.saving}>Previous</Button>
						<Button bsStyle="primary" onClick={this.handleNext} disabled={this.state.saving}>Next</Button>
					</ButtonToolbar>
				</div>
			);
		} else {
			return (
				<div>
					<div>{"Unknown question: '"+this.props.params.qid+"'"}</div>
				</div>
			);
		}
	},
});

module.exports = Question;