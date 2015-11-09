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
					You're on your way to writing an awesome request! We'll
					ask you some questions to understand what you want to build,
					and then let you download your form.
				</div>
				<Link to={"/rfp/"+this.props.params.id+"/question/1"}>
					<Button bsStyle="primary">{"Let's go!"}</Button>
				</Link>
			</div>
		);
	},
});

module.exports = RequestOverview;