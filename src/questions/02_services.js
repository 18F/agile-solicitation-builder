var React = require('react');

var Services = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>				
				<h4>2.1 Brief Description of Services</h4>
				<p>(Can add a "use sample text" option where they only fill in agency name and initiative/service this is associated with.)</p>

				<textarea className="form-control" rows="3" placeholder="1-2 sentences"></textarea>

				<p>Ex: Services required under this Task Order are to assist the U.S. Small Business Administration (SBA) with the design and implementation of systems to support the SBA’s 504 Lending Program.</p>

				<h4>2.2 Type of Contract</h4>

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
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"></input>
				    A third type of contract
				  </label>
				</div>
				<div className="radio">
				  <label>
				    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"></input>
				    A third type of contract
				  </label>
				</div>

				<h5>NAICS and FAR Justification Codes</h5>
				<p>Helpful hints go here</p>

				<textarea className="form-control" rows="3"></textarea>

				<h4>2.3 Contract Line Item Number (CLIN) Format</h4>

				<p>@TODO</p>

				<h4>Payment Schedule</h4>
				<textarea className="form-control" rows="3"></textarea>
				<p>The contractor shall be paid upon the completion of each iteration upon its acceptance and verification by the Contracting Officer’s Representative (COR). Invoices shall be submitted at the end of each iteration in accordance with the delivery schedule as established in the Performance Work Statement.</p>

				<h4>2.4 Award Term Incentive</h4>

				<p>This Task Order shall be Firm Fixed Price/Award Term Incentive. The purpose of the Award Term Incentive is to incentivize superior performance and delivery by offering an additional period of performance. Following the base period, the Government will offer one (1) Award Term Incentive and two (2) additional options pending availability of funds.</p>

				<p>There is more text, but Jonathan says it isn't easily re-usable across RFQs/RFPs.</p>

			</div>
		);
	},
});

module.exports = Services;