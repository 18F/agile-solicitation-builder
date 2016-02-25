var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"guidingPrinciples",
	"inspectionOverview",
	"lateDelivery",
	"workspaceIntro",
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
				<div className="page-heading">Inspection, Acceptance, Delivery, Transition</div>
				<div className="responder-instructions">The content in this section should be decided on by both the CO and the PM.</div>

				<div className="sub-heading">Overview</div>

				<EditBox
						text={this.state.guidingPrinciples}
						editing={this.state.edit === 'guidingPrinciples'}
						onStatusChange={this.toggleEdit.bind(this, 'guidingPrinciples')}
						onTextChange={this.handleChange.bind(this, 'guidingPrinciples')}>
				</EditBox>

				<div className="sub-heading">Delivery & Timing</div>

				<div className="question-text">Government Acceptance</div>

				<EditBox
						text={this.state.inspectionOverview}
						editing={this.state.edit === 'inspectionOverview'}
						onStatusChange={this.toggleEdit.bind(this, 'inspectionOverview')}
						onTextChange={this.handleChange.bind(this, 'inspectionOverview')}>
				</EditBox>

				<div className="question-text">Notice Regarding Late Delivery</div>

				<EditBox
						text={this.state.lateDelivery}
						editing={this.state.edit === 'lateDelivery'}
						onStatusChange={this.toggleEdit.bind(this, 'lateDelivery')}
						onTextChange={this.handleChange.bind(this, 'lateDelivery')}>
				</EditBox>

				<div className="sub-heading">Delivering Deliverables</div>

				<div className="guidance-text">The US Digital Service Playbook strongly recommends the use of a version control system such as Github, or similar for storing code and system documentation.</div>

				<EditBox
						text={this.state.workspaceIntro}
						editing={this.state.edit === 'workspaceIntro'}
						onStatusChange={this.toggleEdit.bind(this, 'workspaceIntro')}
						onTextChange={this.handleChange.bind(this, 'workspaceIntro')}>
				</EditBox>

				<div className="question-text">Is your team currently using a collaborative workspace?</div>
				<div className="question-description">Ex: Sharepoint, JIRA, Rally, Google Drive, Box, etc.</div>

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

				<div className="resulting-text">The contractor will work with the PM and CO to establish a collaborative workspace that is acceptable for both parties.</div>
				{(this.state.workspaceExists == "yes")? 
				<div>
					<div className="question-text">What workspace are you currently using?</div>
					<input type="text" className="form-control short-response" onChange={this.handleChange.bind(this, "workspaceName")} value={this.state.workspaceName} />					
					{(this.state.workspaceName.length > 0)? 
						<div className="resulting-text">Currently the government team is using {this.state.workspaceName}.</div> : null
					}
				</div>
				: null
				}
				
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