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
		var response = event.target.value;
		if (response.length > 1){
			agency = response.split(" (")[1].split(")")[0];
			agencyFullname = "U.S. " + response.split(" (")[0];
			this.setState({response1: true});
		}
	},
	setDoctype: function(event) {
		docType = event.target.value;
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
						<select className="form-control short-response" onChange={this.setAgency}>
							<option></option>
							<option>Department of Education (ED)</option>
							<option>Department of Energy (DOE)</option>
						  <option>Environmental Protection Agency (EPA)</option>
						  <option>General Services Administration (GSA)</option>
						  <option>Department of Labor (DOL)</option>
						  <option>National Archives and Records Administration (NARA)</option>
						  <option>National Aeronautics and Space Administration (NASA)</option>
						  <option>Office of Management and Budget (OMB)</option>
						  <option>Department of Veteran Affairs (VA)</option>
						</select>
					<br />

					<h5>This will be ...</h5>

					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Contract" onClick={this.setDoctype}></input>
					    ... a new purchase under Far 15 (Contract)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Purchase Order" onClick={this.setDoctype}></input>
					    ... a new purchase under Far 13 (Purchase Order)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Task Order" onClick={this.setDoctype}></input>
					    ... being issued off an existing Indefinite Delivery Indefinite Quantity (ID/IQ) (Task Order)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" value="Call" onClick={this.setDoctype}></input>
					    ... being ordered off an existing Blanket Purchase Agreement (BPA) (Call)
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