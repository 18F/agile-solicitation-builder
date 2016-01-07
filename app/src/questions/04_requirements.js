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

var CLEARANCE_LEVELS = ["None", "Public Trust", "Confidential", "Secret", "Top Secret"];

var Requirement = React.createClass({
	mixins: [StateMixin],
	save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}
		var rfqId = getId(window.location.hash);
    put_data(4, rfqId, data, cb);
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
							<input type="radio" value="yes" checked={level == this.state.onSiteRequired} />Yes
					  </label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" value="no" checked={level == this.state.onSiteRequired} />No
					  </label>
					</div>
				</radiogroup>
	
				<div className="sub-heading">Evaluation Process</div>

				<p>Do you want to require and evaluate key personnel?</p>
				<radiogroup onChange={this.handleChange.bind(this, "evaluateKeyPersonnel")}>
					<div className="radio">
						<label>
							<input type="radio" value="yes" checked={level == this.state.evaluateKeyPersonnel} />Yes
					  </label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" value="no" checked={level == this.state.evaluateKeyPersonnel} />No
					  </label>
					</div>
				</radiogroup>
				
				<p>Based on the deliverables described in the SOO, in addition to a project manager, skillsets/personnel needs will include the following:</p>
				<ul>
					<li>UX</li>
					<li>Backend Web Engineer</li>
					<li>Frontend Web Developer</li>
					<li>Devops</li>
				</ul>

				<p>Some key points to include: if government not happy then these will be the consequences. There needs to be a POC on contractor side who is responsible. If there will be delays because of things on the government side the contractor needs to communicate this ASAP and come up with new schedule with CO/PM.</p>	

				<div className="sub-heading">Key Personnel</div>

				<EditBox
						text={this.state.performanceWorkStatement}
						editing={this.state.edit === 'performanceWorkStatement'}
						onStatusChange={this.toggleEdit.bind(this, 'performanceWorkStatement')}
						onTextChange={this.handleChange.bind(this, 'performanceWorkStatement')}>
				</EditBox>

				<EditBox
						text={this.state.keyPersonnelRequirements}
						editing={this.state.edit === 'keyPersonnelRequirements'}
						onStatusChange={this.toggleEdit.bind(this, 'keyPersonnelRequirements')}
						onTextChange={this.handleChange.bind(this, 'keyPersonnelRequirements')}>
				</EditBox>

			</div>

		);
	},
});




module.exports = Requirement;