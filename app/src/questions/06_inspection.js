var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"inspectionOverview",
	"lateDelivery",
	"workspaceExists",
	"workspaceName",
	"transitionActivities",
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

		// get data from FAR code section
		var rfqId = getId(window.location.hash);
    put_data(6, rfqId, data, cb);
		
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Inspection, Acceptance, Delivery, Transition</div>
				<div className="sub-heading">Overview</div>

				<p>Under the agile methodology, the traditional transition process should not be necessary. Rather, the government should have access to all code and other relevant documents from day one in a clearly documented and organized electronically shared workspace.</p>
				<p>Guiding Principles</p>
				<ol>
					<li>The progress of the product will be inspected by someone from government at the completion of each iteration.</li>
					<li>All documents should be stored electronically such that the CO, PM, and any other relevant government employees who have been granted permissions can access them at any time.</li>
					<li>The transition of materials will occur on an ongoing basis. All new materials produced during an iteration will be made available to the government at the end of that iteration.</li>					
					<li>In addition to the code, documentation should be updated with each iteration. This includes technical documentation including but not limited to setup instructions in the README.md, user reseach findings etc.</li>
					<li>A well designed interface will not require additional training for users. (see USDS playbook #2) and the need for training should be minimized with regular user testing.</li>
				</ol>

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

				<p className="new-content">To support the agile development process we recommend that the COR and vendor establish a collaborative workspace secure file sharing system where information and deliverables can be stored and updated. Example services include Google Drive, Box.com, etc.</p>

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

				<p>This information should also include any systems documentation and training materials developed over the course of the engagement.</p>
				<p>The US Digital Service Playbook strongly recommends the use of a version control system such as Github, or something similar for storing code and system documentation.</p>
		
	
				<p>The Contractor shall:</p>
				<ol>
					<li>Ensure that all deliverables, products, licenses, designs, data, documentation, tests, user research notes, source code, configuration settings and files, and materials developed throughout this Task Order will be the property of the U.S. Government.
					</li>
					<li>Work with the CO from launch to ensure all reference materials and other documents are accessible to the appropriate government personnel at all times. If anything is unclear the CO should bring this to the attention of the contractor immediately.
					</li>
					<li>This documentation may also include but is not limited to user research materials and findings.
					</li>
					<li>Ensure any software written should be stored using version control with the COR and any other relevant government employees will have read access to at a minimum.
					</li>
					<li>Any and all monitoring and analytics dashboards and tools will be accessible to the appropriate government personnel at all times.
					</li>	
					<li>Provide any necessary assistance to the COR and potentially another vendor to stand-up and ensure the applications, systems, databases, platform, and environments are tested and fully operational.
					</li>
					<li>Consult with the COR to determine what is appropriate, effective, and essential for training and provide the services the COR deems necessary.</li>
					
				</ol>

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