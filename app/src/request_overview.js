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
// "Contact": "a new purchase under Far 15 (Contract)",
var DOC_TYPES = {
	"Purchase Order": "a new purchase under Far 13 (Purchase Order)",
	"Task Order": "being issued off an existing Indefinite Delivery Indefinite Quantity (ID/IQ) (Task Order)",
	"Call": "being ordered off an existing Blanket Purchase Agreement (BPA) (Call)",
};

var SETASIDES = {
	"8(a) Business Development Participants": "8(a) Business Development Participants",
	"HUBZone Small Business Concerns": "HUBZone Small Business Concerns",
	"Service-disabled Veteran-owned Small Business Concerns": "Service-disabled Veteran-owned Small Business Concerns",
	"Economically Disadvantaged Women-owned Small Business Concerns": "Economically Disadvantaged Women-owned Small Business Concerns",
	"The Women-Owned Small Business Program": "The Women-Owned Small Business Program",
	"none": "None of the above",
};

// Do you intend to set aside this acquisition for any of the following under FAR part 19?
// 8(a) business development participants, HUBZone small business concerns, service-disabled veteran-owned small business concerns, and economically disadvantaged women-owned small business concerns and women-owned small business concerns eligible under the Women-Owned Small Business Program;

// IDIQ & BPA require 
// please identify the base award number [input box]
// This is an RFQ for the alliant BPA #XXXXX
// This is an RFQ for an award under ID/IQ #XXXXX

var RequestOverview = React.createClass({
	getInitialState: function() {
		return {
			docType: localStorage.getItem("docType"),
			agency: localStorage.getItem("agency") || "none",
			setaside: localStorage.getItem("setaside") || "none",
		};
	},
	setAgency: function(event) {
		localStorage.agencyFullname = "U.S. " + AGENCY_NAMES[event.target.value];
		localStorage.setItem("agency", event.target.value);
		this.setState({agency: event.target.value});
	},
	handleChange: function(key, event) {
		switch(key) {
			case "docType":
				this.setState({
					docType: event.target.value,
				});
				localStorage.setItem("docType", event.target.value);
				break;
			case "setaside":
				this.setState({
					setaside: event.target.value,					
				});
				localStorage.setItem("setaside", event.target.value);
				break;
		}    
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
						<input type="radio" value={key} checked={key == this.state.docType} />.. { DOC_TYPES[key] }
				  </label>
				</div>
			);
		}

		// Create the setaside radio list
		var setasideOptions = [];
		for(var key in SETASIDES) {
			setasideOptions.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.setaside} />{ SETASIDES[key] }
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
					<radiogroup onChange={this.handleChange.bind(this, 'docType')}>
						{docTypeOptions}
					</radiogroup>

					<br />

					<h5>Do you intend to set aside this acquisition for any of the following under FAR part 19?</h5>
					<radiogroup onChange={this.handleChange.bind(this, 'setaside')}>
						{setasideOptions}
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