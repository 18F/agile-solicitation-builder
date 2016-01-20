var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"guidingPrinciples",
	"inspectionOverview",
	"lateDelivery",
	"workspaceExists",
	"workspaceName",
	"transitionActivities",
	"deliveringDeliverables",
];

var Inspection = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		var initialStates = getStates(STATES);
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(6, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );      
    }.bind(this));
  },
  save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		var rfqId = getId(window.location.hash);
    put_data(6, "get_content", rfqId, data, cb);
		
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Inspection, Acceptance, Delivery, Transition</div>
				<div className="sub-heading">Overview</div>

				<EditBox
						text={this.state.guidingPrinciples}
						editing={this.state.edit === 'guidingPrinciples'}
						onStatusChange={this.toggleEdit.bind(this, 'guidingPrinciples')}
						onTextChange={this.handleChange.bind(this, 'guidingPrinciples')}>
				</EditBox>

				<div className="sub-heading">Delivery & Timing</div>

				<EditBox
						text={this.state.inspectionOverview}
						editing={this.state.edit === 'inspectionOverview'}
						onStatusChange={this.toggleEdit.bind(this, 'inspectionOverview')}
						onTextChange={this.handleChange.bind(this, 'inspectionOverview')}>
				</EditBox>


				<div className="sub-heading">Notice Regarding Late Delivery</div>

				<EditBox
						text={this.state.lateDelivery}
						editing={this.state.edit === 'lateDelivery'}
						onStatusChange={this.toggleEdit.bind(this, 'lateDelivery')}
						onTextChange={this.handleChange.bind(this, 'lateDelivery')}>
				</EditBox>

				<div className="sub-heading">Delivering Deliverables</div>

				<p className="new-content">To support the agile development process we recommend that the COR and vendor establish a collaborative workspace secure file sharing system where information and deliverables can be stored and updated.</p>

				<p>Is your team currently using a collaborative workspace?</p>
				<div className="sub-text">Ex: Sharepoint, JIRA, Rally, Google Drive, Box, etc.</div>

				<radiogroup onChange={this.handleChange.bind(this, "workspaceExists")}>
					<div className="radio">
						<label>
							<input type="radio" value="yes" checked={"yes" == this.state.workspaceExists} />Yes
					  </label>
					</div>
					<div className="radio">
						<label>
							<input type="radio" value="no" checked={"no" == this.state.workspaceExists} />No
					  </label>
					</div>
				</radiogroup>

				
				{(this.state.workspaceExists=="yes")? 
				<div>
					<p>What workspace are you currently using?</p>
					<input type="text" className="form-control short-response" onChange={this.handleChange.bind(this, "workspaceName")} value={this.state.workspaceName} />
					<p>Currently the team is using {this.state.workspaceName}</p>
				</div>
				: null
				}
				<p>This information should also include any systems documentation and training materials developed over the course of the engagement.</p>
				<p>The US Digital Service Playbook strongly recommends the use of a version control system such as Github, or something similar for storing code and system documentation.</p>
		
	
				<p>The Contractor shall:</p>

				<EditBox
						text={this.state.deliveringDeliverables}
						editing={this.state.edit === 'deliveringDeliverables'}
						onStatusChange={this.toggleEdit.bind(this, 'deliveringDeliverables')}
						onTextChange={this.handleChange.bind(this, 'deliveringDeliverables')}>
				</EditBox>

				<div className="sub-heading">Transition Activities</div>

				<EditBox
						text={this.state.transitionActivities}
						editing={this.state.edit === 'transitionActivities'}
						onStatusChange={this.toggleEdit.bind(this, 'transitionActivities')}
						onTextChange={this.handleChange.bind(this, 'transitionActivities')}>
				</EditBox>



			</div>

		);
	},
});


module.exports = Inspection;