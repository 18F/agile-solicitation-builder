var React = require('react');

var Deliveries = React.createClass({
	save: function(cb) {
		localStorage.setItem("locationText", this.state.locationText);
		localStorage.setItem("locationRequirement", this.state.locationRequirement);
		localStorage.setItem("performancePeriod", this.state.performancePeriod);
		localStorage.setItem("periodDuration", this.state.periodDuration);
		localStorage.setItem("travelRequirement", this.state.travelRequirement);
		localStorage.setItem("travelBudget", this.state.travelBudget);
		setTimeout(cb, 500);
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
	updateLocation: function(event) {
		this.setState({
			locationText: event.target.value,
		});
	},
	handleChange: function(key, event) {
		console.log(key);
		switch(key) {
			case "travelBudget":
				this.setState({
      		travelBudget: event.target.value,
		    });
		    break;
		}
	},
  getInitialState: function() {
    return {
    	performancePeriod: null,
    	periodDuration: null,
      agency: localStorage.getItem("agency"),
      locationRequirement: false,
      locationText: null,
      docType: localStorage.getItem("docType"),
      travelBudget: localStorage.getItem("travelBudget"),
      travelRequirement: false,
    };
  },

	render: function() {
		return (
			<div>
				<div className="main-heading">Deliveries and Performance</div>
				<div className="sub-heading">Period of Performance</div>

				<p>How many option periods would you like? We suggest no more than 3. <a href="#">Learn More</a>.</p>
				<form className="form-inline">
    			<input type="text" className="form-control short-response" placeholder="enter a number" value={this.state.performancePeriod} onChange={this.handleChange}></input>
				</form>

				<p>How long would you like each individual period of performance to be?</p>
				<div className="sub-text">We suggest 6 months or less, per <a href="#">FAR 39.1</a>.</div>
				<form className="form-inline">
    			<input type="text" className="form-control" placeholder="enter a number">
    			</input>
    			<select className="form-control">
    				<option>months</option>
    				<option>weeks</option>
    			</select>
				</form>

				<div className="resulting-text">Resulting Text</div>
				<p>The Period of Performance for this {this.state.docType} shall be a base period of <b>6 months</b>, with <b>one (1) 6-month</b> Award Term Incentive. <b>Two (2)</b> additional <b>6 month</b> Award Term Options will be included for a total potential period of performance of up to two (2) years as described in section 2.
				</p>
				
				<div className="sub-heading">Place of Performance</div>
				<p>Will you require the contractor to have a full-time working staff presence onsite at a specific location?</p>
				<div className="sub-text">Ex: SBA headquarters in Washington, DC</div>
					<div className="radio">
					  <label>
					    <input type="radio" value="yes" onChange={this.toggleLocation.bind(this, "yes")} checked={this.state.locationRequirement}></input>
					    Yes
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" value="no" onChange={this.toggleLocation.bind(this, "no")} checked={!this.state.locationRequirement}></input>
					    No
					  </label>
					</div>
					{this.state.locationRequirement? <div><input type="text" className="form-control short-response" placeholder="ex: Washington, DC" value={this.state.locationText} onChange={this.handleChange.bind(this, "locationText")}></input><br /></div> : null}


				<div className="resulting-text">Resulting Text</div>
				{this.state.locationRequirement ? <p>The contractor shall have a full-time working staff presence at {this.state.locationText}. Contractor shall have additional facilities to perform contract functions as necessary.</p> : null}
				
				<p>Any off-site development and test environments need to be compliant with {this.state.agency} and federal security guidelines as detailed in the Appendix.</p>
				
				<p className="new-content">Any work with the Government staff shall not take place on Federal holidays or weekends unless directed by the Contracting Officer (CO). All federal holidays by year are listed on the <a href="www.opm.gov" target="_blank">OPM website</a>.</p>

				<div className="sub-heading">Travel</div>

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

				<div className="sub-heading">Packaging and Marking of Deliverables</div>
				<p className="new-content">To support the agile development process we recommend that the COR and vendor establish a secure file sharing system where information and deliverables can be stored and updated. Example services include Google Drive, Box.com, etc.</p>
				<p className="new-content">Any software written should be stored using version control with the COR and any other relevant government employees will have at a minimum read-only access to.</p>				
			</div>
		);
	},
});

// All information and deliverables shall be delivered electronically to the COR, unless otherwise instructed, and shall be marked as follows: 1)	Name and Address of Contractor;	2)	{this.state.docType} Number;	3)	Description of item contained therein; and	4)	Consignee’s name and address.

module.exports = Deliveries;