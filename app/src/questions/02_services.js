var React = require('react');
var StateMixin = require("../state_mixin");

// <p>If you believe you need additional CLINs, 6 total, 2 per year, 3 years</p>
// <p>@TODO CLIN number is editable ("0001"), as many boxes as there are periods of performance. Option to add a completely empty box if they want. </p>

// <p>Ex: Services required under this {localStorage.getItem("docType")} are to assist the {localStorage.getItem("agencyFullname")} ({localStorage.getItem("agency")}) with the design and implementation of systems to support the {localStorage.getItem("agency")}’s Program for X.</p>

var STATES = [
	"summary",
	"descriptionOfServices",
	"farCode",
	"awardFee",
	"iterationPoPNumber",
	"iterationPoPUnit",
	"naicsText",
	"optionPeriods",
  "paymentText",
  "basePeriodDurationNumber",
  "basePeriodDurationUnit",
  "optionPeriodDurationNumber",
  "optionPeriodDurationUnit",
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
};

var FAR_CODES = {
	"FAR 8.4": "Federal Supply Schedules",
	"FAR 16.504": "Indefinite Quantity",
}

var Services = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		return {
			edit: null,
			summary: "",
    	descriptionOfServices: "",
    	farCode: "",
    	awardFee: "",
    	iterationPoPNumber: "",
			iterationPoPUnit: "",
    	naicsText: "",
    	optionPeriods: "",
      paymentText: "",
      periodDurationNumber: "",
      periodDurationUnit: "",
		};
	},
	componentDidMount: function() {
		var rfqId = get_id(window.location.hash);
    get_data(2, rfqId, function(content){
    	var data = content["data"];
      this.setState({
      	summary: data["summary"],
      	descriptionOfServices: data["description_of_services"],
      	farCode: data["far_code"],
      	awardFee: data["award_fee"],
      	iterationPoPNumber: data["iteration_pop_number"],
				iterationPoPUnit: data["iteration_pop_unit"],
      	naicsText: data["naics_text"],
      	optionPeriods: data["option_periods"],
        paymentText: data["payment_schedule"],
        basePeriodDurationNumber: data["base_period_duration_number"],
        basePeriodDurationUnit: data["base_period_duration_unit"],
        optionPeriodDurationNumber: data["option_period_duration_number"],
        optionPeriodDurationUnit: data["option_period_duration_unit"],
      });
    }.bind(this));
  },
  generateClin: function(){
  	var clinString = '<div className="container fake-table col-md-12">';
  	for (i=0; i < 2; i++){
  		clinString += ('<div className="row clin"><div className="col-md-12 table-content"><input type="text" /></div></div>');
  	}
  	for (i=0; i < 4; i++){
  		clinString += ('<div className="row clin"><div className="col-md-6 table-content"><input type="text" /></div><div className="col-md-6 table-content"><input type="text" /></div></div>');
  	}
  	clinString += "</div>";
  	$("#additional-clins").append(clinString);
  },
	save: function(cb) {
		// TODO: save data
		// get data from FAR code section
		setTimeout(cb, 500);
	},
	render: function() {
		// create CLIN tables
		var bPoP = <span>{this.state.basePeriodDurationNumber} {this.state.basePeriodDurationUnit}</span>;		
		var oPoP = <span>{this.state.optionPeriodDurationNumber} {this.state.optionPeriodDurationUnit}</span>;

		var iPoP = <span>{this.state.iterationPoPNumber} {this.state.iterationPoPUnit}</span>
		var firmFixedPriceCompletion = "";

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

				<p>{this.state.summary}</p>

				<div className="sub-heading">Brief Description of Services</div>
				<div className="sub-text">Ex: Services required under this {localStorage.getItem("docType")} are to assist the Dept. of Education with the design and implementation of systems to support the ED Program for X.</div>
				<textarea className="form-control" rows="4" placeholder="1-2 sentences"></textarea>				

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


				<div className="sub-heading">Option Periods</div>
				<p>In addition to your base period, how many option periods would you like? We suggest no more than 3.</p>
				<form className="form-inline">
    			<input type="text" id="optionPeriods" className="form-control short-response" placeholder="enter a number" value={this.state.optionPeriods} onChange={this.handleChange.bind(this, "optionPeriods")}></input>
				</form>

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

				<div id="additional-clins"></div>

				<button className="add btn btn-default" onClick={this.generateClin}>Add CLIN</button>

				<br />

				<div className="sub-heading">Payment Schedule</div>
				
				<p>We have pre-populated this section with the standard agile contracting text. However you are free to add to, modify or delete this text as you see fit.
				</p>

				{this.state.edit === "paymentText"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'paymentText')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.paymentText} onChange={this.handleChange.bind(this, 'paymentText')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'paymentText')}>Edit</div>
					{this.state.paymentText}
				</div>
				}	
				
				<br />

			</div>
		);
	},
});
// if they click award fee or incentive fee - not to exceed X. utilize agency specific guidance regarding the [award fee]
// 				<div className="sub-heading">Awards and Incentives</div>
				// <h5>Would you like to include an award or an incentive?</h5>
				// <div className="radio">
				  // <label>
				    // <input type="radio" value={this.state.awardFee} onChange={this.addFee.bind(this, "awardFee")}></input>
				//     Award Fee
				//   </label>
				// </div>
				// <div className="radio">
				//   <label>
				//     <input type="radio" value={this.state.awardFee} onChange={this.addFee.bind(this, "incentiveFee")}></input>
				//     Incentive Fee
				//   </label>
				// </div>
				// <div className="radio">
				//   <label>
				//     <input type="radio" value={this.state.awardFee} onChange={this.addFee.bind(this, "noFee")}></input>
				//     Neither
				//   </label>
				// </div>award subjective - specific criteria ex: product is quality, the form works
// incentive fee = objective assessment, ex: stuck to schedule, defect rate was < 5%
// (Jonathan doesn't like...)



module.exports = Services;