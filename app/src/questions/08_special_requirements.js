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
		initialStates["text"] = "";
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    getCustomComponents(rfqId, 8, function(data){    	
    	var newStates = {};
    	for (i=0; i < data['data'].length; i++){
				var requirement = data['data'][i];
				newStates[requirement['name']] = requirement['text'];
			}
			this.setState( newStates );
			this.setState({requirementsData: data["data"]});
    }.bind(this));
  },
  addRequirement: function() {
  	if (this.state.addRequirement){  		
  		// check to see if info has been filled in
  		if (this.state.title.length > 0 && this.state.text.length > 0){
  			var rfqId = getId(window.location.hash);
  			var requirementData = {};
  			requirementData["title"] = this.state.title;
  			requirementData["text"] = this.state.text;

  			// save the data and update state to include new component
  			createComponent(requirementData, rfqId, 8, function(data){
  				console.log(data);
  				this.setState({
  					addRequirement: false,  					
  					title: "",
  					text: "",
  				});
  			}.bind(this));
  		location.reload();
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
    put_data(8, "custom_component", rfqId, data, cb);
	},
	render: function() {
		var requirements = [];
		for (i=0; i < this.state.requirementsData.length; i++){
			var role = this.state.requirementsData[i];
			
			requirements.push(
				<div key={i}>
					<div className="sub-heading">{role['title']}</div>
					<EditBox
							text={this.state[role['name']]}
							editing={this.state.edit == role['name']}
							onStatusChange={this.toggleEdit.bind(this, role['name'])}
							onTextChange={this.handleChange.bind(this, role['name'])}>
					</EditBox>
				</div>
			);
		}
		return (
			<div>
				<div className="page-heading">Special Contract Requirements</div>
				<div className="responder-instructions">The content in this section is typically decided upon by the CO.</div>
				
				{requirements}

				{this.state.addRequirement? 
					<div>
						<div className="sub-heading">
							<input type="text" className="medium-response form-control" placeholder="Requirement Title" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
						</div>
						<textarea className="form-control" rows="5" placeholder="Requirement Text" value={this.state.text} onChange={this.handleChange.bind(this, "text")}></textarea>
						<button className="btn btn-default" onClick={this.addRequirement}>Save Requirement</button>
					</div>
					: <button className="add btn btn-default" onClick={this.addRequirement}>Add Requirement</button>
				}

			</div>
		);
	},
});


module.exports = SpecialRequirements;