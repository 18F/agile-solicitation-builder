var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"stakeholderIntro",
	"contractingOfficer",
	"contractingOfficerRepresentative",
	"productOwner",
	"endUsers",
	"stakeholderIntro",
];

var ContractingOfficer = React.createClass({
	mixins: [StateMixin],

	save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		var rfqId = getId(window.location.hash);
    put_data(8, rfqId, data, cb);
		
	},
	getInitialState: function() {		
		var initialStates = getStates(STATES);
		initialStates["addRole"] = false;
		initialStates["title"] = "";
		initialStates["description"] = "";
		initialStates["rolesData"] = [];
		return initialStates;
	},
  componentDidMount: function() {
  	var rfqId = getId(window.location.hash);
    get_data(8, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );      
    }.bind(this));
		getCustomComponents(rfqId, 8, function(data){ 
			this.setState({rolesData: data["data"]});
		}.bind(this));
  },
  addRole: function() {
  	console.log(this.state.addRole);
  	if (this.state.addRole){  		
  		// check to see if info has been filled in
  		if (this.state.title.length > 0 && this.state.description.length > 0){
  			var rfqId = getId(window.location.hash);
  			var roleData = {};
  			roleData["title"] = this.state.title;
  			roleData["description"] = this.state.description;

  			// save the data
  			createComponent(roleData, rfqId, 8, function(data){
  				alert(data);
  			}.bind(this));
  			this.setState( {addRole: false});
  			// reload
  		}
  		else {
  			alert("Please fill out the title and text components of the form before saving the new role.");
  		}
  	}
  	else {
  		this.setState({ addRole: true });
  	}
  },
	render: function() {
		var additionalRoles = [];
		for (i=0; i < this.state.rolesData.length; i++){
			var role = this.state.rolesData[i];
			additionalRoles.push(
				<div>
					<div className="sub-heading">{role['title']}</div>
					<p>{role['description']}</p>
				</div>
			);
		}
		return (
			<div>
				<div className="main-heading">Roles and Responsibilities</div>

				<EditBox
						text={this.state.stakeholderIntro}
						editing={this.state.edit == 'stakeholderIntro'}
						onStatusChange={this.toggleEdit.bind(this, 'stakeholderIntro')}
						onTextChange={this.handleChange.bind(this, 'stakeholderIntro')}>
				</EditBox>

				<div className="sub-heading">Contracting Officer (CO)</div>
				<EditBox
						text={this.state.contractingOfficer}
						editing={this.state.edit == 'contractingOfficer'}
						onStatusChange={this.toggleEdit.bind(this, 'contractingOfficer')}
						onTextChange={this.handleChange.bind(this, 'contractingOfficer')}>
				</EditBox>

				<div className="sub-heading">Contracting Officer’s Representative (COR)</div>
				<EditBox
						text={this.state.contractingOfficerRepresentative}
						editing={this.state.edit === 'contractingOfficerRepresentative'}
						onStatusChange={this.toggleEdit.bind(this, 'contractingOfficerRepresentative')}
						onTextChange={this.handleChange.bind(this, 'contractingOfficerRepresentative')}>
				</EditBox>

				<div className="sub-heading editable">Product Owner</div>
				<EditBox
						text={this.state.productOwner}
						editing={this.state.edit === 'productOwner'}
						onStatusChange={this.toggleEdit.bind(this, 'productOwner')}
						onTextChange={this.handleChange.bind(this, 'productOwner')}>
				</EditBox>

				<div className="sub-heading editable">End Users</div>
				<EditBox
						text={this.state.endUsers}
						editing={this.state.edit === 'endUsers'}
						onStatusChange={this.toggleEdit.bind(this, 'endUsers')}
						onTextChange={this.handleChange.bind(this, 'endUsers')}>
				</EditBox>


				{additionalRoles}

				<br />

				{this.state.addRole? 
					<div>
						<div className="sub-heading">
							<input type="text" className="medium-response form-control" placeholder="Title" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
						</div>
						<textarea className="form-control" rows="5" placeholder="Description" value={this.state.description} onChange={this.handleChange.bind(this, "description")}></textarea>
						<button className="btn btn-default" placeholder="Description of Role" onClick={this.addRole}>Save Role</button>
					</div>
					: <button className="add btn btn-default" onClick={this.addRole}>Add Role</button>
				}
				
				<br />
				<p>You may also add elaborate on these roles, or add additional roles in the generated RFQ.</p>
				<br />

			</div>
		);
	},
});


module.exports = ContractingOfficer;