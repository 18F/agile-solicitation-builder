var React = require('react');

// var defaultPaymentText = "The contractor shall be paid upon the completion of each iteration upon its acceptance and verification by the Contracting Officer’s Representative (COR). Invoices shall be submitted at the end of each iteration in accordance with the delivery schedule as established in the Performance Work Statement.";
// <p>If you believe you need additional CLINs, 6 total, 2 per year, 3 years</p>
// <p>@TODO CLIN number is editable ("0001"), as many boxes as there are periods of performance. Option to add a completely empty box if they want. </p>
var defaultCodesText = "This requirement will be solicited under the following North American Industrial Classification System (NAICS) Code: 541512, Computer Systems Design Services, $27.5 million. This Task Order will be made in accordance with FAR 16.505 which governs orders placed under Indefinite Delivery contracts as detailed in the GSA GWAC Ordering guide.";

var Services = React.createClass({
 	componentDidMount: function() {
    text = get_data("payment_schedule");
    console.log(text);
    this.setState({
      paymentText: text,
    });
   },
	getInitialState: function() {
		return {
			response: false,
			textInBox: false,
			codesText: defaultCodesText,
			totalBudget: localStorage.getItem("totalBudget"),
			edit: null,
			docType: localStorage.getItem("docType"),
			awardFee: localStorage.getItem("awardFee") || false,
			incentiveFee: localStorage.getItem("incentiveFee") || false,
			optionPeriods: localStorage.getItem("optionPeriods") || null,
			periodDurationNumber: localStorage.getItem("periodDurationNumber") || 6,
			periodDurationUnit: localStorage.getItem("periodDurationUnit") || "months",
			periodDuration: localStorage.getItem("periodDuration") || "6 months",
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

	handleChange: function(key, event) {
		// console.log(event.target.value);
		switch(key) {
			case "awardFee":
			// @TODO make this toggle work :(
				this.setState({
					awardFee : event.target.value? false : true,
				});
				break;
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
					periodDuration: event.target.value + " " + this.state.periodDurationUnit,
				});
				break;
			case "periodDurationUnit":
				this.setState({
					periodDurationUnit: event.target.value,
					periodDuration: this.state.periodDurationNumber + " " + event.target.value,
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
		return (
			<div>
				<div className="main-heading">Services and Prices</div>

				<div className="sub-heading">Brief Description of Services</div>
				<p>Ex: Services required under this {localStorage.getItem("docType")} are to assist the {localStorage.getItem("agencyFullname")} ({localStorage.getItem("agency")}) with the design and implementation of systems to support the {localStorage.getItem("agency")}’s Program for X.</p>
				<textarea className="form-control" rows="4" placeholder="1-2 sentences"></textarea>				

				<div className="sub-heading">Type of Contract</div>
				<p>What time of contract will these be?</p>
				<div className="sub-text">At the moment this tool only supports Firm Fixed Price as it better supports agile development.</div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked></input>
				    Firm Fixed Price
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" disabled></input>
				    Time and Materials
				  </label>
				</div>

				<p>What is the maximum budget for your project?</p>
				<form className="form-inline">
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">$</div>
	    				<input type="text" className="form-control short-response" placeholder="ex: 10,000,000" value={this.state.totalBudget} onChange={this.updateBudget}></input>
	    			</div>
	    		</div>
				</form>

				<div className="sub-heading">Period of Performance</div>

				<p>How many option periods would you like? We suggest no more than 3. <a href="#">Learn More</a>.</p>
				<form className="form-inline">
    			<input type="text" className="form-control short-response" placeholder="enter a number" value={this.state.optionPeriods} onChange={this.handleChange.bind(this, "optionPeriods")}></input>
				</form>

				<p>How long would you like each individual period of performance to be?</p>
				<div className="sub-text">We suggest 6 months or less, per <a href="#">FAR 39.1</a>.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number" onChange={this.handleChange.bind(this, "periodDurationNumber")} value={this.state.periodDurationNumber}/>

    			<select className="form-control" onChange={this.handleChange.bind(this, "periodDurationUnit")} value={this.state.periodDurationUnit}>
    				<option>months</option>
    				<option>weeks</option>
    			</select>
				</form>

				<div className="resulting-text">Resulting Text</div>
				<p>The Period of Performance for this {this.state.docType} shall be a base period of <b>{this.state.periodDurationNumber} {this.state.periodDurationUnit}</b>, with <b>one (1) {this.state.periodDuration}</b> Award Term Incentive. <b>Two (2)</b> additional <b>6 month</b> Award Term Options will be included for a total potential period of performance of up to two (2) years as described in section 2.
				</p>

				<h5>NAICS and FAR Justification Codes</h5>
				<div className="sub-text">We have provided a NAICS code that commonly applies to the acquisition of software development services. If you believe your requirement is not covered under this NAICS code you may search under <a>this link</a> to select a different one.</div>

				<div className="edit" onClick={this.toggleEdit.bind(this, 'codes')}>Edit</div>
				
				{this.state.edit === "codes"? <textarea className="form-control" rows="4" defaultValue={this.state.codesText}></textarea> :
				<div><p>{this.state.docType} against [GSA Alliant Small Business (SB) GWAC] – Firm Fixed Price</p>
				<p id="naics-far-text1">This requirement will be solicited under the following North American Industrial Classification System (NAICS) Code: 541512, Computer Systems Design Services, $27.5 million. This Task Order will be made in accordance with FAR 16.505 which governs orders placed under Indefinite Delivery contracts as detailed in the GSA GWAC Ordering guide.</p></div>				
				}
				<div className="sub-heading">Contract Line Item Number (CLIN) Format</div>							
				<button className="add">Add CLIN</button>

				<table className="table table-bordered table-striped">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Base Period: (6 months, period of performance)</td>
						</tr>
						<tr>
							<td>CLIN 0001, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)</td>
						</tr>
					</tbody>
				</table>
				<table className="table table-bordered">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Iteration PoP</td>
							<td><input type="text"></input> Weeks</td>			
						</tr>
						<tr>
							<td>Price Per Iteration</td>
							<td>$<input type="text"></input></td>			
						</tr>
						<tr>
							<td>Other Direct Costs</td>
							<td>NTE Ceiling $100,000.00</td>			
						</tr>
						<tr>
							<td>Period of Performance:</td>
							<td>(period of performance)</td>			
						</tr>
						<tr>
							<td>Firm Fixed Price (Completion):</td>
							<td>$<input type="text"></input></td>
						</tr>						
					</tbody>
				</table>

				<table className="table table-bordered table-striped">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Award Term 02/Option Term: (6 months, period of performance)</td>
						</tr>
						<tr>
							<td>CLIN 0002, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)</td>
						</tr>
					</tbody>
				</table>
				<table className="table table-bordered">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Iteration PoP</td>
							<td><input type="text"></input> Weeks</td>			
						</tr>
						<tr>
							<td>Price Per Iteration</td>
							<td>$<input type="text"></input></td>			
						</tr>
						<tr>
							<td>Other Direct Costs</td>
							<td>TBD</td>			
						</tr>
						<tr>
							<td>Period of Performance:</td>
							<td>(period of performance)</td>			
						</tr>
						<tr>
							<td>Firm Fixed Price (Completion):</td>
							<td>$<input type="text"></input></td>
						</tr>						
					</tbody>
				</table>

				<table className="table table-bordered table-striped">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Award Term 02/Option Term: 6 months(period of performance)</td>
						</tr>
						<tr>
							<td>CLIN 1001, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)</td>
						</tr>
					</tbody>
				</table>
				<table className="table table-bordered">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Iteration PoP</td>
							<td><input type="text"></input> Weeks</td>			
						</tr>
						<tr>
							<td>Price Per Iteration</td>
							<td>$<input type="text"></input></td>			
						</tr>
						<tr>
							<td>Other Direct Costs</td>
							<td>TBD</td>			
						</tr>
						<tr>
							<td>Period of Performance:</td>
							<td>(period of performance)</td>			
						</tr>
						<tr>
							<td>Firm Fixed Price (Completion):</td>
							<td>$<input type="text"></input></td>
						</tr>						
					</tbody>
				</table>

				<table className="table table-bordered table-striped">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Award Term 03/Option Term: 6 months(period of performance)</td>
						</tr>
						<tr>
							<td>CLIN 1002, FFP- Completion - The Contractor shall provide services for the Government in accordance with the Performance Work Statement (PWS)</td>
						</tr>
					</tbody>
				</table>
				<table className="table table-bordered">
					<thead>
					</thead>
					<tbody>
						<tr>
							<td>Iteration PoP</td>
							<td><input type="text"></input> Weeks</td>			
						</tr>
						<tr>
							<td>Price Per Iteration</td>
							<td>$<input type="text"></input></td>			
						</tr>
						<tr>
							<td>Other Direct Costs</td>
							<td>TBD</td>			
						</tr>
						<tr>
							<td>Period of Performance:</td>
							<td>(period of performance)</td>			
						</tr>
						<tr>
							<td>Firm Fixed Price (Completion):</td>
							<td>$<input type="text"></input></td>
						</tr>						
					</tbody>
				</table>

				<div className="sub-heading">Payment Schedule</div>
				
				<p>We have pre-populated this section with the standard agile contracting text. However you are free to add to, modify or delete this text as you see fit.
				</p>

				{this.state.paymentText}
				{this.state.edit === "paymentText"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'paymentText')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.paymentText} onChange={this.handleChange.bind(this, 'paymentText')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'paymentText')}>Edit</div>
					{this.state.paymentText}
				</div>
				}	
				
				<div className="sub-heading">Award Term Incentive</div>
				<h5>Would you like to include an award or an incentive?</h5>
				<div className="checkbox">
				  <label>
				    <input type="checkbox" value={this.state.awardFee} onChange={this.handleChange.bind(this, "awardFee")}></input>
				    Award Fee
				  </label>
				</div>
				<div className="checkbox">
				  <label>
				    <input type="checkbox" onChange={this.handleChange.bind(this, "incentiveFee")}></input>
				    Incentive Fee
				  </label>
				</div>

				{this.state.awardFee? <div>yes</div> : null}
				

				<br />
				<p>This Task Order shall be Firm Fixed Price/Award Term Incentive. The purpose of the Award Term Incentive is to incentivize superior performance and delivery by offering an additional period of performance. Following the base period, the Government will offer one (1) Award Term Incentive and two (2) additional options pending availability of funds.</p>
			</div>
		);
	},
});
// if they click award fee or incentive fee - not to exceed X. utilize agency specific guidance regarding the [award fee]
// award subjective - specific criteria ex: product is quality, the form works
// incentive fee = objective assessment, ex: stuck to schedule, defect rate was < 5%
// (Jonathan doesn't like...)



module.exports = Services;