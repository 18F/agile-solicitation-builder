var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;

var RequestOverview = React.createClass({
	render: function() {
		return (
			<div>
				<div>
					<p>You're on your way to writing an awesome RFQ or RFP!</p>
					<p>We'll ask you some questions to understand what you want to build,
					and then let you download the generated documents.</p>
					<p>Firstly, what agency is this for?</p>
					<p>Secondly, is this an X or a Y?</p>
				</div>
				<br />
				<Link to={"/rfp/"+this.props.params.id+"/question/1"}>
					<Button bsStyle="primary">{"Let's go!"}</Button>
				</Link>
			</div>
		);
	},
});

module.exports = RequestOverview;