var React = require('react');

var Objective = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>
				<h3>Statement of Objectives</h3>
				<h4>General Background</h4>
				<p>Please provide several paragraphs about your project's history, mission, and current state.</p>

				<textarea className="form-control" rows="9"></textarea>

				<h4>Program History</h4>
				<p>If you have any information about the current vendors and specific technology being used please provide it here.</p>

				<textarea className="form-control" rows="10"></textarea>

				<h4>3.3 Objectives</h4>
				<p>Note: The Statement of Objectives will be removed at time of award and replaced with the Offeror’s Performance Work Statement. All listed objectives and requirements shall be included as part of the Offeror’s Performance Work Statement.</p>

				<h4>3.3.1 Overview </h4>
				<p>Who is your user(s)? Has anyone working on this project done any user research? [learn more here!]</p>

				<p>What are your top five goals for this project? </p>
				<ol>
					<li>
						<input type="text" className="form-control" placeholder="objective"></input>
					</li>
				</ol>
				<h4>Deliverables</h4>
				<p>Would you like to use ...?</p>
				<p>Deliverables under this Task Order are defined as the completion and acceptance according to the “Definition of Done” of the iterations completed, which are based on the contractor’s Agile Software Development methodology. This methodology defines the repeatable process of providing development and deployment services in small iterations lasting two to five weeks which results in usable software, data, or product, which have little to no inherent defects. Each iteration shall be defined in the Performance Work Statement but should document how planning, requirement analysis (user story building), design, coding, testing, quality assurance, and documentation will all meet the contractor’s “Definition of Done”.</p>
				<p>Each deliverable shall incorporate agency IT requirements as detailed in the Appendix of this document and the United States Digital Service Playbook standards (https://playbook.cio.gov) and be compliant with Section 508.</p>
				<div>Deliverables - https://quip.com/SFN4AAN4NA2F</div>
				<p>Functional Requirements, translated into Epics and User Stories that will be used to populate the Product Backlog may include, but are not limited to:
  UX requirements gathering
•	Initial application design and implementation
•	System configuration to support business processes
•	Integration for input and output methods
•	Workflow design and implementation
•	Overall collaboration of applications
•	Enhancements, patches, and updates to applications, data, or cloud systems
•	Data import of records collected from legacy systems
•	Automated testing
•	Training of end users on the systems</p>
			<h4>Stakeholders</h4>
			<p>All possible stakeholders? @TODO</p>

			<h4>Agile Development Management Plan (ADMP) and Key Personnel</h4>
			<p>Offerors shall propose an Agile Development Management Plan (ADMP) which demonstrates how the Offeror intends to manage, develop, implement, and maintain the requirements described in this SOO and the RFQ. The plan shall include, at a minimum:
•	Contact information for all senior leaders and an organizational chart showing the Offeror’s organizational hierarchy and reporting structure, with specific designation of individuals as Key Personnel;
•	Management resources;
•	Technical resources and skill sets required to develop, implement, and maintain the proposed solution; and
•	Details on the management of the Offeror’s team that will be on-site.

The ADMP and the listing of Key Personnel shall become part of the Task Order upon award. 
</p>

<p>The agency [Deputy Chief of Staff], relevant personnel, Contracting Officer, and COR shall hold a Kick-Off meeting/Post-Award Conference in Washington, DC with contractor’s team and other relevant Government staff to review and clarify the project’s objectives, expectations from the Government, and address any questions the Contractor may have.
The Contractor shall provide and collaborate with the COR on an agenda for this meeting. Discussion topics shall include, but not be limited to: introduction of the Contractor and Government Staff; understanding of the specific tasks and subtasks; project management expectations; agreement on meeting schedules; and agreement on initial delivery dates.
The Kick-Off meeting/Post-Award Conference will take place within 10 days from award and will be scheduled by the Contracting Officer.
</p>
<p>Is there a required place of performance? What region the work will be done?</p>

<h4>System Documentation and Training</h4>
<p>The Contractor shall:
•	Provide all system documentation and training to SBA staff (in-person, video, and via webinar).
•	Develop and provide effective training materials of all deliverables, including, but not limited to, “train the trainer” documentation.
•	Conduct “train the trainer” sessions for SBA staff.
•	Consult with the COR to determine what is appropriate, effective, and essential for training.
each iteration gets documentation? should be updated with each iteration
technical documentation?
</p>

			</div>
		);
	},
});

module.exports = Objective;