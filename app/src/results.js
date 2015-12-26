var React = require('react');
var Definitions = require('./questions/01_definitions.js');
var Services = require('./questions/02_services.js');
var Requirements = require('./questions/04_requirements.js');

var Results = React.createClass({
	getInitialState: function() {
		return {};
	},
  componentDidMount: function() {
  },
	render: function() {
		var rfqId = window.location.hash.split("#/rfp/")[1].split("/results")[0];
		console.log(rfqId);
		var url = "/download/" + rfqId;
		return (
			<div>
				<div className="main-heading">Resulting RFQ</div>
				<a href={url}><button className="btn btn-default">Download</button></a>
			</div>
		);
	},
});

module.exports = Results;