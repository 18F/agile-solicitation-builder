var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"stakeholderIntro",
	"contractingOfficer",
	"contractingOfficerRepresentative",
	"productOwner",
	"endUsers",
];

var ContractingOfficer = React.createClass({
	mixins: [StateMixin],

	save: function(cb) {
		var data = {};
		var rfqId = getId(window.location.hash);
		
		// this skips stakeholderIntro
		for (i=1; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}
		// save stakeholderIntro
    put_data(7, "custom_component", rfqId, data, cb);
    put_data(7, 'get_content', rfqId, {'stakeholderIntro': this.state.stakeholderIntro}, cb);
		
	},
	getInitialState: function() {		
		var initialStates = getStates(STATES);
		initialStates["addRole"] = false;
		initialStates["title"] = "";
		initialStates["text"] = "";
		initialStates["rolesData"] = [];
		return initialStates;
	},
  componentDidMount: function() {
  	var rfqId = getId(window.location.hash);
    get_data(7, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
		getCustomComponents(rfqId, 7, function(data){
			var newStates = {};
    	for (i=0; i < data['data'].length; i++){
				var role = data['data'][i];
				newStates[role['name']] = role['text'];
			}
			this.setState( newStates );
			this.setState({rolesData: data["data"]});
		}.bind(this));
  },
  addRole: function() {
  	if (this.state.addRole){  		
  		// check to see if info has been filled in
  		if (this.state.title.length > 0 && this.state.text.length > 0){
  			var rfqId = getId(window.location.hash);
  			var roleData = {};
  			roleData["title"] = this.state.title;
  			roleData["text"] = this.state.text;

  			// save the data and update
  			createComponent(roleData, rfqId, 7, function(data){
  				this.setState({
  					addRole: false,
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
  		this.setState({ addRole: true });
  	}
  },
	render: function() {
		var roles = [];
		for (i=0; i < this.state.rolesData.length; i++){
			var role = this.state.rolesData[i];
			roles.push(
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
				<div className="page-heading">Roles and Responsibilities</div>

				<div className="responder-instructions">The content in this section should be decided upon by both the PM and the CO.</div>

				<EditBox
						text={this.state.stakeholderIntro}
						editing={this.state.edit == 'stakeholderIntro'}
						onStatusChange={this.toggleEdit.bind(this, 'stakeholderIntro')}
						onTextChange={this.handleChange.bind(this, 'stakeholderIntro')}>
				</EditBox>

				{roles}

				<br />

				{this.state.addRole?
					<div>
						<div className="sub-heading">
							<input type="text" className="medium-response form-control" placeholder="Title" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
						</div>
						<textarea className="form-control" rows="5" placeholder="Description" value={this.state.text} onChange={this.handleChange.bind(this, "text")}></textarea>
						<button className="btn btn-default" placeholder="Description of Role" onClick={this.addRole}>Save Role</button>
					</div>
					: <button className="add btn btn-default" onClick={this.addRole}>Add Role</button>
				}
				
				<br />
				<div className="guidance-text">You may also add elaborate on these roles, or add additional roles in the generated RFQ.</div>
				<br />

			</div>
		);
	},
});


module.exports = ContractingOfficer;