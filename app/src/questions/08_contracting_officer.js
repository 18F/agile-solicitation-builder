var React = require('react');
var StateMixin = require("../state_mixin");

var STATES = [
	"contractingOfficer",
	"contractingOfficerRepresentative",
	"productOwner",
]

var AdditionalRole = React.createClass({
	render: function() {
		return (
			<div>
				<div className="sub-heading"><input type="text" className="medium-response"/></div>
				<textarea className="form-control" rows="5"></textarea>
			</div>
		);
	}
});

var ContractingOfficer = React.createClass({
	mixins: [StateMixin],
	save: function() {
		// collect final state values
		// also collect any new custom roles
		var data = {};
		data["contractingOfficer"] = this.state.coText;
		data["contractingOfficerRepresentative"] = this.state.corText;
		data["productOwner"] = this.state.productOwnerText;

	  put_data(8, 1, data, function(content){
      window.location.replace(content['url']);
    }.bind(this));
  },
	getInitialState: function() {		
		var initialStates = getStates(STATES);
		return initialStates;
	},
  componentDidMount: function() {
  	$('#additional-roles').hide();
  	var rfqId = getId(window.location.hash);
    get_data(8, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );      
    }.bind(this));
  },
  addRole: function() {
  	// @TODO do not add empty text box unless previous empty text box has been filled in
  	$('#additional-roles').show();
  	console.log('add role');

  },
	render: function() {
		return (
			<div>
				<div className="main-heading">Roles and Responsibilities</div>
				<p>We have already provided some recommended content for this section. To delete, modify, or add additional content click the "edit" above the section you wish to change.</p>

				<button className="btn btn-default" onClick={this.addRole}>+ Role</button>
				<br />

				<div className="sub-heading">Contracting Officer’s Authority</div>

				{this.state.edit === "co"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'co')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.contractingOfficer} onChange={this.handleChange.bind(this, 'co')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'co')}>Edit</div>
					{this.state.contractingOfficer}
				</div>
				}

				<div className="sub-heading">Contracting Officer’s Representative (COR) Authority</div>
				
				{this.state.edit === "cor"? 
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'cor')}>Done</div>
				<textarea className="form-control" rows="4" defaultValue={this.state.contractingOfficerRepresentative} onChange={this.handleChange.bind(this, 'cor')}></textarea></div> :
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'cor')}>Edit</div>
				{this.state.contractingOfficerRepresentative}</div>
				}

				<div className="sub-heading editable">Product Owner's Authority</div>
				{this.state.edit === "po"? 
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'po')}>Done</div>
				<textarea className="form-control" rows="4" defaultValue={this.state.productOwner} onChange={this.handleChange.bind(this, 'po')}></textarea></div> :
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'po')}>Edit</div>
				{this.state.productOwner}</div>
				}

				<div className="sub-heading">Data/Analytics Owner</div>
				<p>@TODO</p>
				
				<div id="additional-roles">
					<AdditionalRole />
				</div>
				<br />

			</div>
		);
	},
});


module.exports = ContractingOfficer;