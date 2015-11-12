var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var Link = require('react-router').Link;

var RequestOverview = React.createClass({
	render: function() {
		return (
			<div>
				<div>
					<p>You're on your way to writing an awesome RFQ or RFP!</p>
					<p>We'll ask you some questions to understand what you want to build,
					and then let you download the generated documents.</p>
					
					
					<h5>Firstly, what agency is this for?</h5>
						<select className="form-control">
						  <option>EPA</option>
						  <option>GSA</option>				  
						  <option>NARA</option>
						  <option>NASA</option>
						  <option>OMB</option>
						</select>
					<br />

					<h5>This is ...</h5>

					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked></input>
					    ... a new purchase under Far 15 (Contract)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"></input>
					    ... a new purchase under Far 13 (Purchase Order)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3"></input>
					    ... being issued off an existing Indefinite Delivery Indefinite Quantity (ID/IQ) (Task Order)
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" name="optionsRadios" id="optionsRadios4" value="option4"></input>
					    ... being ordered off an existing Blanket Purchase Agreement (BPA) (Call)
					  </label>
					</div>


				</div>
				<br />
				<Link to={"/rfp/"+this.props.params.id+"/question/1"}>
					<Button bsStyle="primary">{"Let's go!"}</Button>
				</Link>
			</div>
		);
	},
});

module.exports = RequestOverview;