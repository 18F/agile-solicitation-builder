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
	"conflictOfInterest",
	"commercialSoftware",
];

var SpecialRequirements = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		var initialStates = getStates(STATES);
		initialStates["addRequirement"] = false;
		initialStates["requirementsData"] = [];
		initialStates["title"] = "";
		initialStates["description"] = "";
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

			<EditBox
					text={this.state.commercialSoftware}
					editing={this.state.edit == 'commercialSoftware'}
					onStatusChange={this.toggleEdit.bind(this, 'commercialSoftware')}
					onTextChange={this.handleChange.bind(this, 'commercialSoftware')}>
			</EditBox>
	
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