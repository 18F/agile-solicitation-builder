var React = require('react');
var StateMixin = require("../state_mixin");

var STATES = [
	"inspectionOverview",
	"lateDelivery",
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
	render: function() {
		return (
			<div>
				<div className="main-heading">Inspection, Acceptance, Delivery, Transition</div>
				<div className="sub-heading">Overview</div>

				<p>Under the agile methodology, the traditional transition process should not be necessary. Rather, the government should have access to all code and other relevant documents from day one in a clearly documented and organized electronically shared workspace.</p>
				<p>Guiding Principles</p>
				<ol>
					<li>The progress of the product will be inspected by someone from government every X weeks.</li>
					<li>A well designed interface will not require additional training for users. (see USDS playbook #2)</li>
				</ol>

				<div className="sub-heading">Punctuality</div>

				{this.state.edit === "inspectionOverview"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'inspectionOverview')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.inspectionOverview} onChange={this.handleChange.bind(this, 'inspectionOverview')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'inspectionOverview')}>Edit</div>
					{this.state.inspectionOverview}
				</div>
				}

				<br />


				<div className="sub-heading">Notice Regarding Late Delivery</div>
				{this.state.edit === "lateDelivery"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'lateDelivery')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.lateDelivery} onChange={this.handleChange.bind(this, 'lateDelivery')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'lateDelivery')}>Edit</div>
					{this.state.lateDelivery}
				</div>
				}
				<br />

				<div className="sub-heading">Transition Plan</div>

				<div className="sub-heading">Packaging and Marking of Deliverables</div>
				<p className="new-content">To support the agile development process we recommend that the COR and vendor establish a secure file sharing system where information and deliverables can be stored and updated. Example services include Google Drive, Box.com, etc.</p>
				<p className="new-content">Any software written should be stored using version control with the COR and any other relevant government employees will have at a minimum read-only access to.</p>
			
	
				<p>The Contractor shall:</p>
				<ol>
					<li>Ensure that all deliverables, products, licenses, designs, data, documentation, tests, user research notes, source code, configuration settings and files, and materials developed throughout this Task Order will be the property of the U.S. Government.
					</li>
					<li>From day ONE the CO should be reviewing the reference/inventory documents to ensure everything is accessible. If anything is unclear CO should bring this to the attention of the contractor ASAP. </li>
					<li>Reference section that talks about documents.
					All documentation shall be viewable at all times by all parties. 
					includes code, monitoring systems, 
					in support of an eventual transition reference sections X, Y, that talk about viewability, monitoring, code, user research. 
					</li>
					<li>Provide assistance to the COR and potentially another vendor to stand-up and ensure the applications, systems, databases, platform, and environments are tested and fully operational.
					</li>
				</ol>

				<p>@TODO standard for code</p>

				<div className="sub-heading">Transition Activities</div>

				<ol>
					<li>During the transition to the Government and/or a new contractor, the Contractor shall perform all necessary transition activities, including, but not limited to, continued full services to AGENCY; participation, at discretion of COR in five or more meetings with the Government or new contractor to effect a smooth transition and provide detailed information on the operation of all deliverables; training of new personnel (contractor or Government) during transition period, in all system operation and maintenance functions; appropriate close-out of outstanding technical and related work. Should be available to answer questions. 
					</li>
					<li>Information such as the list of accomplishments, documentation, and customized code developed for AGENCY should be available to the Government in the collaborative workspace established from contract initiation. Should the Contractor be terminated prior to the end of the scheduled base period, the Contractor shall work with the Government to ensure they retain access to this information within two weeks from the termination date.
					</li>
				</ol>

								<div className="sub-heading">System Documentation and Training</div>
				
				
				<div>Are you currently using a collaborative workspace?</div>
				<div className="sub-text">Ex: Sharepoint, JIRA, Rally, Google Drive, Box, etc.</div>
				<p>We strongly encourage the use of a collaborative environment</p>
				check with agency policy to see which collaboration software is allowed.
				code - version control, define what is, examples. (encourage certain options, but vendor will specify)
				for documents is separate
				<p>Github: version control</p>

				<p>The Contractor shall:</p>
				<ul>
					<li>Provide all system documentation and training to AGENCY staff (in-person, video, and via webinar).</li>
					<li>Develop and provide effective training materials of all deliverables, including, but not limited to, “train the trainer” documentation.</li>
					<li>Conduct “train the trainer” sessions for AGENCY staff.</li>
					<li>Consult with the COR to determine what is appropriate, effective, and essential for training.</li>
				</ul>

				<p>Furthermore, documentation should be updated with each iteration. This includes technical documentation including but not limited to setup instructions in the README.md, user reseach findings etc. All documents should be stored electronically such that the CO, PM, and any other relevant government employees who have been granted permissions can access them at any time.</p>
			

			</div>

		);
	},
});


module.exports = Inspection;