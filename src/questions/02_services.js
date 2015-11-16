var React = require('react');

var defaultPaymentText = "The contractor shall be paid upon the completion of each iteration upon its acceptance and verification by the Contracting Officer’s Representative (COR). Invoices shall be submitted at the end of each iteration in accordance with the delivery schedule as established in the Performance Work Statement."

var Services = React.createClass({
	getInitialState: function() {
		return {
			response: false,
			textInBox: false,
			paymentText: defaultPaymentText,
		};
	},
	handleChange: function(section, event) {
    this.setState({paymentText : event.target.value });
  },
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Services and Prices</div>

				<span className="sub-heading">Brief Description of Services</span>
				<p>Ex: Services required under this Task Order are to assist the U.S. Small Business Administration (SBA) with the design and implementation of systems to support the SBA’s 504 Lending Program.</p>
				<textarea className="form-control" rows="4" placeholder="1-2 sentences"></textarea>				

				<span className="sub-heading">Type of Contract</span>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked></input>
				    Firm Fixed Price
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"></input>
				    Time and Materials
				  </label>
				</div>

				<h5>NAICS and FAR Justification Codes</h5>
				<p>Helpful hints go here</p>

				<textarea className="form-control" rows="4" defaultValue="This requirement will be solicited under the following North American Industrial Classification System (NAICS) Code: 541512, Computer Systems Design Services, [TOTAL COST]. This Task Order will be made in accordance with FAR 16.505 which governs orders placed under Indefinite Delivery contracts as detailed in the GSA GWAC Ordering guide."></textarea>

				<span className="sub-heading">Contract Line Item Number (CLIN) Format</span>

				<p>@TODO</p>

				<span className="sub-heading">Payment Schedule</span>
					<p>We have pre-populated this section with the standard agile contracting text. However you are free to add to, modify or delete this text as you see fit.
					</p>												
					<textarea className="form-control" rows="3" onChange={this.handleChange.bind(this, 'paymentText')} defaultValue={this.state.paymentText}>
					</textarea>								
				
				<span className="sub-heading">Award Term Incentive</span>
				<h5>Would you like to include an award or an incentive?</h5>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    Award Fee
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    Incentive Fee
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value=""></input>
					    Award Term <span className="help">?</span>
					  </label>
					</div>

				<p>(if firm fixed price?) This Task Order shall be Firm Fixed Price/Award Term Incentive. The purpose of the Award Term Incentive is to incentivize superior performance and delivery by offering an additional period of performance. Following the base period, the Government will offer one (1) Award Term Incentive and two (2) additional options pending availability of funds.</p>
			</div>
		);
	},
});

module.exports = Services;