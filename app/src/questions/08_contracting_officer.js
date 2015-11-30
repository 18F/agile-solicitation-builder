var React = require('react');

var defaultCOText = "The Contracting Officer is the only individual who can legally commit or obligate the Government for the expenditure of public funds. The technical administration of this " + localStorage.getItem("docType") + " shall not be construed to authorize the revision of the terms and conditions of this " + localStorage.getItem("docType") + ". Only the Contracting Officer can authorize any such revision in writing. The Contracting Officer shall promptly countermand any action that exceeds the authority of the COR.";


var defaultCorText = "The Contracting Officer may designate additional technical personnel to serve in monitoring the work under this " + localStorage.getItem("docType") + ". The COR will coordinate and manage the activities under the " + localStorage.getItem("docType") + ".";


var ContractingOfficer = React.createClass({
	toggleEdit: function(key, event) {
		console.log(key);
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
		    localStorage.setItem("coText", event.target.value);
		    break;
		  case "cor":
				this.setState({
      		corText: event.target.value,
		    });
		    localStorage.setItem("corText", event.target.value);
		    break;
		}
	},
	getInitialState: function() {
		return {
			edit: null,
			docType: localStorage.getItem("docType"),
			coText: defaultCOText,
			corText: defaultCorText,
		};
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Contracting Officer</div>
				<p>We have already provided some recommended content for this section. To delete, modify, or add additional content click the "edit" above the section you wish to change.</p>

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
				<br />
			</div>
		);
	},
});


module.exports = ContractingOfficer;