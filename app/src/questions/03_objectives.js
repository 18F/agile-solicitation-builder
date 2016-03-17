var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

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
	"internal_it": "Internal Government IT",
	"external_it": "External IT",
};

var DELIVERABLE_STATES = ["updates", "automatedTesting", "nativeMobile", "mobileWeb", "userTraining", "highTraffic", "devops", "legacySystems", "applicationDesign", "UXrequirements", "programManagement", "systemConfiguration", "helpDesk", "releaseManagement", "dataManagement"];

var STATES = [
	"API_external",
	"API_internal",
	"agileIterativePractices",
	"dataDrivenDecisions",
	"defaultToOpen",
	"definitionOfDone",
	"documentationAndTraining",
	"external_it",
	"external_it_needs",
	"external_people",
	"external_people_needs",
	"generalBackground",
	"internal_it",
	"internal_it_needs",
	"internal_people",
	"internal_people_needs",
	"kickOffMeeting",
	"kickOffMeetingInPerson",
	"kickOffMeetingRemote",
	"languagesRequired",
	"locationRequirement",
	"locationText",
	"objectivesIntro",
	"objectivesSummary",
	"offSiteDevelopmentCompliance",
	"programHistory",
	"simpleAndIntuitive",
	"startToFinish",
	"userAccess",
	"userNeeds",
	"userResearchStrategy",
	"whatPeopleNeed",
];

var Objective = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		var allStates = STATES.concat(DELIVERABLE_STATES).concat(["deliverables"]);
		for (var i=0; i < DELIVERABLE_STATES.length; i++){
			var deliverable = DELIVERABLE_STATES[i];
			allStates.push(deliverable + "text");
		}
		var initialStates = getStates(allStates);
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(3, rfqId, function(content){
    	var components = getComponents(content["data"]);
      this.setState( components );
    }.bind(this));
    getDeliverables(rfqId, function(content){
    	var states = { deliverables: content["data"]};
    	for (var i=0; i < content["data"].length; i++){
    		var deliverable = content["data"][i];
    		states[deliverable["name"]] = deliverable["value"];
    		states[deliverable["name"] + "text"] = deliverable["text"];
    	}
    	this.setState( states );
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
		if (DELIVERABLE_STATES.indexOf(key) >= 0){
			for (var i=0; i < this.state.deliverables.length; i++){
				var deliverable = this.state.deliverables[i];
				if (deliverable['name'] == key){
					this.state.deliverables[i]['value'] = newState[key];
				}
			}
		}
		this.setState(newState);
  },
	save: function(cb) {
		var data = {};
		var deliverables_data = [];
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		// get states of deliverable content in addition to true/false value
		for (i=0; i < DELIVERABLE_STATES.length; i++){			
			var stateName = DELIVERABLE_STATES[i];
			var deliverable = {}
			deliverable["name"] = stateName;
			deliverable["value"] = this.state[stateName];
			deliverable["text"] = this.state[stateName+"text"];
			deliverables_data.push(deliverable);
		}

		var rfqId = getId(window.location.hash);
		putDeliverables(rfqId, deliverables_data);
    put_data(3, "get_content", rfqId, data, cb);
	},
	render: function() {

		var deliverables_options = [];
		var selected_deliverables = [];
		var selected_deliverables_strings = [];
		for (var i=0; i < this.state.deliverables.length; i++) {
			var deliverable = this.state.deliverables[i];
			var key = deliverable["name"];
			var contentStateName = key + "text";
			if (deliverable["value"] == "true"){
				selected_deliverables.push(
					<div className="question" key={key}>
						<div className="question-text">{deliverable['display']}</div>

						<EditBox
              text={this.state[contentStateName]}
              editing={this.state.edit === contentStateName}
              onStatusChange={this.toggleEdit.bind(this, contentStateName)}
              onTextChange={this.handleChange.bind(this, contentStateName)}>
						</EditBox>
					</div>
				)
				selected_deliverables_strings.push(deliverable['display'].toLowerCase());
			}
			deliverables_options.push(
				<li className="checkbox" key={key}>
          <input type="checkbox" id={"deliverables_options:" + key} value={this.state[key]} onClick={this.handleCheck.bind(this, key)} checked={this.state[key] == "true"}></input>
					<label htmlFor={"deliverables_options:" + key}>{deliverable["display"]}</label>
				</li>
			);
		}
		deliverablesString = createString(selected_deliverables_strings);


		var userTypesOptions = [];
		for (var key in USER_TYPES){
			userTypesOptions.push(
				<li className="checkbox" key={key}>
          <input type="checkbox" id={"userTypesOptions:" + key} onClick={this.handleCheck.bind(this, key)} checked={this.state[key] == "true"}></input>
				  <label htmlFor={"userTypesOptions:" + key}>{USER_TYPES[key]}</label>
				</li>
			);
		}

		var userResearchOptions = [];
		for (var key in USER_RESEARCH) {
			userResearchOptions.push(
				<li className="radio" key={key}>
          <input type="radio" id={"userResearchStrategy:" + key} value={key} checked={key == this.state.userResearchStrategy} />
					<label htmlFor={"userResearchStrategy:" + key}>{ USER_RESEARCH[key] }</label>
				</li>
			);
		}

		var kickOffMeetingOptions = [];
		for (var key in KICK_OFF_MEETING) {
			kickOffMeetingOptions.push(
				<li className="radio" key={key}>
          <input type="radio" id={"kickOffMeeting:" + key} value={key} checked={key == this.state.kickOffMeeting} />
					<label htmlFor={"kickOffMeeting:" + key}>{ KICK_OFF_MEETING[key] }</label>
				</li>
			);
		}

		var usersString = "";
		var userTypes = [];
		for (var key in USER_TYPES){
  		if (this.state[key] == "true"){
  			userTypes.push(USER_TYPES[key]);  		
  		}
  	}
  	usersString = createString(userTypes);

		return (
			<div>
				<div className="page-heading">Statement of Objectives</div>
				<div className="responder-instructions">These questions are typically answered by the PM.</div>

				<EditBox
						text={this.state.objectivesIntro}
						editing={this.state.edit === 'objectivesIntro'}
						onStatusChange={this.toggleEdit.bind(this, 'objectivesIntro')}
						onTextChange={this.handleChange.bind(this, 'objectivesIntro')}>
				</EditBox>

        <div className="question">
          <div className="question-text">General Background</div>
          <div className="question-description">Please provide several paragraphs about your project's history, mission, and current state.</div>

          <textarea rows="9" value={this.state.generalBackground} onChange={this.handleChange.bind(this, 'generalBackground')}></textarea>
        </div>

        <div className="question">
          <div className="question-text">Program History</div>
          <div className="question-description">If you have any information about the current vendors and specific technology being used please provide it here.</div>

          <textarea rows="10" value={this.state.programHistory} onChange={this.handleChange.bind(this, 'programHistory')}></textarea>
        </div>

				<div className="sub-heading">Users</div>

        <div className="question">
				  <div className="question-text">Who will the primary users be?</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">Who will the primary users be?</legend>
            <ul className="usa-unstyled-list">
              {userTypesOptions}
            </ul>
          </fieldset>

          {(usersString.length > 0)?
            <div>
              <div className="resulting-text">The users of the product will include {usersString}.</div>

              <div className="question">
                <div className="question-text">What user needs will this service address?</div>
                <div className="question-description">Please list the user needs for each type of user selected above and how this service will address them.</div>

                {(this.state.internal_people == "true")?
                <div>
                  <p>Government Employee's Needs</p>
                  <textarea rows="2" value={this.state.internal_people_needs} onChange={this.handleChange.bind(this, 'internal_people_needs')}></textarea>
                </div> : null}

                {(this.state.external_people == "true")?
                <div>
                  <p>The Public's Needs</p>
                  <textarea rows="2" value={this.state.external_people_needs} onChange={this.handleChange.bind(this, 'external_people_needs')}></textarea>
                </div> : null}

                {(this.state.internal_it == "true")?
                <div>
                  <p>Internal IT Needs</p>
                  <textarea rows="2" value={this.state.internal_it_needs} onChange={this.handleChange.bind(this, 'internal_it_needs')}></textarea>
                </div> : null}

                {(this.state.external_it == "true")?
                <div>
                  <p>External IT Needs</p>
                  <textarea rows="2" value={this.state.external_it_needs} onChange={this.handleChange.bind(this, 'external_it_needs')}></textarea>
                </div> : null}
              </div>
            </div>
          : null}
        </div>

        <div className="question">
          <div className="question-text">What languages is your service offered in?</div>

          <textarea className="medium-response" rows="4" value={this.state.languagesRequired} onChange={this.handleChange.bind(this, 'languagesRequired')}></textarea>
        </div>

        <div className="question">
          <div className="question-text">What is your User Research Strategy?</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">What is your User Research Strategy?</legend>
            <ul className="usa-unstyled-list" onChange={this.handleChange.bind(this, 'userResearchStrategy')}>
              {userResearchOptions}
            </ul>
          </fieldset>

          <EditBox
              text={this.state.userAccess}
              editing={this.state.edit === 'userAccess'}
              onStatusChange={this.toggleEdit.bind(this, 'userAccess')}
              onTextChange={this.handleChange.bind(this, 'userAccess')}>
          </EditBox>

          {(this.state.userResearchStrategy === "vendor")?
            <div>
              <div className="question">
                <div className="question-text">Understand what people need</div>

                <EditBox
                    text={this.state.whatPeopleNeed}
                    editing={this.state.edit === 'whatPeopleNeed'}
                    onStatusChange={this.toggleEdit.bind(this, 'whatPeopleNeed')}
                    onTextChange={this.handleChange.bind(this, 'whatPeopleNeed')}>
                </EditBox>
              </div>
              <div className="question">
                <div className="question-text">Address the whole experience, from start to finish</div>

                <EditBox
                  text={this.state.startToFinish}
                  editing={this.state.edit === 'startToFinish'}
                  onStatusChange={this.toggleEdit.bind(this, 'startToFinish')}
                  onTextChange={this.handleChange.bind(this, 'startToFinish')}>
                </EditBox>
              </div>
            </div>
          : null }
        </div>

				<div className="sub-heading">General Requirements</div>
				<p>All agile projects should follow these guidelines.</p>

        <div className="question">
          <div className="question-text">Build the service using agile and iterative practices</div>

          <EditBox
            text={this.state.agileIterativePractices}
            editing={this.state.edit === 'agileIterativePractices'}
            onStatusChange={this.toggleEdit.bind(this, 'agileIterativePractices')}
            onTextChange={this.handleChange.bind(this, 'agileIterativePractices')}>
          </EditBox>
        </div>

        <div className="question">
          <div className="question-text">Make it simple and intuitive</div>

          <EditBox
              text={this.state.simpleAndIntuitive}
              editing={this.state.edit === 'simpleAndIntuitive'}
              onStatusChange={this.toggleEdit.bind(this, 'simpleAndIntuitive')}
              onTextChange={this.handleChange.bind(this, 'simpleAndIntuitive')}>
          </EditBox>
        </div>

        <div className="question">
          <div className="question-text">Use data to drive decisions</div>

          <EditBox
              text={this.state.dataDrivenDecisions}
              editing={this.state.edit === 'dataDrivenDecisions'}
              onStatusChange={this.toggleEdit.bind(this, 'dataDrivenDecisions')}
              onTextChange={this.handleChange.bind(this, 'dataDrivenDecisions')}>
          </EditBox>
        </div>

				<div className="sub-heading">Specific Tasks and Deliverables</div>

				<EditBox
						text={this.state.definitionOfDone}
						editing={this.state.edit === 'definitionOfDone'}
						onStatusChange={this.toggleEdit.bind(this, 'definitionOfDone')}
						onTextChange={this.handleChange.bind(this, 'definitionOfDone')}>
				</EditBox>

        <div className="question">
				  <div className="question-text">Which of the following do you anticipate your project will need?</div>
				  <div className="question-description">We have already checked certain components that the USDS Playbook suggests be required for all projects.</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">Which of the following do you anticipate your project will need?</legend>
            <ul className="usa-unstyled-list">
              {deliverables_options}
            </ul>
          </fieldset>

          <div className="resulting-text">The contractors are required to provide the following services: {deliverablesString}. Each deliverable has been described in more detail below.</div>

          <div className="guidance-text">These functional Requirements will be translated into Epics and User Stories that will be used to populate the Product Backlog.</div>

          {selected_deliverables}
        </div>
				
				<div className="sub-heading">Location &amp; Kick-Off Meeting</div>

        <div className="question">
          <div className="question-text">Will you require the contractor to have a full-time working staff presence onsite at a specific location?</div>
          <div className="question-description">Ex: SBA headquarters in Washington, DC</div>

          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">Will you require the contractor to have a full-time working staff presence onsite at a specific location?</legend>
            <ul className="usa-unstyled-list">
              <li className="radio">
                <input type="radio" id="locationRequirement:yes" value="yes" onChange={this.handleChange.bind(this, "locationRequirement")} checked={this.state.locationRequirement === "yes"}></input>
                <label htmlFor="locationRequirement:yes">Yes</label>
              </li>
              <li className="radio">
                <input type="radio" id="locationRequirement:no" value="no" onChange={this.handleChange.bind(this, "locationRequirement")} checked={this.state.locationRequirement === "no"}></input>
                <label htmlFor="locationRequirement:no">No</label>
              </li>
            </ul>
          </fieldset>

          {(this.state.locationRequirement === "yes")? <div><input type="text" className="short-response" placeholder="ex: Washington, DC" value={this.state.locationText} onChange={this.handleChange.bind(this, "locationText")}></input></div> : null}


          {(this.state.locationRequirement === "yes")?
            <div className="resulting-text">The contractor shall have a full-time working staff presence at {this.state.locationText}. Contractor shall have additional facilities to perform contract functions as necessary.
            </div> :
            <div className="resulting-text">The contractor is not required to have a full-time working staff presence on-site.
            </div>
          }

          <EditBox
            text={this.state.offSiteDevelopmentCompliance}
            editing={this.state.edit === 'offSiteDevelopmentCompliance'}
            onStatusChange={this.toggleEdit.bind(this, 'offSiteDevelopmentCompliance')}
            onTextChange={this.handleChange.bind(this, 'offSiteDevelopmentCompliance')}>
          </EditBox>
        </div>

        <div className="question">
          <div className="question-text">Will you require the contractor to attend a kick-off meeting?</div>
          <fieldset className="usa-fieldset-inputs">
            <legend className="usa-sr-only">Will you require the contractor to attend a kick-off meeting?</legend>
            <ul className="usa-unstyled-list" onChange={this.handleChange.bind(this, "kickOffMeeting")}>
              {kickOffMeetingOptions}
            </ul>
          </fieldset>

          {(this.state.kickOffMeeting == "in-person")?
            <div>
              <EditBox
                text={this.state.kickOffMeetingInPerson}
                editing={this.state.edit === 'kickOffMeetingInPerson'}
                onStatusChange={this.toggleEdit.bind(this, 'kickOffMeetingInPerson')}
                onTextChange={this.handleChange.bind(this, 'kickOffMeetingInPerson')}>
              </EditBox>
            </div> : null
          }

          {(this.state.kickOffMeeting == "remote")?
            <div>
              <EditBox
                text={this.state.kickOffMeetingRemote}
                editing={this.state.edit === 'kickOffMeetingRemote'}
                onStatusChange={this.toggleEdit.bind(this, 'kickOffMeetingRemote')}
                onTextChange={this.handleChange.bind(this, 'kickOffMeetingRemote')}>
              </EditBox>
            </div>: null
          }

          {(this.state.kickOffMeeting === "none")?
            <div className="resulting-text">A formal kick-off meeting will not be required.</div> : null
          }
        </div>
			</div>
		);
	},
});

				// <div className="sub-heading">Summary of Objectives</div>
				// <textarea rows="4"></textarea>
// to ensure the system supports interoperability,  must be followed. (see section). To ensure the user interface is X, Y (playbook language)
module.exports = Objective;