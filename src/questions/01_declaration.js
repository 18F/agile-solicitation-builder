var React = require('react');

// Bootstrap
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;
var History = require('react-router').History;

var Declaration = React.createClass({
	mixins: [History],
	save: function(cb) {
		// TODO: save data
		this.setState({saving: true});
		setTimeout(cb, 500);
	},
	handlePrev: function() {
		this.save(function() {
			var prevLink = "/rfp/"+this.props.params.id;
			this.history.pushState(null, prevLink, null);
		}.bind(this));
	},
	handleNext: function() {
		this.save(function() {
			var nextLink = "/rfp/"+this.props.params.id+"/question/2";
			this.history.pushState(null, nextLink, null);
		}.bind(this));
	},
	getInitialState: function() {
		return {saving: false};
	},
	render: function() {
		return (
			<div>
				<div>Declaration questions...</div>
				<ButtonToolbar>
					<Button onClick={this.handlePrev} disabled={this.state.saving}>Previous</Button>
					<Button bsStyle="primary" onClick={this.handleNext} disabled={this.state.saving}>Next</Button>
				</ButtonToolbar>
			</div>
		);
	},
});

module.exports = Declaration;