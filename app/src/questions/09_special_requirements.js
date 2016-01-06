var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"accessibility",
	"nonDisclosure",
	"orderOfPrecedence",
	"security",
	"smallBusinessStatus",
	"titleToMaterials",
	"useOfData",
	"federalHolidays",	
];

// "conflictOfInterest",

var coi = "Offerors shall provide a signed statement which describes concisely all relevant facts concerning any past, present, or planned interest (financial, contractual, organizational, or otherwise) relating to the work to be performed under the proposed contract or task order and bearing on whether the Offeror has a possible organizational or personnel conflict of interest with respect to:\n\n  - Being able to render impartial, technically sound, and objective assistance or advice, or\n  - Being given an unfair competitive advantage.\n\nThe Offeror may also provide relevant facts that show how its organizational structure and/or management systems limit its knowledge of possible organizational conflicts of interest relating to other divisions or sections of the organization and how that structure or system would avoid or mitigate such organizational conflict.\n\nNo task order award shall be made until any potential conflict of interest has been neutralized or mitigated to the satisfaction of the Contracting Officer. The vendor will notify the Contracting Officer in writing as soon as any conflict of interest is identified and will propose steps for mitigating the conflict.\n\nRefusal to provide the requested information or the willful misrepresentation of any relevant information by an Offeror shall disqualify the Offeror from further consideration for award of a task order under this solicitation.\n\nIf the Contracting Officer determines that a potential conflict can be avoided, effectively mitigated, or otherwise resolved through the inclusion of a special contract clause, the terms of the clause will be subject to negotiation.";


var SpecialRequirements = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		var initialStates = getStates(STATES);
		initialStates["addRequirement"] = false;
		initialStates["requirementsData"] = [];
		initialStates["title"] = "";
		initialStates["description"] = "";
		initialStates["conflictOfInterest"] = "";
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(9, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
    getCustomComponents(rfqId, 9, function(data){
    	console.log(data);
    	this.setState({requirementsData: data["data"]});
    }.bind(this));
    this.setState({conflictOfInterest: coi});
  },
  addRequirement: function() {
  	if (this.state.addRequirement){  		
  		// check to see if info has been filled in
  		if (this.state.title.length > 0 && this.state.description.length > 0){
  			var rfqId = getId(window.location.hash);
  			var requirementData = {};
  			requirementData["title"] = this.state.title;
  			requirementData["description"] = this.state.description;

  			// save the data
  			createComponent(requirementData, rfqId, 9, function(data){
  				this.setState({
  					addRequirement: false,
  					requirementsData: data["data"],
  				});
  			}.bind(this));
  			
  		}
  		else {
  			alert("Please fill out the title and text components of the form before saving the new role.");
  		}
  	}
  	else {
  		this.setState({ addRequirement: true });
  	}
  },
  save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		var rfqId = getId(window.location.hash);
    put_data(9, rfqId, data, cb);
		
	},
	render: function() {
		var additionalRequirements = [];
		for (i=0; i < this.state.requirementsData.length; i++){
			var role = this.state.requirementsData[i];
			additionalRequirements.push(
				<div key={i}>
					<div className="sub-heading">{role['title']}</div>
					<p>{role['description']}</p>
				</div>
			);
		}
		return (
			<div>
				<div className="main-heading">Special Contract Requirements</div>

				<div className="sub-heading">Controlled Facilities and Information Systems Security</div>
				<EditBox
						text={this.state.security}
						editing={this.state.edit == 'security'}
						onStatusChange={this.toggleEdit.bind(this, 'security')}
						onTextChange={this.handleChange.bind(this, 'security')}>
				</EditBox>

				<div className="sub-heading">Federal Holidays</div>
				<EditBox
						text={this.state.federalHolidays}
						editing={this.state.edit === 'federalHolidays'}
						onStatusChange={this.toggleEdit.bind(this, 'federalHolidays')}
						onTextChange={this.handleChange.bind(this, 'federalHolidays')}>
				</EditBox>
				
				<div className="sub-heading">Section 508 Accessibility Standards Notice (September 2009)</div>
				<EditBox
						text={this.state.accessibility}
						editing={this.state.edit == 'accessibility'}
						onStatusChange={this.toggleEdit.bind(this, 'accessibility')}
						onTextChange={this.handleChange.bind(this, 'accessibility')}>
				</EditBox>

				<div className="sub-heading">Non-Disclosure Policies</div>
				<EditBox
						text={this.state.nonDisclosure}
						editing={this.state.edit == 'nonDisclosure'}
						onStatusChange={this.toggleEdit.bind(this, 'nonDisclosure')}
						onTextChange={this.handleChange.bind(this, 'nonDisclosure')}>
				</EditBox>


				<div className="sub-heading">Potential Organizational Conflicts of Interest</div>
				<EditBox
						text={this.state.conflictOfInterest}
						editing={this.state.edit == 'conflictOfInterest'}
						onStatusChange={this.toggleEdit.bind(this, 'conflictOfInterest')}
						onTextChange={this.handleChange.bind(this, 'conflictOfInterest')}>
				</EditBox>


			<div className="sub-heading">Contractor Use of Commercial Computer Software, Including Open Source Software</div>
			<p>Open source software is often licensed under terms that require a user to make user’s modifications to the open source software or any software that the user combines with the open source software freely available in source code form pursuant to distribution obligations in the license. In cases where the Contractor proposes to use the open source software while performing under this Task Order, regardless of whether the open source software is delivered, the Contractor shall not create, or purport to create, any Government distribution obligation with respect to Government computer software deliverables. Prior to using any commercial computer software, including open source software which is considered commercial computer software, the Contractor shall evaluate each license for commercial computer software, and confirm that each of the following requirements is satisfied:
			</p>
			<ol>
				<li>A license for a particular commercial computer software shall be compatible with all licenses for other commercial computer software that are or will be linked to, adapted to, integrated, combined or merged with the particular commercial computer software, including when the particular commercial computer software and the other commercial computer software are used with another computer program
				</li>
				<li>A license for commercial computer software shall not impose a future Government obligation that is foreseeable by the Contractor
				</li>
				<li>A license for commercial computer software shall not be terminated by the Contractor’s use of the commercial computer software in performing under the contract
				</li>
				<li>Contractor’s cost to comply with this requirement presents no additional costs to the Government
				</li>
			</ol>
			<p>If, as a result of the Contractor’s evaluation, the Contractor satisfies all of the requirements in the paragraphs above, then the Contractor shall provide a written summary report of the above findings to the Contracting Officer stating that the Contractor has evaluated the commercial computer software use and the commercial computer software license, and made each determination required in the paragraphs above. The Contractor shall request permission from the Contracting Officer to use the proposed commercial computer software. This notification shall include all information regarding the identification and proposed use(s) of the commercial computer software.
			</p>
			<p>If the Contractor is unable to satisfy all of the requirements in the paragraphs above for a particular commercial computer software license, then the Contractor may not use the commercial computer software covered by the particular license without prior written approval of the Contracting Officer. If the Contractor wants to use the commercial computer software for which the requirements in the paragraphs above within this section are not satisfied, the Contractor shall request approval to use the otherwise prohibited subject commercial computer software from the Contracting Officer by providing written notification addressing the following:
			</p>
			<ol>
				<li>The name and version number of the software;</li>
				<li>The name of applicable license(s);</li>
				<li>A brief description of the technical use and implementing approach</li>
				<li>A “yes/no” indication as to whether the Contractor has made, or will make, any modifications to the source code;</li>
				<li>The software website; and,</li>
				<li>An identification of the reason(s) that the Contractor was unable to make the determination in the paragraphs above.</li>
			</ol>

	
				<div className="sub-heading">Title to Materials Shall Vest in the Government</div>
				<EditBox
						text={this.state.titleToMaterials}
						editing={this.state.edit == 'titleToMaterials'}
						onStatusChange={this.toggleEdit.bind(this, 'titleToMaterials')}
						onTextChange={this.handleChange.bind(this, 'titleToMaterials')}>
				</EditBox>

				<div className="sub-heading">Limited Use of Data</div>
				<EditBox
						text={this.state.useOfData}
						editing={this.state.edit == 'useOfData'}
						onStatusChange={this.toggleEdit.bind(this, 'useOfData')}
						onTextChange={this.handleChange.bind(this, 'useOfData')}>
				</EditBox>

				<div className="sub-heading">Notice of Size Re-representation at the Task Order Level (will be conditional)</div>
				<EditBox
						text={this.state.smallBusinessStatus}
						editing={this.state.edit == 'smallBusinessStatus'}
						onStatusChange={this.toggleEdit.bind(this, 'smallBusinessStatus')}
						onTextChange={this.handleChange.bind(this, 'smallBusinessStatus')}>
				</EditBox>
			

				<div className="sub-heading">Order of Precedence</div>
				<EditBox
						text={this.state.orderOfPrecedence}
						editing={this.state.edit == 'orderOfPrecedence'}
						onStatusChange={this.toggleEdit.bind(this, 'orderOfPrecedence')}
						onTextChange={this.handleChange.bind(this, 'orderOfPrecedence')}>
				</EditBox>

				{additionalRequirements}

				{this.state.addRequirement? 
					<div>
						<div className="sub-heading">
							<input type="text" className="medium-response form-control" placeholder="Requirement Title" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
						</div>
						<textarea className="form-control" rows="5" placeholder="Requirement Text" value={this.state.description} onChange={this.handleChange.bind(this, "description")}></textarea>
						<button className="btn btn-default" onClick={this.addRequirement}>Save Requirement</button>
					</div>
					: <button className="add btn btn-default" onClick={this.addRequirement}>Add Requirement</button>
				}

			</div>
		);
	},
});


module.exports = SpecialRequirements;