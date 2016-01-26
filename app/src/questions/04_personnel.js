var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"keyPersonnelIntro",
	"performanceWorkStatement",
	"keyPersonnelRequirements",
	"evaluateKeyPersonnel",
	"clearanceRequired",
	"onSiteRequired",
];

var CLEARANCE_LEVELS = ["None", "Confidential", "Secret", "Top Secret"];

var Requirement = React.createClass({
	mixins: [StateMixin],
	save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}
		var rfqId = getId(window.location.hash);
    put_data(4, "get_content", rfqId, data, cb);
	},
	getInitialState: function() {
		var initialStates = getStates(STATES);
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(4, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
  },
	render: function() {
		var clearance_options = [];
		for (i=0; i < CLEARANCE_LEVELS.length; i++){
			var level = CLEARANCE_LEVELS[i];
			clearance_options.push(
				<div className="radio">
					<label>
						<input type="radio" value={level} checked={level == this.state.clearanceRequired} />{level}
				  </label>
				</div>
			);
		}

		return (
			<div>
				<div className="main-heading">Contractor Personnel</div>
				
				<EditBox
						text={this.state.keyPersonnelIntro}
						editing={this.state.edit === 'keyPersonnelIntro'}
						onStatusChange={this.toggleEdit.bind(this, 'keyPersonnelIntro')}
						onTextChange={this.handleChange.bind(this, 'keyPersonnelIntro')}>
				</EditBox>

				<div className="sub-heading">Security Clearances</div>

				<p>What is the highest level of clearance that will be required?</p>

				<radiogroup onChange={this.handleChange.bind(this, "clearanceRequired")}>
					{clearance_options}
				</radiogroup>

				<p>Will any of the work be done onsite?</p>
				<radiogroup onChange={this.handleChange.bind(this, "onSiteRequired")}>
					<div className="radio">
						<label>
							<input type="radio" value="yes" checked={"yes" == this.state.onSiteRequired} />Yes
					  </label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" value="no" checked={"no" == this.state.onSiteRequired} />No
					  </label>
					</div>
				</radiogroup>

				{(this.state.clearanceRequired == "None")? 
				<div>Contractor personnel will <b>not</b> be required to have a security clearance.</div> :
				<div>Some contractor personnel will be required to have a clearance at the level of <b>{this.state.clearanceRequired}</b>.</div>
				}
				{(this.state.onSiteRequired == "yes")?
				<div>An onsite presence by the contractor will be required.</div> :
				<div>An onsite presence by the contractor will not be required.</div>
				}
				
	
				<div className="sub-heading">Evaluation Process</div>

				<p>Do you want to require and evaluate key personnel?</p>
				<radiogroup onChange={this.handleChange.bind(this, "evaluateKeyPersonnel")}>
					<div className="radio">
						<label>
							<input type="radio" value="yes" checked={"yes" == this.state.evaluateKeyPersonnel} />Yes
					  </label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" value="no" checked={"no" == this.state.evaluateKeyPersonnel} />No
					  </label>
					</div>
				</radiogroup>

				{(this.state.evaluateKeyPersonnel === "yes")? 
				<div>
					<div className="sub-heading">Key Personnel</div>
					<EditBox
							text={this.state.keyPersonnelRequirements}
							editing={this.state.edit === 'keyPersonnelRequirements'}
							onStatusChange={this.toggleEdit.bind(this, 'keyPersonnelRequirements')}
							onTextChange={this.handleChange.bind(this, 'keyPersonnelRequirements')}>
					</EditBox>
				</div> : null}

				<div className="sub-heading">Performance Work Statement</div>
				<EditBox
						text={this.state.performanceWorkStatement}
						editing={this.state.edit === 'performanceWorkStatement'}
						onStatusChange={this.toggleEdit.bind(this, 'performanceWorkStatement')}
						onTextChange={this.handleChange.bind(this, 'performanceWorkStatement')}>
				</EditBox>

			</div>

		);
	},
});

// <p>Some key points to include: if government not happy then these will be the consequences. There needs to be a POC on contractor side who is responsible. If there will be delays because of things on the government side the contractor needs to communicate this ASAP and come up with new schedule with CO/PM.</p>	


module.exports = Requirement;