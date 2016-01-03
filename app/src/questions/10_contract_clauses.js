var React = require('react');
var StateMixin = require("../state_mixin");

STATES = [
	"contractClauses",
];

var ContractClauses = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		var initialStates = getStates(STATES);
		return initialStates;
	},
  save: function(cb) {
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		var rfqId = getId(window.location.hash);
    put_data(8, rfqId, data, cb);
		
	},
  componentDidMount: function() {
  	var rfqId = getId(window.location.hash);
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
				<p>Please feel free to add anything else specific to your contract.</p>
				<textarea className="form-control" rows="15" value={this.state.contractClauses} onChange={this.handleChange.bind(this, 'contractClauses')}></textarea>
			</div>
		);
	},
});


module.exports = ContractClauses;

// data clauses, other agile specific clauses, NDA?