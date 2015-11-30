var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;


var AGENCY_NAMES = {
	"ED": "Department of Education",
	"DOE": "Department of Energy",
	"EPA": "Environmental Protection Agency",
	"GSA": "General Services Administration",
	"DOL": "Department of Labor",
	"NARA": "National Archives and Records Administration",
	"NASA": "National Aeronautics and Space Administration",
	"OMB": "Office of Management and Budget",
	"VA": "Department of Veteran Affairs"
};

var DOC_TYPES = {
	"Contact": "a new purchase under Far 15 (Contract)",
	"Purchase Order": "a new purchase under Far 13 (Purchase Order)",
	"Task Order": "being issued off an existing Indefinite Delivery Indefinite Quantity (ID/IQ) (Task Order)",
	"Call": "being ordered off an existing Blanket Purchase Agreement (BPA) (Call)",
};

var RequestOverview = React.createClass({
	getInitialState: function() {
		return {
			docType: localStorage.getItem("docType"),
			agency: localStorage.getItem("agency") || "none",
		};
	},
	setAgency: function(event) {
		// localStorage.agencyFullname = "U.S. " + AGENCY_NAMES[response];
		localStorage.setItem("agency", event.target.value);
		this.setState({agency: event.target.value});
	},
	setDoctype: function(event) {
		localStorage.setItem("docType", event.target.value);
		this.setState({docType: event.target.value});
	},
	render: function() {
		// Create the agency names list
		var agencyNameOptions = [(
			<option value="none">-- Please select --</option>
		)];
		for(var key in AGENCY_NAMES) {
			agencyNameOptions.push(
				<option value={key}>{AGENCY_NAMES[key]} ({key})</option>
			);
		}

		// Create the doc type radio list
		var docTypeOptions = [];
		for(var key in DOC_TYPES) {
			docTypeOptions.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.docType} />... {DOC_TYPES[key]}
				  </label>
				</div>
			);
		}

		var validAgency = this.state.agency != null && this.state.agency != "none";
		var validDocType = this.state.docType != null;
		var continueDisabled = !(validAgency && validDocType);

		return (
			<div>
				<div>
					<div className="sub-heading">Preliminary Questions</div>
					<p>You're on your way to writing an awesome RFQ or RFP!</p>
					<p>We'll ask you some questions to understand what you want to build,
					and then let you download the generated documents.</p>
					
					<h5>Firstly, what agency is this for?</h5>
					<select className="form-control medium-response" onChange={this.setAgency} value={this.state.agency}>
						{agencyNameOptions}
					</select>

					<br />

					<h5>This will be ...</h5>
					<radiogroup onChange={this.setDoctype}>
						{docTypeOptions}
					</radiogroup>
				</div>

				<br />

				<Link to={"/rfp/"+this.props.params.id+"/question/1"}>
					<Button bsStyle="primary" disabled={continueDisabled}>{"Let's go!"}</Button>
				</Link>
			</div>
		);
	},
});

module.exports = RequestOverview;