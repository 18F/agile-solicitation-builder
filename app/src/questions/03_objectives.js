var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

// <div className="sub-text">The Initial Product Backlog (See Appendix) provides a detailed breakdown of the desired functionality as identified at this time. The Initial Product Backlog is not a binding document, but rather a representative sample of the functionality that is anticipated will be required to be delivered under this Task Order. The specific user stories will be identified through the agile development process as proposed in the Performance Work Statement (PWS). The Initial Product Backlog provides some guidance on specific objectives that should be included in each project.</div>

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
	"14": "Training of end users on the systems",
	"15": "Native mobile application(s)",
	"16": "Mobile responsive web application(s)",
	"17": "Application capable of supporting high user traffic",
	"18": "Devops, continuous integration and continuous deployment"
};

var USER_RESEARCH = {			
	"done": "Research has already been conducted, either internally or by another vendor. (proceed to product/program vision questionnaire)",
	"internal": "We intend to conduct user research internally prior to the start date of this engagement.",
 	"vendor": "The vendor will be responsible for the user research."
};

var KICK_OFF_MEETING = {
	"remote": "Remote Meeting",
	"in-person": "In-person Meeting",
	"none": "No Meeting",
};

var USER_TYPES = {
	"internal_people": "Internal/Government Employees",
	"external_people": "External/The Public",
	"internal_it": "Internal IT employees (systems, developers)",
	"external_it": "External IT",
};

var STATES = [
	"definitionOfDone",
	"deliverables",
	"external_it",
	"external_people",
	"generalBackground",
	"internal_it",
	"internal_people",
	"kickOffMeeting",
	"kickOffMeetingInPerson",
	"kickOffMeetingRemote",
	"locationRequirement",
	"locationText",
	"offSiteDevelopmentCompliance",
	"programHistory",
	"userAccess",
	"userResearchStrategy",
];

var Objective = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		var initialStates = getStates(STATES);
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(3, rfqId, function(content){
    	var components = getComponents(content["data"]);
      this.setState( components );
    }.bind(this));
  },
  handleCheck: function(key, event) {
  	var newState = {};
  	var currentState = this.state[key];
  	if (currentState == "false"){
  		newState[key] = "true";
  	}
  	else{
  		newState[key] = "false";
  	}
  	this.setState(newState);
  },
  getUsers: function(){
  	var usersString = "";
  	for (var key in USER_TYPES){
  		if (this.state[key] == "true"){
  			console.log('getting users?');
  			usersString += USER_TYPES[key] + ", ";
  		}
  	}
  	return usersString;
  },
	save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		// get data from FAR code section
		var rfqId = getId(window.location.hash);
    put_data(3, rfqId, data, cb);
	},
	render: function() {

		var deliverables = [];
		for (var key in DELIVERABLES) {
			deliverables.push(
				<div className="checkbox">
					<label>
						<input type="checkbox" value={key} />{ DELIVERABLES[key] }
				  </label>
				</div>
			);
		}

		var userTypesOptions = [];
		for (var key in USER_TYPES){
			userTypesOptions.push(
				<div className="checkbox">
				  <label>
				    <input type="checkbox" onClick={this.handleCheck.bind(this, key)} checked={this.state[key] == "true"}></input>
				    {USER_TYPES[key]}
				  </label>
				</div>
			);
		}

		var userResearchOptions = [];
		for (var key in USER_RESEARCH) {
			userResearchOptions.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.userResearchStrategy} />{ USER_RESEARCH[key] }
				  </label>
				</div>
			);
		}

		var kickOffMeetingOptions = [];
		for (var key in KICK_OFF_MEETING) {
			kickOffMeetingOptions.push(
				<div className="radio">
					<label>
						<input type="radio" value={key} checked={key == this.state.kickOffMeeting} />{ KICK_OFF_MEETING[key] }
				  </label>
				</div>
			);
		}

		var usersString = "";
		for (var key in USER_TYPES){
  		if (this.state[key] == "true"){
  			console.log('getting users?');
  			usersString += USER_TYPES[key] + ", ";
  		}
  	}

		return (
			<div>
				<div className="main-heading">Statement of Objectives</div>
				<p>This section has many components!</p>

				<div className="sub-heading">General Background</div>
				<p>Please provide several paragraphs about your project's history, mission, and current state.</p>

				<textarea className="form-control" rows="9" value={this.state.generalBackground} onChange={this.handleChange.bind(this, 'generalBackground')}></textarea>

				<div className="sub-heading">Program History</div>
				<p>If you have any information about the current vendors and specific technology being used please provide it here.</p>

				<textarea className="form-control" rows="10" value={this.state.programHistory} onChange={this.handleChange.bind(this, 'programHistory')}></textarea>

				<div className="sub-heading">Specific Tasks and Deliverables</div>
				<p>Which of the following do you anticipate your project will need?</p>

				<div className="sub-text">We have already checked certain components that the USDS Playbook suggests be required for all projects.</div>
				
				{deliverables}

				<p>These functional Requirements will be translated into Epics and User Stories that will be used to populate the Product Backlog.</p>

				<div className="sub-heading">Users</div>
				<p>The primary users will be:</p>

					{userTypesOptions}

				{(usersString.length > 0)? 
				<p>The users of the product will include {usersString}.</p> : null}

				<div className="sub-heading">User Research</div>
				<p>What is your User Research Strategy?</p>

				<radiogroup onChange={this.handleChange.bind(this, 'userResearchStrategy')}>
					{userResearchOptions}
				</radiogroup>

				<EditBox
						text={this.state.userAccess}
						editing={this.state.edit === 'userAccess'}
						onStatusChange={this.toggleEdit.bind(this, 'userAccess')}
						onTextChange={this.handleChange.bind(this, 'userAccess')}>
				</EditBox>
	
				{(this.state.userResearchStrategy === "vendor")?
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
				<li>Apply <b>these language and design standards consistently</b> throughout the service, including online and offline touch points</li>
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
				<li>Provide metrics which may be published externally</li>
				<li>Use an experimentation tool that supports multivariate testing in production</li>
				<li>Provide goverment employees access to these monitoring systems</li>
			</ol>

				<div className="sub-heading">Deliverables</div>

				<EditBox
						text={this.state.definitionOfDone}
						editing={this.state.edit === 'definitionOfDone'}
						onStatusChange={this.toggleEdit.bind(this, 'definitionOfDone')}
						onTextChange={this.handleChange.bind(this, 'definitionOfDone')}>
				</EditBox>

				<div className="sub-heading">Place of Performance</div>
				<p>Will you require the contractor to have a full-time working staff presence onsite at a specific location?</p>
				<div className="sub-text">Ex: SBA headquarters in Washington, DC</div>
					<div className="radio">
					  <label>
					    <input type="radio" value="yes" onChange={this.handleChange.bind(this, "locationRequirement")} checked={this.state.locationRequirement === "yes"}></input>
					    Yes
					  </label>
					</div>
					<div className="radio">
					  <label>
					    <input type="radio" value="no" onChange={this.handleChange.bind(this, "locationRequirement")} checked={this.state.locationRequirement === "no"}></input>
					    No
					  </label>
					</div>
					{(this.state.locationRequirement === "yes")? <div><input type="text" className="form-control short-response" placeholder="ex: Washington, DC" value={this.state.locationText} onChange={this.handleChange.bind(this, "locationText")}></input><br /></div> : null}


				<div className="resulting-text">Resulting Text</div>
				{(this.state.locationRequirement === "yes")? <p>The contractor shall have a full-time working staff presence at {this.state.locationText}. Contractor shall have additional facilities to perform contract functions as necessary.</p> : <p>The contractor is not required to have a full-time working staff presence on-site.</p>}		

				<EditBox
						text={this.state.offSiteDevelopmentCompliance}
						editing={this.state.edit === 'offSiteDevelopmentCompliance'}
						onStatusChange={this.toggleEdit.bind(this, 'offSiteDevelopmentCompliance')}
						onTextChange={this.handleChange.bind(this, 'offSiteDevelopmentCompliance')}>
				</EditBox>
				
				<div className="sub-heading">Kick-Off Meeting/Post-Award Conference</div>

				<p>Will you require the contractor to attend a kick-off meeting?</p>
				<radiogroup onChange={this.handleChange.bind(this, "kickOffMeeting")}>
				{kickOffMeetingOptions}
				</radiogroup>
				
				{(this.state.kickOffMeeting == "in-person")? 
				<div>
					<EditBox
							text={this.state.kickOffMeetingInPerson}
							editing={this.state.edit === 'kickOffMeetingInPerson'}
							onStatusChange={this.toggleEdit.bind(this, 'kickOffMeetingInPerson')}
							onTextChange={this.handleChange.bind(this, 'kickOffMeetingInPerson')}>
					</EditBox>
				</div> : null}

				{(this.state.kickOffMeeting == "remote")? 
					<div>
						<EditBox
							text={this.state.kickOffMeetingRemote}
							editing={this.state.edit === 'kickOffMeetingRemote'}
							onStatusChange={this.toggleEdit.bind(this, 'kickOffMeetingRemote')}
							onTextChange={this.handleChange.bind(this, 'kickOffMeetingRemote')}>
					</EditBox>
					</div>: null}

				{(this.state.kickOffMeeting === "none")?
				<p>A formal kick-off meeting will not be required.</p> : null
				}
			</div>
		);
	},
});


// to ensure the system supports interoperability,  must be followed. (see section). To ensure the user interface is X, Y (playbook language)
module.exports = Objective;