var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"contractingOfficer",
	"contractingOfficerRepresentative",
	"productOwner",
]

var AdditionalRole = React.createClass({
	render: function() {
		return (
			<div>
				<div className="sub-heading">
					<input type="text" className="medium-response form-control" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
				</div>
				<textarea className="form-control" rows="5" value={this.state.text} onChange={this.handleChange.bind(this, "text")}></textarea>
			</div>
		);
	}
});

var ContractingOfficer = React.createClass({
	mixins: [StateMixin],

	save: function(cb) {
		var data = {};
		// also collect any new custom roles if not already saved separately
		
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
		initialStates["newTitle"] = "";
		initialStates["newText"] = "";
		return initialStates;
	},
  componentDidMount: function() {
  	var rfqId = getId(window.location.hash);
    get_data(8, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );      
    }.bind(this));
  },
  addRole: function() {
  	console.log(this.state.addRole);
  	if (this.state.addRole){  		
  		// check to see if info has been filled in
  		if (this.state.title.length > 0 && this.state.text.length > 0){
  			// send to new helpers function that will save the data
  			// reload
  		}
  		else {
  			alert("please fill out the title and text components of the form before saving the new role.");
  		}
  	}
  	else {
  		this.setState({ addRole: true });
  	}
  },
	render: function() {
		return (
			<div>
				<div className="main-heading">Roles and Responsibilities</div>
				<p>We have already provided some recommended content for this section. To delete, modify, or add additional content click the "edit" above the section you wish to change.</p>

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

				<br />

				{this.state.addRole? 
					<div>
						<div className="sub-heading">
							<input type="text" className="medium-response form-control" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
						</div>
						<textarea className="form-control" placeholder="Role Title" rows="5" value={this.state.text} onChange={this.handleChange.bind(this, "text")}></textarea>
						<button className="btn btn-default" placeholder="Description of Role" onClick={this.addRole}>Save Role</button>
					</div>
					: <button className="add btn btn-default" onClick={this.addRole}>+ Role</button>
				}
				

				<br />
				<p>You may also add elaborate on these roles, or add additional roles in the generated RFQ.</p>
				<br />

			</div>
		);
	},
});


module.exports = ContractingOfficer;