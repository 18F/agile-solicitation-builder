var React = require('react');
var StateMixin = require("../state_mixin");

var ContractClauses = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		return {
			contractClauses: "",
		};
	},
  save: function(cb) {      
  	setTimeout(cb, 500);
  },
  componentDidMount: function() {
  	var rfqId = get_id(window.location.hash);
	  get_data(10, rfqId, function(content){ 
	  	var data = content["data"];
	    this.setState({
	      contractClauses: data["contract_clauses"],
	    });
	  }.bind(this));
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Contract Clauses</div>
	
				<div className="sub-heading">Please feel free to add anything else specific to your contract.</div>
				<textarea className="form-control" rows="20" value={this.state.contractClauses} onChange={this.handleChange.bind(this, 'contractClauses')}></textarea>
			</div>
		);
	},
});


module.exports = ContractClauses;

// data clauses, other agile specific clauses, NDA?