var React = require('react');

var ContractingOfficer = React.createClass({
	save: function() {
		// collect final state values
		var data = {};
		data["contracting_officer"] = this.state.coText;
		data["contracting_officer_representative"] = this.state.corText;
		data["product_owner"] = this.state.productOwnerText;

	  put_data(8, 1, data, function(content){
      window.location.replace(content['url']);
    }.bind(this));
  },
	toggleEdit: function(key, event) {
		if (this.state.edit === key){
			this.setState({
      	edit: null,
	    });
		}
		else {
			this.setState({
	      edit: key,
	    });
		}
	},
	handleChange: function(key, event) {
		console.log(key);
		switch(key) {
			case "co":
				this.setState({
      		coText: event.target.value,
		    });
		    break;
		  case "cor":
				this.setState({
      		corText: event.target.value,
		    });
		    break;
			case "po":
				this.setState({
      		productOwnerText: event.target.value,
		    });
		    break;
		}
	},
	getInitialState: function() {
		return {
			edit: null,
			coText: "",
			corText: "",
			productOwnerText: "",
		};
	},
  componentDidMount: function() {
    get_data(8, 1, function(content){
      this.setState({
        coText: content["data"]["contracting_officer"],
        corText: content["data"]["contracting_officer_representative"],
        productOwnerText: content["data"]["product_owner"],
      });
    }.bind(this));
  },
	render: function() {
		return (
			<div>
				<div className="main-heading">Roles and Responsibilities</div>
				<p>We have already provided some recommended content for this section. To delete, modify, or add additional content click the "edit" above the section you wish to change.</p>

				<button className="btn btn-default">+ Role</button>
				<br />

				<div className="sub-heading">Contracting Officer’s Authority</div>

				{this.state.edit === "co"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'co')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.coText} onChange={this.handleChange.bind(this, 'co')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'co')}>Edit</div>
					{this.state.coText}
				</div>
				}

				<div className="sub-heading">Contracting Officer’s Representative (COR) Authority</div>
				
				{this.state.edit === "cor"? 
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'cor')}>Done</div>
				<textarea className="form-control" rows="4" defaultValue={this.state.corText} onChange={this.handleChange.bind(this, 'cor')}></textarea></div> :
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'cor')}>Edit</div>
				{this.state.corText}</div>
				}

				<div className="sub-heading editable">Product Owner's Authority</div>
				{this.state.edit === "po"? 
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'po')}>Done</div>
				<textarea className="form-control" rows="4" defaultValue={this.state.productOwnerText} onChange={this.handleChange.bind(this, 'po')}></textarea></div> :
				<div>
				<div className="edit" onClick={this.toggleEdit.bind(this, 'po')}>Edit</div>
				{this.state.productOwnerText}</div>
				}
				
				<br />				

			</div>
		);
	},
});


module.exports = ContractingOfficer;