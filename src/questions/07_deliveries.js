var React = require('react');


var Deliveries = React.createClass({
	render: function() {
		return (
			<div>
				<div className="main-heading">Deliveries and Performance</div>
				<div className="sub-heading">Period of Performance</div>

				<p>How many option periods would you like? We suggest no more than 3. <a href="#">Learn More</a>.</p>
				<form className="form-inline">
    			<input type="text" className="form-control short-response" placeholder="enter a number" id="period-perf"></input>

				</form>

				<p>How long would you like each individual period of performance to be?</p>
				<div className="sub-text">We suggest 6 months or less, per <a href="#">FAR 39.1</a>.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number" id="period-perf"></input>
    			<select className="form-control">
    				<option>months</option>
    				<option>weeks</option>
    			</select>
				</form>

				<div className="resulting-text">Resulting Text</div>
				<p>The Period of Performance for this Task Order shall be a base period of <b>6 months</b>, with <b>one (1) 6-month</b> Award Term Incentive. <b>Two (2)</b> additional <b>6-month</b> Award Term Options will be included for a total potential period of performance of up to two (2) years as described in section 2.
				</p>
				
				<div className="sub-heading">Place of Performance</div>
				<p>Will you require the contractor to have a full-time working staff presence onsite at a specific location?</p>
				<div className="sub-text">Ex: SBA headquarters in Washington, DC</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"></input>
					    Yes
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"></input>
					    No
					  </label>
					</div>

				<div className="resulting-text">Resulting Text</div>
				<p>The contractor shall have a full-time working staff presence at [location]. Contractor shall have additional facilities to perform contract functions as necessary.</p>
				<p>Any off-site development and test environments need to be compliant with [agency name] and federal security guidelines as detailed in the Appendix.</p>
				<p className="new-content">Any work with the Government staff shall not take place on Federal holidays or weekends unless directed by the Contracting Officer (CO). All federal holidays by year are listed on the <a href="www.opm.gov" target="_blank">OPM website</a>.</p>

				<div className="sub-heading">Packaging and Marking of Deliverables</div>
				<p>what is your total period of performance? (suggest not more than 3)
				how many option periods would you like? 
				how long would you like each individual period of performance to be?
				(suggested per FAR 39.1 consider less or= 6 mo per period)
				if they answer it will populate into some kind of paragraph.
				</p>
			</div>
		);
	},
});

module.exports = Deliveries;