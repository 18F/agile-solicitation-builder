var React = require('react');
var StateMixin = require("./state_mixin");

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;

// "Contact": "a new purchase under Far 15 (Contract)",
var DOC_TYPES = {
	"Purchase Order": "a new purchase under Far 13 (Purchase Order)",
	"Task Order": "being issued off an existing Indefinite Delivery Indefinite Quantity (ID/IQ) (Task Order)",
	"Call": "being ordered off an existing Blanket Purchase Agreement (BPA) (Call)",
};

var SETASIDES = {
	"Small Business": "Small Business",
	"8(a) Business Development Participants": "8(a) Business Development Participants",
	"HUBZone Small Business Concerns": "HUBZone Small Business Concerns",
	"Service-disabled Veteran-owned Small Business Concerns": "Service-disabled Veteran-owned Small Business Concerns",
	"Economically Disadvantaged Women-owned Small Business Concerns": "Economically Disadvantaged Women-owned Small Business Concerns",
	"The Women-Owned Small Business Program": "The Women-Owned Small Business Program",
	"none": "None of the above",
};

// IDIQ & BPA require 
// This is an RFQ for the alliant BPA #XXXXX
// This is an RFQ for an award under ID/IQ #XXXXX

var RequestOverview = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		return {
			docType: "",
			agency: "",
			setaside: "none",
			baseNumber: "",
			baseNumberNeeded: false,
			programName: "",
			agencies: [],
		};
	},
	componentDidMount: function() {
    getAgencies(function(content){
      this.setState({ agencies: content["data"] });
    }.bind(this));
  },
	handleCreateRFQ: function() {
		createRFQ({
			doc_type: this.state.docType,
			agency: this.state.agency,
			setaside: this.state.setaside,
			base_number: this.state.baseNumber,
			program_name: this.state.programName,
		}, function(data) {
			// TODO add error handler
			var rfqId = data.id;
			var url = '#/rfp/' + rfqId + '/question/1';
			window.location.replace(url);
		});
	},
	updateDocType: function(event) {
		var base = false;
		var value = event.target.value;
		if (value  === "Task Order" || value === "Call"){
			base = true;
		}
		this.setState({
			docType: event.target.value,
			baseNumberNeeded: base,
		});
	},
	render: function() {
		// Create the agency names list
		var agencyNameOptions = [(
			<option value="none">-- Please select --</option>
		)];
		for (i=0; i < this.state.agencies.length; i++) {
			var agency = this.state.agencies[i];
			agencyNameOptions.push(
				<option value={agency["abbreviation"]}>{agency["full_name"]} ({agency["abbreviation"]})</option>
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

		var validAgency = this.state.agency != "null" && this.state.agency != "none";
		var validDocType = this.state.docType != "";
		var continueDisabled = !(validAgency && validDocType);

		return (
			<div className="main col-md-8">
				<div>
					<div className="sub-text">These questions are typically answered by the CO.</div>
					<div className="sub-heading">Preliminary Questions</div>
					<p>We'll ask you some questions to understand what you want to build,
					and then let you download the generated documents.</p>
					
					<h5>Firstly, what agency is this for?</h5>
					<select className="form-control medium-response" onChange={this.handleChange.bind(this, "agency")} value={this.state.agency}>
						{agencyNameOptions}
					</select>

					<br />

					<h5>Program Name: </h5>
					<input type="text" className="form-control medium-response" value={this.state.programName} onChange={this.handleChange.bind(this, "programName")} />

					<br />

					<h5>This will be ...</h5>
					<radiogroup onChange={this.updateDocType}>
						{docTypeOptions}
					</radiogroup>

					{this.state.baseNumberNeeded?
						<div>
						<h5>Vehicle Name:</h5>
							<input type="text" className="form-control medium-response" value={this.state.baseNumber} onChange={this.handleChange.bind(this, "baseNumber")} />
						</div>
					 : null}

					<br />

					<h5>Do you intend to set aside this acquisition for any of the following under FAR part 19?</h5>
					<radiogroup onChange={this.handleChange.bind(this, 'setaside')}>
						{setasideOptions}
					</radiogroup>

					 <br />

				</div>

					<Button bsStyle="primary" onClick={this.handleCreateRFQ} disabled={continueDisabled}>{"Let's go!"}</Button>				
			</div>
		);
	},
});

module.exports = RequestOverview;