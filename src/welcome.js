var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var IndexLink = require('react-router').IndexLink;

var Welcome = React.createClass({
	getInitialState: function() {
		localStorage.clear();
		localStorage.definitions = "";
		return {};
	},
	render: function() {
		return (
			<div className="col-md-8">
				<div>Welcome to Playbook in Action! Before you begin, please consider the following:</div>
				<br />
				<div>
					<ul>
						<li>The intent of this tool is to assist in the creation of requirements documents
						for agile software development using best practices from the USDS
					  Playbook and TechFAR.</li>

						<li>The PM and the CO should be using this in partnership.</li>

						<li>V1 is for firm fixed price contracts only. The firm fixed price will be per iteration. </li>
						<li>This tool is not built to support waterfall development requirements documents.</li>

						<li>All documents should be approved by a warranted contracting officer and in consultation with your legal council as required.</li>
					</ul>
				</div>
				<IndexLink to="/rfp/1">
					<Button bsStyle="primary">
						Start		
					</Button>
				</IndexLink>
			</div>
		);
	},
});

module.exports = Welcome;
