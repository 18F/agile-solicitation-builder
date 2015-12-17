var React = require('react');

var ContractClauses = React.createClass({
	getInitialState: function() {
		return {};
	},
	handleChange: function(event) {
    this.setState({
        text: event.target.value,
    });
  },
  save: function(cb) {      
    put_data("definitions", this.state.text);
  },
  getInitialState: function(){
    return {
      text: "",
    };
  },
  componentDidMount: function() {
	  get_data("contract_clauses", function(content){ 
	    this.setState({
	      text: content,
	    });
	  }.bind(this));
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Contract Clauses</div>
	
				<div className="sub-heading">Please feel free to add anything else specific to your contract.</div>
				<textarea className="form-control" rows="20" value={this.state.text} onChange={this.handleChange}></textarea>
			</div>
		);
	},
});


module.exports = ContractClauses;

// data clauses, other agile specific clauses, NDA? 