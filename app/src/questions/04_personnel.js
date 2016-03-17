var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"keyPersonnelIntro",
	"performanceWorkStatement",
	"keyPersonnelRequirements",
	"evaluateKeyPersonnel",
	"notEvaluateKeyPersonnel",
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
				<li className="radio" key={level}>
          <input type="radio" id={"clearance_options:" + level} value={level} checked={level == this.state.clearanceRequired} />
					<label htmlFor={"clearance_options:" + level}>{level}</label>
				</li>
			);
		}

		return (
			<div>
				<div className="page-heading">Contractor Personnel</div>
				<div className="responder-instructions">These questions are typically answered by the PM.</div>
									
				<EditBox
						text={this.state.keyPersonnelIntro}
						editing={this.state.edit === 'keyPersonnelIntro'}
						onStatusChange={this.toggleEdit.bind(this, 'keyPersonnelIntro')}
						onTextChange={this.handleChange.bind(this, 'keyPersonnelIntro')}>
				</EditBox>

				<div className="sub-heading">Security Clearances</div>

        <div className="question">
          <div className="question-text">What is the highest level of clearance that will be required?</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">What is the highest level of clearance that will be required?</legend>
            <ul className="usa-unstyled-list" onChange={this.handleChange.bind(this, "clearanceRequired")}>
              {clearance_options}
            </ul>
          </fieldset>
        </div>

        <div className="question">
          <div className="question-text">Will any of the work be done onsite?</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">Will any of the work be done onsite?</legend>
            <ul className="usa-unstyled-list" onChange={this.handleChange.bind(this, "onSiteRequired")}>
              <li className="radio">
                <input type="radio" id="onSiteRequired:yes" value="yes" checked={"yes" == this.state.onSiteRequired} />
                <label htmlFor="onSiteRequired:yes">Yes</label>
              </li>
              <li className="radio">
                <input type="radio" id="onSiteRequired:no" value="no" checked={"no" == this.state.onSiteRequired} />
                <label htmlFor="onSiteRequired:no">No</label>
              </li>
            </ul>
          </fieldset>

          {(this.state.clearanceRequired == "None")?
            <div className="resulting-text">Contractor personnel will <b>not</b> be required to have a security clearance.</div> :
            <div className="resulting-text">Some contractor personnel will be required to have a clearance at the level of <b>{this.state.clearanceRequired}</b>.</div>
          }
          {(this.state.onSiteRequired == "yes")?
            <div className="resulting-text">An onsite presence by the contractor will be required.</div> :
            <div className="resulting-text">An onsite presence by the contractor will not be required.</div>
          }
        </div>
	
				<div className="sub-heading">Key Personnel Evaluation Process</div>

        <div className="question">
          <div className="question-text">Do you want to require and evaluate key personnel?</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">Do you want to require and evaluate key personnel?</legend>
            <ul className="usa-unstyled-list" onChange={this.handleChange.bind(this, "evaluateKeyPersonnel")}>
              <li className="radio">
                <input type="radio" id="evaluateKeyPersonnel:yes" value="yes" checked={"yes" == this.state.evaluateKeyPersonnel} />
                <label htmlFor="evaluateKeyPersonnel:yes">Yes</label>
              </li>
              <li className="radio">
                <input type="radio" id="evaluateKeyPersonnel:no" value="no" checked={"no" == this.state.evaluateKeyPersonnel} />
                <label htmlFor="evaluateKeyPersonnel:no">No</label>
              </li>
            </ul>
          </fieldset>

          {(this.state.evaluateKeyPersonnel === "yes")?
            <div>
              <div className="sub-heading">Key Personnel</div>
              <EditBox
                  text={this.state.keyPersonnelRequirements}
                  editing={this.state.edit === 'keyPersonnelRequirements'}
                  onStatusChange={this.toggleEdit.bind(this, 'keyPersonnelRequirements')}
                  onTextChange={this.handleChange.bind(this, 'keyPersonnelRequirements')}>
              </EditBox>
            </div> :
            <div>
              <EditBox
                  text={this.state.notEvaluateKeyPersonnel}
                  editing={this.state.edit === 'notEvaluateKeyPersonnel'}
                  onStatusChange={this.toggleEdit.bind(this, 'notEvaluateKeyPersonnel')}
                  onTextChange={this.handleChange.bind(this, 'notEvaluateKeyPersonnel')}>
              </EditBox>
            </div>
          }
        </div>

        <div className="question">
				  <div className="question-text">Performance Work Statement</div>

          <EditBox
						text={this.state.performanceWorkStatement}
						editing={this.state.edit === 'performanceWorkStatement'}
						onStatusChange={this.toggleEdit.bind(this, 'performanceWorkStatement')}
						onTextChange={this.handleChange.bind(this, 'performanceWorkStatement')}>
				  </EditBox>
        </div>
			</div>
		);
	},
});


module.exports = Requirement;