var React = require('react');

var Deliveries = React.createClass({
	save: function(cb) {
		localStorage.setItem("locationText", this.state.locationText);
		localStorage.setItem("locationRequirement", this.state.locationRequirement);
		localStorage.setItem("travelRequirement", this.state.travelRequirement);
		localStorage.setItem("travelBudget", this.state.travelBudget);
		setTimeout(cb, 500);
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
	handleChange: function(key, event) {
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
      docType: localStorage.getItem("docType"),
      travelBudget: localStorage.getItem("travelBudget"),
      travelRequirement: false,
    };
  },

	render: function() {
		return (
			<div>
				<div className="main-heading">Deliveries and Performance</div>
				<div className="sub-heading">Other</div>
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