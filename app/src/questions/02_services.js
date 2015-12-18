var React = require('react');

// <p>If you believe you need additional CLINs, 6 total, 2 per year, 3 years</p>
// <p>@TODO CLIN number is editable ("0001"), as many boxes as there are periods of performance. Option to add a completely empty box if they want. </p>

// this is a firm fixed price {call/etc.} against [78fhjh].
// move to beginning of services and prices

// <p>Ex: Services required under this {localStorage.getItem("docType")} are to assist the {localStorage.getItem("agencyFullname")} ({localStorage.getItem("agency")}) with the design and implementation of systems to support the {localStorage.getItem("agency")}’s Program for X.</p>

var CLIN_CONTENT = {
	"CLIN 0001": "Base Period",
	"CLIN 1001": "Option Period 1",
	"CLIN 1001": "Option Period 2",
	"CLIN 2001": "Option Period 3",
	// "CLIN 3001": "Option Period 4",
};



var Services = React.createClass({	
	getInitialState: function() {
		return {
			edit: null,
			agency: localStorage.getItem('agency'),
			docType: localStorage.getItem("docType"),
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
    get_data(2, 1, function(content){
    	var data = content["data"];
      this.setState({
      	descriptionOfServices: data[0]["text"],
      	farCode: data[1]["text"],
      	awardFee: data[2]["text"],
      	iterationPoPNumber: data[3]["text"],
				iterationPoPUnit: data[4]["text"],
      	naicsText: data[5]["text"],
      	optionPeriods: data[6]["text"],
        paymentText: data[7]["text"],
        periodDurationNumber: data[8]["text"],
        periodDurationUnit: data[9]["text"],
      });
    }.bind(this));
  },
	toggleEdit: function(key, event) {
		if (this.state.edit === key){
			this.setState({
      	edit: null,
	    });
		}
		else {
			this.setState({
	      edit: key,
	    });
		}
	},

	addFee: function(key, event) {
		// awardFee, incentiveFee, noFee
		switch(key) {
			case "awardFee":
				this.setState({
					"fee": "Award Fee",
				});
				break;
			case "incentiveFee":
				this.setState({
					"fee": "Incentive Fee",
				});
				break;
			case "noFee":
				this.setState({
					"fee": "none",
				});
				break;
		}
	},
	handleChange: function(key, event) {
		switch(key) {
			case "paymentText":
				this.setState({
					paymentText: event.target.value,
				});
				break;
			case "optionPeriods":
				this.setState({
					optionPeriods: event.target.value,
				});
				break;
			case "periodDurationNumber":
				this.setState({
					periodDurationNumber: event.target.value,
				});
				break;
			case "periodDurationUnit":
				this.setState({
					periodDurationUnit: event.target.value,
				});
				break;
			case "iterationPoPNumber":
				this.setState({
					"iterationPoPNumber": event.target.value,
				});
				break;
			case "iterationPoPUnit":
				this.setState({
					"iterationPoPUnit": event.target.value,
				});
				break;
		}    
  },
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		// create CLIN tables

		var PoP = <span>{this.state.periodDurationNumber} {this.state.periodDurationUnit}</span>;

		var iPoP = <span>{this.state.iterationPoPNumber} {this.state.iterationPoPUnit}</span>
		var firmFixedPriceCompletion = "";


		var CLINS = [];
		var counter = 0;
		var optionPeriods = $('#optionPeriods')[0];

		for (var key in CLIN_CONTENT) {
			// if (counter < optionPeriods) {
				CLINS.push(
					<div className="container fake-table col-md-12">
						<div className="row clin">
							<div className="col-md-12 table-content">{CLIN_CONTENT[key]}: {PoP}
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
							<div className="col-md-6 table-content">{PoP}
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
			// }
		}


		return (
			<div>
				<div className="main-heading">Services and Prices</div>

				<p>This is a Firm Fixed Price {this.state.docType} for {this.state.agency}.</p>

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
				<div className="radio">
				  <label>
				    <input type="radio" value={this.state.awardFee} onChange={this.addFee.bind(this, "awardFee")}></input>
				    FAR 8.4 - Federal Supply Schedules
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" value={this.state.awardFee} onChange={this.addFee.bind(this, "incentiveFee")}></input>
				    FAR 16.504 - Indefinite Quantity
				  </label>
				</div>


				<div className="edit" onClick={this.toggleEdit.bind(this, 'codes')}>Edit</div>
				{this.state.edit === "codes"? <textarea className="form-control" rows="4" defaultValue={this.state.naicsText}></textarea> :
				<div>
				<p id="naics-far-text1">This requirement will be solicited under the following North American Industrial Classification System (NAICS) Code: 541512, Computer Systems Design Services, $27.5 million. This Task Order will be awarded under [FAR 8.4 , FAR 16.504] which governs orders placed under [Indefinite Delivery] contracts.</p></div>
				}

				<div className="sub-heading">Period of Performance</div>

				<p>How long would you like each individual period of performance to be?</p>
				<div className="sub-text">We suggest 6 months or less, per FAR 39.1.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number" onChange={this.handleChange.bind(this, "periodDurationNumber")} value={this.state.periodDurationNumber}/>

    			<select className="form-control" onChange={this.handleChange.bind(this, "periodDurationUnit")} value={this.state.periodDurationUnit}>
    				<option>months</option>
    				<option>weeks</option>
    			</select>
				</form>

				<p>In addition to your base period, how many option periods would you like? We suggest no more than 3.</p>
				<form className="form-inline">
    			<input type="text" id="optionPeriods" className="form-control short-response" placeholder="enter a number" value={this.state.optionPeriods} onChange={this.handleChange.bind(this, "optionPeriods")}></input>
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
				<p>The Period of Performance for this {this.state.docType} shall be a base period of <b>{PoP}</b>. <b>2</b> additional <b>6 month</b> Option Periods will be included for a total potential period of performance of up to 2 years as described in section 2.
				</p>


				<div className="sub-heading">Contract Line Item Number (CLIN) Format</div>							
				<button className="add">Add CLIN</button>
				<br />

				{CLINS}

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