var React = require('react');

				// <div className="sub-heading">Backlog Section</div>
				// <br />
				// <div className="sub-text">The Initial Product Backlog (See Appendix) provides a detailed breakdown of the desired functionality as identified at this time. The Initial Product Backlog is not a binding document, but rather a representative sample of the functionality that is anticipated will be required to be delivered under this Task Order. The specific user stories will be identified through the agile development process as proposed in the Performance Work Statement (PWS). The Initial Product Backlog provides some guidance on specific objectives that should be included in each project.</div>
				// <textarea className="form-control" rows="10"></textarea>

				// end users public, end users government, 


var DELIVERABLES = {
	"1": "Research, Insights, and Synthesis",
	"2": "Prototype Design Solutions",
	"3": "Recommendations",
	"4": "Program Management and Stewardship",
	"5": "UX requirements gathering",
	"6": "Initial application design and implementation",
	"7": "System configuration to support business processes",
	"8": "Integration for input and output methods",
	"9": "Workflow design and implementation",
	"10": "Overall collaboration of applications",
	"11": "Enhancements, patches, and updates to applications, data, or cloud systems",
	"12": "Data import of records collected from legacy systems",
	"13": "Automated testing",
	"14": "Training of end users on the systems"
}

USER_RESEARCH = {			
	"done": "Research has already been conducted, either internally or by another vendor. (proceed to product/program vision questionnaire)",
	"internal": "We intend to conduct user research internally prior to the start date of this engagement.",
 	"vendor": "The vendor will be responsible for the user research."
}

var Objective = React.createClass({
	getInitialState: function() {
		return {
			docType: localStorage.getItem("docType"),
			agency: localStorage.getItem("agency"),
			maxBudget: 0,
			userResearch: "none",
		};
	},
	toggleLocation: function(responseText) {
		if (responseText === "yes") {
			this.setState({
  	    locationRequirement: true,
   	 });
		}
		if (responseText === "no") {
			this.setState({
  	    locationRequirement: false,
   	 });
		}
	},
	updateLocation: function(event) {
		this.setState({
			locationText: event.target.value,
		});
	},
	componentDidMount: function() {
    get_data(3, 1, function(content){
    	var data = content["data"];
    	window.c = data;
      this.setState({
      	generalBackground: data[0]["text"],
      	locationRequirement: data[1]["text"],
      	locationText: data[2]["text"],
      	maxBudget: data[3]["text"],
				programHistory: data[4]["text"],
      	userResearchStrategy: data[5]["text"],
      });
    }.bind(this));
  },
	handleChange: function(key, event) {
		switch(key) {
			case "maxBudget":
				this.setState({
					maxBudget : event.target.value,
				});
				break;
			case "userResearch":
				this.setState({
					userResearch : event.target.value,
				});
				break;
			case "locationText":
		  	this.setState({
					locationText: event.target.value,
				});
				break;
		}
	},
	save: function(cb) {
		// put_data("maxBudget", this.state.text);
		setTimeout(cb, 500);
	},
	render: function() {

		var deliverables = [];
		for(var key in DELIVERABLES) {
			deliverables.push(
				<div className="checkbox">
					<label>
						<input type="checkbox" value={key} />{ DELIVERABLES[key] }
				  </label>
				</div>
			);
		}

		var userResearchOptions = [];
		for(var key in USER_RESEARCH) {
			userResearchOptions.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.userResearch} />{ USER_RESEARCH[key] }
				  </label>
				</div>
			);
		}

		return (
			<div>
				<div className="main-heading">Statement of Objectives</div>
				<p>This section has many components.</p>

				<div className="sub-heading">General Background</div>
				<p>Please provide several paragraphs about your project's history, mission, and current state.</p>

				<textarea className="form-control" rows="9"></textarea>

				<div className="sub-heading">Program History</div>
				<p>If you have any information about the current vendors and specific technology being used please provide it here.</p>

				<textarea className="form-control" rows="10"></textarea>

				<div className="sub-heading">Objectives</div>
				<p>Note: The Statement of Objectives will be removed at time of award and replaced with the Offeror’s Performance Work Statement. All listed objectives and requirements shall be included as part of the Offeror’s Performance Work Statement.</p>

				<p>What is the maximum budget for your project?</p>
				<form className="form-inline">
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">$</div>
	    				<input type="text" className="form-control short-response" placeholder="ex: 10,000,000" value={this.state.maxBudget} onChange={this.handleChange.bind(this, "maxBudget")}></input>
	    			</div>
	    		</div>
				</form>

				<p>The government is willing to invest a maximum budget of ${this.state.maxBudget} in this endeavor.</p>


				<div className="sub-heading">Specific Tasks and Deliverables</div>
				<p>Which of the following do you anticipate your project will need?</p>

				<div className="sub-text">We have already checked certain components that the USDS Playbook suggests be required for all projects.</div>
					{deliverables}

				<p>These functional Requirements will be translated into Epics and User Stories that will be used to populate the Product Backlog.</p>


				<div className="sub-heading">Overview </div>

					<p>The primary users of this X are:</p>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="internal_p"></input>
					    Internal (people)
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="external_p"></input>
					    External Public (people)
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="external_p"></input>
					    External Public (people)
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="internal_s"></input>
					    Internal IT employees (systems, developers)
					  </label>
					</div>
					<div className="checkbox">
					  <label>
					    <input type="checkbox" value="external_s"></input>
					    External (systems, developers)
					    government IT customer, 
					  </label>
					</div>

				<p>What is your User Research Strategy?</p>

				<radiogroup onChange={this.handleChange.bind(this, 'userResearch')}>
					{userResearchOptions}
				</radiogroup>

				<p>The team within {this.state.agency} managing this contract commit to support the vendor in the user research process, and will provide the vendor with access to the government employees who will be the users of the product.</p>
	
				{(this.state.userResearch === "vendor")?
					<div>
						<div className="sub-heading">Understand what people need</div>
						<p>The vendor services will include exploring and pinpointing the needs of the people who will use the service, and the ways the service will fit into their lives. The vendor shall continually test the products with real people to ensure delivery is focused on what is important.</p>
						<p>As a part of this effort, the vendor will:</p>
						<ol>
							<li>Early in the project, spend time with current and prospective users of the service</li>
							<li>Use a range of qualitative and quantitative research methods to determine people’s goals, needs, and behaviors; be thoughtful about the time spent</li>
							<li>Test prototypes of solutions with real people, in the field if possible</li>
							<li>Document the findings about user goals, needs, behaviors, and preferences</li>
							<li>Share findings with the team and agency leadership</li>
							<li>Create a prioritized list of tasks the user is trying to accomplish, also known as "user stories"</li>
							<li>As the digital service is being built, regularly test it with potential users to ensure it meets people’s needs</li>
						</ol>
					<p>The contractor shall ensure we understand the different ways people will interact with the services, including the actions they take online, through a mobile application, on a phone, or in person. Every encounter — whether it's online or offline — should move the user closer towards their goal.</p>
						<p>In delivery of this effort the contractor shall:</p>
						<ol>
							<li>Understand the different points at which people will interact with the service – both online and in person</li>
							<li>Identify pain points in the current way users interact with the service, and prioritize these according to user needs</li>
							<li>Design the digital parts of the service so that they are integrated with the offline touch points people use to interact with the service</li>
							<li>Develop metrics that will measure how well the service is meeting user needs at each step of the service</li>
						</ol>
					</div> : null
			}

			<div className="sub-heading">Make it simple and intuitive</div>

			<p>Successful delivery of this contract requires that the services of and products delivered will not be stressful, confusing, or daunting. Therefore the contractor shall build services that are simple and intuitive enough that users succeed the first time, unaided.</p>

			<p>In delivery of this effort the contractor shall:</p>

			<ol>
				<li>Use a simple and flexible design style guide for the service. Use the U.S. Web Design Standards (https://playbook.cio.gov/designstandards) as a default</li>
				<li>Use the design style guide consistently for related digital services</li>
				<li>Give users clear information about where they are in each step of the process</li>
				<li>Follow accessibility best practices to ensure all people can use the service</li>
				<li>Provide users with a way to exit and return later to complete the process</li>
				<li>Use language that is familiar to the user and easy to understand</li>
				<li>Use language and design consistently throughout the service, including online and offline touch points</li>
			</ol>

			<div className="sub-heading">Use data to drive decisions</div>

			<p>At every stage of a project, the contractor shall measure how well our service is working for our users. This includes measuring how well a system performs and how people are interacting with it in real-time. These metrics shall be reported to the Program Managers to find issues and identify which bug fixes and improvements should be prioritized. Along with monitoring tools, a feedback mechanism should be in place for people to report issues directly.</p>

			<p>In delivery of this effort the contractor shall:</p>
			<ol>
				<li>Monitor system-level resource utilization in real time <b>(Suggest tools)</b></li>
				<li>Monitor system performance in real-time (e.g. response time, latency, throughput, and error rates)</li>				
				<li>Ensure monitoring can measure median, 95th percentile, and 98th percentile performance</li>
				<li>Create automated alerts based on this monitoring</li>
				<li>Track concurrent users in real-time, and monitor user behaviors in the aggregate to determine how well the service meets user needs</li>
				<li>Provide metrics which may be published internally</li>
				<li>Provide Metrics which may be published externally</li>
				<li>Use an experimentation tool that supports multivariate testing in production</li>
				<li><b>Provide goverment employees access to these monitoring systems</b></li>
			</ol>

				<div className="sub-heading">Deliverables</div>
				<p>A deliverable will be considered complete and acceptable when it meets the contractor's "Definition of Done" which are based on the contractor’s Agile Software Development methodology.</p>
				<p>Each deliverable shall incorporate agency IT requirements as detailed in the Appendix of this document and the <a href="https://playbook.cio.gov" target="_blank">United States Digital Service Playbook</a> standards and be compliant with Section 508. (see <a>here</a>)</p>

				<div className="sub-heading">Agile Development Management Plan (ADMP) and Key Personnel </div>
				<p>The performance work statement will include:</p>
				<ul>
					<li>Contact information for all senior leaders and an organizational chart showing the Offeror’s organizational hierarchy and reporting structure, with specific designation of individuals as Key Personnel;
					</li>
					<li>Management resources;
					</li>
					<li>Technical resources and skill sets required to develop, implement, and maintain the proposed solution; and
					</li>
					<li>Details on the management of the Offeror’s team that will be on-site.
					</li>
				</ul>
				<p>The ADMP and the listing of Key Personnel shall become part of the {this.state.docType} upon award.</p>

				<div className="sub-heading">Place of Performance</div>
				<p>Will you require the contractor to have a full-time working staff presence onsite at a specific location?</p>
				<div className="sub-text">Ex: SBA headquarters in Washington, DC</div>
					<div className="radio">
					  <label>
					    <input type="radio" value="yes" onChange={this.toggleLocation.bind(this, "yes")} checked={this.state.locationRequirement}></input>
					    Yes
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" value="no" onChange={this.toggleLocation.bind(this, "no")} checked={!this.state.locationRequirement}></input>
					    No
					  </label>
					</div>
					{this.state.locationRequirement? <div><input type="text" className="form-control short-response" placeholder="ex: Washington, DC" value={this.state.locationText} onChange={this.handleChange.bind(this, "locationText")}></input><br /></div> : null}


				<div className="resulting-text">Resulting Text</div>
				{this.state.locationRequirement ? <p>The contractor shall have a full-time working staff presence at {this.state.locationText}. Contractor shall have additional facilities to perform contract functions as necessary.</p> : null}
				
				<p>Any off-site development and test environments need to be compliant with {this.state.agency} and federal security guidelines as detailed in the Appendix.</p>
				
				<div className="sub-heading">Kick-Off Meeting/Post-Award Conference</div>
				
				<p>The agency's relevant personnel, Contracting Officer, and COR shall hold a Kick-Off meeting/Post-Award Conference in {this.state.locationText} with contractor’s team and other relevant Government staff to review and clarify the project’s objectives, expectations from the Government, and address any questions the Contractor may have.</p>
				<p>The Contractor shall provide and collaborate with the COR on an agenda for this meeting. Discussion topics shall include, but not be limited to: introduction of the Contractor and Government Staff; understanding of the specific tasks and subtasks; project management expectations; agreement on meeting schedules; and agreement on initial delivery dates.</p>
				<p>The Kick-Off meeting/Post-Award Conference will take place within 10 days from award and will be scheduled by the Contracting Officer.</p>

				<div className="sub-heading">System Documentation and Training</div>
				
				
				<div>Are you currently using a collaborative workspace?</div>
				<div className="sub-text">Ex: Sharepoint, JIRA, Rally, Google Drive, Box, etc.</div>
				<p>We strongly encourage the use of a collaborative environment</p>
				check with agency policy to see which collaboration software is allowed. ex: box.com, google drive/google docs, 
				code - version control, define what is, examples. (encourage certain options, but vendor will specify)
				for documents is separate
				<p>Github: version control</p>
				<p>The Contractor shall:</p>
				<ul>
					<li>Provide all system documentation and training to {this.state.agency} staff (in-person, video, and via webinar).</li>
					<li>Develop and provide effective training materials of all deliverables, including, but not limited to, “train the trainer” documentation.</li>
					<li>Conduct “train the trainer” sessions for {this.state.agency} staff.</li>
					<li>Consult with the COR to determine what is appropriate, effective, and essential for training.</li>
				</ul>

				<p>Furthermore, documentation should be updated with each iteration. This includes technical documentation including but not limited to setup instructions in the README.md, user reseach findings etc. All documents should be stored electronically such that the CO, PM, and any other relevant government employees who have been granted permissions can access them at any time.</p>
			</div>
		);
	},
});


// <p>The primary users of this digital service will include X, Y, Z.</p> <p>To ensure the system supports interoperability,  must be followed. (see section). To ensure the user interface is X, Y (playbook language) @TODO</p><p>Do you believe training will be required? @TODO ask VA & 18F consulting</p>
module.exports = Objective;