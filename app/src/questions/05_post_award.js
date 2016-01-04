var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = ['invoicing'];

var PostAward = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		var initialStates = getStates(STATES);
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(5, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
  },
  save: function(cb) {
  	cb();
  },
	render: function() {
		return (
			<div>
				<div className="sub-heading">Invoicing & Funding</div>
				<p>{this.state.invoicing}</p>
			</div>
		);
	},
});


module.exports = PostAward;