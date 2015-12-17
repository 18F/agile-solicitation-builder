var React = require('react');
var Definitions = require('./questions/01_definitions.js');
var Services = require('./questions/02_services.js');
var Requirements = require('./questions/04_requirements.js');

var Results = React.createClass({
	getInitialState: function() {
		return {
			agency: localStorage.getItem("agency"),
			agencyFullName: localStorage.getItem("agencyFullname"),
			docType: localStorage.getItem("docType"),
			definitions: "",
			services02: "",
			objectives03: "",
			requirements04: "",
			instructions05: "",
			inspection06: "",
			performance07: "",
			contracting_officer08: "",
			special_requirements09: "",
			clauses10: "",
			documents11: "",
			conditions12: "",
			evaluation13: "",
			appendix: "",
			locationRequirement: JSON.parse(localStorage.getItem("locationRequirement")),
			locationText: localStorage.getItem("locationText"),
		};
	},
  componentDidMount: function() {
    get_data("definitions", function(content){ 
      this.setState({
        definitions: content,
      });
    }.bind(this));
  },
	render: function() {
		return (
			<div>
				<div className="main-heading">Resulting RFP/RFQ</div>
				<div>Results for RFP/RFQ {this.props.params.id}!</div>
				<div>This is a <b>{this.state.docType}</b> for the {this.state.agencyFullName} ({this.state.agency}).</div>
				{this.state.locationRequirement? <div>This project will primarily take place in <b>{this.state.locationText}</b>.</div> : null}
				
				<div className="sub-heading">Definitions</div>
				<div>{this.state.definitions}</div>
				
				<div className="sub-heading">Services and Prices</div>

			</div>
		);
	},
});

module.exports = Results;