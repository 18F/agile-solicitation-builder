var React = require('react');

// <p>If you believe you need additional CLINs, 6 total, 2 per year, 3 years</p>
// <p>@TODO CLIN number is editable ("0001"), as many boxes as there are periods of performance. Option to add a completely empty box if they want. </p>

// this is a firm fixed price {call/etc.} against [78fhjh].
// move to beginning of services and prices

// <p>Ex: Services required under this {localStorage.getItem("docType")} are to assist the {localStorage.getItem("agencyFullname")} ({localStorage.getItem("agency")}) with the design and implementation of systems to support the {localStorage.getItem("agency")}’s Program for X.</p>

var CLIN_CONTENT = {
	"CLIN 0001": "Base Period",
	"CLIN 0002": "Award Term Incentive",
	"CLIN 1001": "Award Term 02/Option Term",
	"CLIN 1002": "Award Term 03/Option Term",
};

var Services = React.createClass({
  componentDidMount: function() {
    get_data("payment_schedule", function(content){ 
      this.setState({
        paymentText: content,
      });
    }.bind(this));
    get_data("naics_codes", function(content){ 
      this.setState({
        codesText: content,
      });
    }.bind(this));
  },
	getInitialState: function() {
		return {
			codesText: "",
			totalBudget: localStorage.getItem("totalBudget"),
			edit: null,
			docType: localStorage.getItem("docType"),
			awardFee: localStorage.getItem("awardFee") || false,
			incentiveFee: localStorage.getItem("incentiveFee") || false,
			optionPeriods: 3,
			periodDurationNumber: localStorage.getItem("periodDurationNumber") || 6,
			periodDurationUnit: localStorage.getItem("periodDurationUnit") || "months",
			iterationPoPNumber: 2,
			iterationPoPUnit: "weeks",
		};
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
  updateBudget: function(event) {
  	this.setState({totalBudget: event.target.value });
  	var newText = document.getElementById('naics-far-text1');
  	this.setState({codesText : newText.innerText });
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
		for (var key in CLIN_CONTENT) {
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
		}


		return (
			<div>
				<div className="main-heading">Services and Prices</div>

				<div className="sub-heading">Brief Description of Services</div>
								<textarea className="form-control" rows="4" placeholder="1-2 sentences"></textarea>				

				<div className="sub-heading">Type of Contract</div>
				<p>What time of contract will these be?</p>
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

				<p>This is a Firm Fixed Price {this.state.docType}.</p>

				<h5>NAICS and FAR Justification Codes</h5>
				<div className="sub-text">We have provided a NAICS code that commonly applies to the acquisition of software development services. If you believe your requirement is not covered under this NAICS code you may search under <a href="http://www.census.gov/eos/www/naics/" target="_blank">this link</a> to select a different one; please edit the text below accordingly.</div>

				<div className="edit" onClick={this.toggleEdit.bind(this, 'codes')}>Edit</div>
				{this.state.edit === "codes"? <textarea className="form-control" rows="4" defaultValue={this.state.codesText}></textarea> :
				<div>
				<p id="naics-far-text1">This requirement will be solicited under the following North American Industrial Classification System (NAICS) Code: 541512, Computer Systems Design Services, $27.5 million. This Task Order will be made in accordance with FAR 16.505 which governs orders placed under Indefinite Delivery contracts as detailed in the GSA GWAC Ordering guide.</p></div>
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
    			<input type="text" className="form-control short-response" placeholder="enter a number" value={this.state.optionPeriods} onChange={this.handleChange.bind(this, "optionPeriods")}></input>
				</form>


				<p>How long will each iteration within a period of performance be? </p>
				<div className="sub-text">We recommend 2-3 weeks per iteration.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number" onChange={this.handleChange.bind(this, "iterationPoPNumber")} value={this.state.iterationPoPNumber}/>

    			<select className="form-control" onChange={this.handleChange.bind(this, "terationPoPUnit")} value={this.state.terationPoPUnit}>
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

				<div className="sub-heading">Awards and Incentives</div>
				<h5>Would you like to include an award or an incentive?</h5>
				<div className="radio">
				  <label>
				    <input type="radio" value={this.state.awardFee} onChange={this.addFee.bind(this, "awardFee")}></input>
				    Award Fee
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" onChange={this.addFee.bind(this, "incentiveFee")}></input>
				    Incentive Fee
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" onChange={this.addFee.bind(this, "noFee")}></input>
				    Neither
				  </label>
				</div>

			</div>
		);
	},
});
// if they click award fee or incentive fee - not to exceed X. utilize agency specific guidance regarding the [award fee]
// award subjective - specific criteria ex: product is quality, the form works
// incentive fee = objective assessment, ex: stuck to schedule, defect rate was < 5%
// (Jonathan doesn't like...)

					// <table className="table table-bordered table-striped">
					// 	<thead>
					// 	</thead>
					// 	<tbody>
					// 		<tr>
					// 			<td>Base Period: (6 months, period of performance)</td>
					// 		</tr>
					// 		<tr>
					// 			<td>CLIN 0001, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)</td>
					// 		</tr>
					// 	</tbody>
					// </table>
					// <table className="table table-bordered">
					// 	<thead>
					// 		<tr>
					// 			<td>Base Period: 6 months</td>
					// 			<td></td>
					// 		</tr>
					// 		<tr>
					// 			<td>CLIN 0001, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)</td>
					// 			<td></td>
					// 		</tr>
					// 	</thead>
					// 	<tbody>
					// 		<tr>
					// 			<td>Iteration PoP</td>
					// 			<td><input type="text"></input> Weeks</td>			
					// 		</tr>
					// 		<tr>
					// 			<td>Price Per Iteration</td>
					// 			<td>$<input type="text"></input></td>			
					// 		</tr>
					// 		<tr>
					// 			<td>Other Direct Costs</td>
					// 			<td>NTE Ceiling $100,000.00</td>			
					// 		</tr>
					// 		<tr>
					// 			<td>Period of Performance:</td>
					// 			<td>(period of performance)</td>			
					// 		</tr>
					// 		<tr>
					// 			<td>Firm Fixed Price (Completion):</td>
					// 			<td>$<input type="text"></input></td>
					// 		</tr>						
					// 	</tbody>
					// </table>



						// <table className="table table-bordered table-striped">
						// 	<thead>		

						// 	</thead>
						// 	<tbody>
						// 		<tr>					
						// 			<td>Option Period 1, 6 months</td>																	
						// 		</tr>
						// 		<tr>
						// 			<th>CLIN 0002, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)</th>
						// 		</tr>


module.exports = Services;