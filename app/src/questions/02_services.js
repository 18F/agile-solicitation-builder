var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"descriptionOfServices",
	"farCode",
	"iterationPoPNumber",
	"iterationPoPUnit",
	"naicsText",
	"optionPeriods",
  "paymentSchedule",
  "basePeriodDurationNumber",
  "basePeriodDurationUnit",
  "baseFee",
  "baseFeeAmount",
  "optionPeriodDurationNumber",
  "optionPeriodDurationUnit",
  "optionFee",
  "optionFeeAmount",
  "iterationPoPNumber",
  "iterationPoPUnit",
  "travelBudget",
  "travelRequirement",
  "maxBudget",
];

var ADD_CLIN = [
  "row1",
  "row2",
  "row3a",
  "row3b",
  "row4a",
  "row4b",
  "row5a",
  "row5b",
  "row6a",
  "row6b",
]

var CLIN_CONTENT = {
	"CLIN 1001": "Option Period 1",
	"CLIN 2001": "Option Period 2",
	"CLIN 3001": "Option Period 3",
	"CLIN 4001": "Option Period 4",
	"CLIN 5001": "Option Period 5",
	"CLIN 6001": "Option Period 6",
	"CLIN 7001": "Option Period 7",
	"CLIN 8001": "Option Period 8",
}

var FAR_CODES = {
	"FAR 8.4": "Federal Supply Schedules",
	"FAR 16.504": "Indefinite Quantity",
}


var BASE_FEE_OPTIONS = {
	"base_award": "Award Fee",
	"base_incentive": "Incentive Fee",
	"none": "Neither",
}

var OPTION_FEE_OPTIONS = {
	"option_award": "Award Fee",
	"option_incentive": "Incentive Fee",
	"none": "Neither",
}

var Clin = React.createClass({
	render: function() {
		return (
			<form id="additional-clin">
				<div className="container fake-table col-md-12">
					<div className="row clin">
						<div className="col-md-12 table-content">
							<input type="text" className="long-response" id="row1"/>
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-12 table-content">
							<input type="text" className="long-response" id="row2" />
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content"><input type="text" id="row3a" />
						</div>
						<div className="col-md-6 table-content"><input type="text" id="row3b" />
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content"><input type="text" id="row4a" />
						</div>
						<div className="col-md-6 table-content"><input type="text" id="row4b"/>
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content"><input type="text" id="row5a" />
						</div>
						<div className="col-md-6 table-content"><input type="text" id="row5b" />
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content"><input type="text" id="row6a" />
						</div>
						<div className="col-md-6 table-content"><input type="text" id="row6b" />
						</div>
					</div>
				</div>
			</form>
		);
	}
});

var Services = React.createClass({
	mixins: [StateMixin],
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(2, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
    getCLINs(rfqId, function(clins){
      this.setState({clins: clins["data"] });
    }.bind(this));
  },
	getInitialState: function() {
		var initialStates = getStates(STATES);
		initialStates["addClin"] = false;
		initialStates["clin"] = null;
		return initialStates;
	},
	updateFee: function(key, event) {
		var value = event.target.value;
		if (key === "baseFee"){
			this.setState({baseFee: value});
		}
		if (key === "optionFee"){
			this.setState({optionFee: value});
		}
	},
	toggleTravel: function(responseText) {
		if (responseText === "yes") {
			this.setState({
  	    travelRequirement: true,
   	 });
		}
		if (responseText === "no") {
			this.setState({
  	    travelRequirement: false,
   	 });
		}
	},
	toggleLocation: function(responseText) {
		if (responseText === "yes") {
			this.setState({
  	    locationRequirement: true,
   	 });
		}
		if (responseText === "no") {
			this.setState({
  	    locationRequirement: false,
   	 });
		}
	},
  generateClin: function(){
  	if (this.state.addClin === true){

  		// check to see that something has been filled in
  		var inputFilled = false;
  		for (i=0; i < ADD_CLIN.length; i++){
  			var row = $("#" + ADD_CLIN[i])[0];
  			if (row.value.length > 0) {
  				inputFilled = true;
  				break;
  			}
  		}
  		// if yes, save value and display as completed CLIN
  		if (inputFilled){
  			var rfqId = getId(window.location.hash);
  			clinData = {};
  			for (i=0; i < ADD_CLIN.length; i++){
  				var row = ADD_CLIN[i];
  				clinData[row] = $("#" + row)[0].value;
  			}
  			createCLIN({ clinData }, rfqId, function(data) {
  				console.log(data);
  				// reload (if it isn't happening automatically)
  				this.setState({addClin: false});
  			}.bind(this));
  		}
  		// if not, alert and return
  		else {
				alert("Please add some text before saving!");
  			return;
  		}
  	}
  	else {
  		this.setState({addClin: true});
  	}  
  },
	save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		// get data from FAR code section
		var rfqId = getId(window.location.hash);
    put_data(2, rfqId, data, cb);
		
	},
	render: function() {
		// create CLIN tables
		var bPoP = <span>{this.state.basePeriodDurationNumber} {this.state.basePeriodDurationUnit}</span>;		
		var oPoP = <span>{this.state.optionPeriodDurationNumber} {this.state.optionPeriodDurationUnit}</span>;
		var iPoP = <span>{this.state.iterationPoPNumber} {this.state.iterationPoPUnit}</span>

		var FARS = [];
		for (var key in FAR_CODES) {
			FARS.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.farCode} />{key} - { FAR_CODES[key] }
				  </label>
				</div>
			)
		}

		var BASE_FEES = [];
		for (var key in BASE_FEE_OPTIONS) {
			var value = BASE_FEE_OPTIONS[key];
			BASE_FEES.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.baseFee} />{ BASE_FEE_OPTIONS[key] }
				  </label>
				</div>
			)
		}

		var OPTION_FEES = [];
		for (var key in OPTION_FEE_OPTIONS) {
			var value = OPTION_FEE_OPTIONS[key];
			OPTION_FEES.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.optionFee} />{ OPTION_FEE_OPTIONS[key] }
				  </label>
				</div>
			)
		}

		var ADDITIONAL_CLINS = [];
		for (var clin in this.state.clins){
			var this_clin = this.state.clins[clin];
			ADDITIONAL_CLINS.push(
				<div className="container fake-table col-md-12">
					<div className="row clin">
						<div className="col-md-12 table-content">{this_clin["row1"]}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-12 table-content">{this_clin["row2"]}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">{this_clin["row3a"]}
						</div>
						<div className="col-md-6 table-content">{this_clin["row3b"]}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">{this_clin["row4a"]}
						</div>
						<div className="col-md-6 table-content">{this_clin["row4b"]}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">{this_clin["row5a"]}
						</div>
						<div className="col-md-6 table-content">{this_clin["row5b"]}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">{this_clin["row6a"]}
						</div>
						<div className="col-md-6 table-content">{this_clin["row"]}
						</div>
					</div>
				</div>
			);
		}

		var CLINS = [];
		var counter = 0;
		var optionPeriods = this.state.optionPeriods;

		for (var key in CLIN_CONTENT) {
			if (counter < parseInt(optionPeriods, 10)) {
				CLINS.push(
					<div className="container fake-table col-md-12">
						<div className="row clin">
							<div className="col-md-12 table-content">{CLIN_CONTENT[key]}: {oPoP}
							</div>
						</div>
						<div className="row clin">
							<div className="col-md-12 table-content">{key}, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)
							</div>
						</div>
						<div className="row clin">
							<div className="col-md-6 table-content">Iteration PoP
							</div>
							<div className="col-md-6 table-content">{iPoP}
							</div>
						</div>
						<div className="row clin">
							<div className="col-md-6 table-content">Price Per Iteration
							</div>
							<div className="col-md-6 table-content">$XXXXXXX (vendor completes)
							</div>
						</div>
						<div className="row clin">
							<div className="col-md-6 table-content">Period of Performance
							</div>
							<div className="col-md-6 table-content">{oPoP}
							</div>
						</div>
						<div className="row clin">
							<div className="col-md-6 table-content">Firm Fixed Price (Completion):
							</div>
							<div className="col-md-6 table-content">$XXXXXXX (vendor completes)
							</div>
						</div>
					</div>
				)
			counter += 1;
			}
		}

		return (
			<div>
				<div className="main-heading">Services and Prices</div>

				<div className="sub-heading">Brief Description of Services</div>
				<div className="sub-text">Feel free to edit the sample we have provided below.</div>
				<textarea className="form-control" rows="4" value={this.state.descriptionOfServices} onChange={this.handleChange.bind(this, 'descriptionOfServices')}></textarea>				

				<div className="sub-heading">Type of Contract</div>
				<p>What type of contract will this be?</p>
				<div className="sub-text">At the moment this tool only supports Firm Fixed Price as it better supports agile development.</div>
				<div className="radio">
				  <label>
				    <input type="radio" defaultChecked></input>
				    Firm Fixed Price
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" disabled></input>
				    <font color="#C8C8C8">Time and Materials</font>
				  </label>
				</div>

				<h5>NAICS and FAR Justification Codes</h5>
				<div className="sub-text">We have provided a NAICS code that commonly applies to the acquisition of software development services. If you believe your requirement is not covered under this NAICS code you may search under <a href="http://www.census.gov/eos/www/naics/" target="_blank">this link</a> to select a different one; please edit the text below accordingly.</div>

				<h5>Under which section of the FAR do you intend to compete this?</h5>
				<radiogroup onChange={this.handleChange.bind(this, 'farCode')}>
					{FARS}
				</radiogroup>

				<div className="edit" onClick={this.toggleEdit.bind(this, 'codes')}>Edit</div>
				{this.state.edit === "codes"? <textarea className="form-control" rows="4" defaultValue={this.state.naicsText}></textarea> :
				<div>
				<p id="naics-far-text1">This requirement will be solicited under the following North American Industrial Classification System (NAICS) Code: 541512, Computer Systems Design Services, $27.5 million. This Task Order will be awarded under {this.state.farCode} which governs orders placed under {FAR_CODES[this.state.farCode]} contracts.</p></div>
				}

				<div className="sub-heading">Budget</div>
				<p>Note: The Statement of Objectives will be removed at time of award and replaced with the Offeror’s Performance Work Statement. All listed objectives and requirements shall be included as part of the Offeror’s Performance Work Statement.</p>

				<p>What is the maximum budget for your project?</p>
				<form className="form-inline">
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">$</div>
	    				<input type="text" className="form-control short-response" placeholder="ex: 10,000,000" value={this.state.maxBudget} onChange={this.handleChange.bind(this, "maxBudget")}></input>
	    			</div>
	    		</div>
				</form>

				<p>The government is willing to invest a maximum budget of ${this.state.maxBudget} in this endeavor.</p>

				<p>Do you anticipate any of the following kinds of travel will be required for this effort?</p>

				<div className="radio">
				  <label>
				    <input type="radio" value="yes" onChange={this.toggleTravel.bind(this, "yes")} checked={this.state.travelRequirement}></input>
				    Yes
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" value="no" onChange={this.toggleTravel.bind(this, "no")} checked={!this.state.travelRequirement}></input>
				    No
				  </label>
				</div>

				{!this.state.travelRequirement? null : 
				<div>
				<form className="form-horizontal">
					<p>Which of the following kinds of travel will be reimbursed?</p>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="" onChange={this.toggleLocation.bind(this, "yes")} checked={this.state.locationRequirement}></input>
					    Continental United States
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="" onChange={this.toggleLocation.bind(this, "no")} checked={!this.state.locationRequirement}></input>
					    Continental International
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="" onChange={this.toggleLocation.bind(this, "no")} checked={!this.state.locationRequirement}></input>
					    Cross-Continental International
					  </label>
					</div>
				</form>

				<p>What is the maximum amount you are willing to reimbuse for travel?</p>
				<form className="form-inline">
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">$</div>
	    				<input type="text" className="form-control short-response" placeholder="ex: 400,000" value={this.state.travelBudget} onChange={this.handleChange.bind(this, "travelBudget")}></input>
	    			</div>
	    		</div>
				</form>
				</div>
			}

				<p>The Government {this.state.travelRequirement? "anticipates" : "does not anticipate"} significant travel under this effort. Offices not located in the Washington, DC area require the Contractor to incur travel expenses. Travel must be pre-approved by the CO and Contracting Officer’s Representative (COR). Contractor travel will be made in accordance with FAR part 31.205-46, Travel costs. Each Contractor invoice must include copies of all receipts that VA119A-15-Q-0228 support the travel costs claimed in the invoice. Local travel within a 50-mile radius from the Contractor’s facility is considered the cost of doing business and will not be reimbursed. This includes travel, subsistence, and associated labor charges for travel time. Travel performed for personal convenience and daily travel to and from work at the Contractor’s facility will not be reimbursed. Travel will reimbursed up to ${this.state.travelBudget} NTE.</p>




				<div className="sub-heading">Base Periods</div>

				<p>How long would you like the period of performance for the <b>base period</b> to be?</p>
				<div className="sub-text">We suggest 6 months or less.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number" onChange={this.handleChange.bind(this, "basePeriodDurationNumber")} value={this.state.basePeriodDurationNumber}/>

    			<select className="form-control" onChange={this.handleChange.bind(this, "basePeriodDurationUnit")} value={this.state.basePeriodDurationUnit}>
    				<option>months</option>
    				<option>weeks</option>
    			</select>
				</form>

				<p>Would you like to offer any of the following with the <b>base period</b>?</p>
				<radiogroup onChange={this.updateFee.bind(this, "baseFee")}>
					{BASE_FEES}
				</radiogroup>

				{(this.state.baseFee === "none")? null :
					<div>
						<p>Not to exceed ...</p>
						<input type="text" className="form-control short-response" onChange={this.handleChange.bind(this, "baseFeeAmount")} value={this.state.baseFeeAmount} />
						<p>Use agency specific guidance regarding details.</p>
					</div>
				}

				<div className="sub-heading">Option Periods</div>
				<p>In addition to your base period, how many option periods would you like? We suggest no more than 3.</p>
				<form className="form-inline">
    			<input type="text" id="optionPeriods" className="form-control short-response" placeholder="enter a number" value={this.state.optionPeriods} onChange={this.handleChange.bind(this, "optionPeriods")}></input>
				</form>

				<p>Would you like to offer any of the following with each <b>option period</b>?</p>
				<radiogroup onChange={this.updateFee.bind(this, 'optionFee')}>
					{OPTION_FEES}
				</radiogroup>

				{(this.state.optionFee == "none")? null :
					<div>
						<p>Not to exceed ...</p>		
						<input type="text" className="form-control short-response" onChange={this.handleChange.bind(this, "optionFeeAmount")} value={this.state.optionFeeAmount} />
						<p>Use agency specific guidance for details.</p>
					</div>
				}

				<p>How long would you like period of performance for each <b>option period</b> to be?</p>
				<div className="sub-text">We suggest 6 months or less.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number" onChange={this.handleChange.bind(this, "optionPeriodDurationNumber")} value={this.state.optionPeriodDurationNumber}/>
    			<select className="form-control" onChange={this.handleChange.bind(this, "optionPeriodDurationUnit")} value={this.state.optionPeriodDurationUnit}>
    				<option>months</option>
    				<option>weeks</option>
    			</select>
				</form>

				<p>How long will each iteration within a period of performance be? </p>
				<div className="sub-text">We recommend 2-3 weeks per iteration.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number" onChange={this.handleChange.bind(this, "iterationPoPNumber")} value={this.state.iterationPoPNumber}/>

    			<select className="form-control" onChange={this.handleChange.bind(this, "iterationPoPUnit")} value={this.state.iterationPoPUnit}>
    				<option>months</option>
    				<option>weeks</option>
    			</select>
				</form>

				<div className="resulting-text">Resulting Text</div>
				<p>The Period of Performance for this {this.state.docType} shall be a base period of <b>{bPoP}</b>. <b>{this.state.optionPeriods}</b> additional <b>{oPoP}</b> Option Periods will be included for a total potential period of performance of up to 2 years as described in section 2.
				</p>

				<div className="sub-heading">Funding</div>
				<p>Funding for performance will be allocated and obligated for each exercised Contract Line Item (CLIN).</p>

				<div className="sub-heading">Contract Line Item Number (CLIN) Format</div>							

				<div className="container fake-table col-md-12">
					<div className="row clin">
						<div className="col-md-12 table-content">Base Period: {bPoP}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-12 table-content">CLIN 0001, FFP - Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">Iteration PoP
						</div>
						<div className="col-md-6 table-content">{iPoP}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">Price Per Iteration
						</div>
						<div className="col-md-6 table-content">$XXXXXXX (vendor completes)
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">Period of Performance
						</div>
						<div className="col-md-6 table-content">{bPoP}
						</div>
					</div>
					<div className="row clin">
						<div className="col-md-6 table-content">Firm Fixed Price (Completion):
						</div>
						<div className="col-md-6 table-content">$XXXXXXX (vendor completes)
						</div>
					</div>
				</div>

				{CLINS}
				{ADDITIONAL_CLINS}

				{ (this.state.addClin === true)?
				<div>
					<Clin />
					<button className="add btn btn-default" onClick={this.generateClin}>Save CLIN</button>
				</div> :
				<button className="add btn btn-default" onClick={this.generateClin}>Add CLIN</button>
				}

				<br />

				<div className="sub-heading">Payment Schedule</div>
				
				<p>We have pre-populated this section with the standard agile contracting text. However you are free to add to, modify or delete this text as you see fit.
				</p>

				<EditBox
						text={this.state.paymentSchedule}
						editing={this.state.edit === 'paymentSchedule'}
						onStatusChange={this.toggleEdit.bind(this, 'paymentSchedule')}
						onTextChange={this.handleChange.bind(this, 'paymentSchedule')}>
				</EditBox>

			</div>
		);
	},
});


module.exports = Services;