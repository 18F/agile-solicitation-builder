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
    put_data(9, "get_content", rfqId, data, cb);

	},
  componentDidMount: function() {
  	var rfqId = getId(window.location.hash);
	  get_data(9, rfqId, function(content){
	  	var data = content["data"];
			console.log(data);
	    this.setState({
	      contractClauses: data[STATES[0]],
	    });
	  }.bind(this));
	},
	render: function() {
		return (
			<div>
				<div className="page-heading">Contract Clauses</div>
				<div className="responder-instructions">The PM and the CO may both contribute content to this section.</div>

				<div className="sub-heading">Additional Clauses</div>

				<div className="guidance-text">Please feel free to add anything else specific to your contract. You will also be able to edit the Microsoft Word document that is produced.</div>

        <textarea rows="15" value={this.state.contractClauses} onChange={this.handleChange.bind(this, 'contractClauses')}></textarea>
			</div>
		);
	},
});


module.exports = ContractClauses;
