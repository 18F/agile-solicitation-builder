var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;

var RequestOverview = React.createClass({
	getInitialState: function() {
		return {
			response1: false,
			response2: false,
		};
	},
	setAgency: function(event) {
		var agencyFullNames = {
				"ED": "Department of Education",
				"DOE": "Department of Energy",
				"EPA": "Environmental Protection Agency",
				"GSA": "General Services Administration",
				"DOL": "Department of Labor",
				"NARA": "National Archives and Records Administration",
				"NASA": "National Aeronautics and Space Administration",
				"OMB": "Office of Management and Budget",
				"VA": "Department of Veteran Affairs"
		}
		var response = event.target.value;
		if (response.length > 1){
			localStorage.agency = response;
			localStorage.agencyFullname = "U.S. " + agencyFullNames[response];
			this.setState({response1: true});
		}
	},
	getAgency: function() {
		agency = localStorage.getItem("agency");
	},
	setDoctype: function(event) {
		localStorage.docType = event.target.value;
		this.setState({response2: true});
	},
	render: function() {
		return (
			<div>
				<div>
					<div className="sub-heading">Preliminary Questions</div>
					<p>You're on your way to writing an awesome RFQ or RFP!</p>
					<p>We'll ask you some questions to understand what you want to build,
					and then let you download the generated documents.</p>
					
					
					<h5>Firstly, what agency is this for?</h5>
						<select className="form-control medium-response" onChange={this.setAgency}>
							<option></option>
							<option value="ED">Department of Education (ED)</option>
							<option value="DOE">Department of Energy (DOE)</option>
						  <option value="EPA">Environmental Protection Agency (EPA)</option>
						  <option value="GSA">General Services Administration (GSA)</option>
						  <option value="DOL">Department of Labor (DOL)</option>
						  <option value="NARA">National Archives and Records Administration (NARA)</option>
						  <option value="NASA">National Aeronautics and Space Administration (NASA)</option>
						  <option value="OMB">Office of Management and Budget (OMB)</option>
						  <option value="VA">Department of Veteran Affairs (VA)</option>
						</select>
					<br />

					<h5>This will be ...</h5>

					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Contract" onClick={this.setDoctype}></input>
					    ... a new purchase under Far 15
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Purchase Order" onClick={this.setDoctype} ></input>
					    ... a new purchase under Far 13
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Task Order" onClick={this.setDoctype}></input>
					    ... being issued off an existing Indefinite Delivery Indefinite Quantity (ID/IQ)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Call" onClick={this.setDoctype}></input>
					    ... being ordered off an existing Blanket Purchase Agreement (BPA)
					  </label>
					</div>
				</div>

				<br />
				<Link to={"/rfp/"+this.props.params.id+"/question/1"}>
					<Button bsStyle="primary" disabled={this.state.response1 === false}>{"Let's go!"}</Button>
				</Link>
			</div>
		);
	},
});

module.exports = RequestOverview;