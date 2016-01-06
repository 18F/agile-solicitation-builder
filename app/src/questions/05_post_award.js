var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = ["invoicing", "test"];

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
    this.setState({test: "test"});
  },
  save: function(cb) {
  	cb();
  },
	render: function() {
		return (
			<div>
				<div className="sub-heading">Invoicing & Funding</div>
				<p>Hi</p>
					<EditBox
							text={this.state.invoicing}
							editing={this.state.edit === 'invoicing'}
							onStatusChange={this.toggleEdit.bind(this, 'invoicing')}
							onTextChange={this.handleChange.bind(this, 'invoicing')}>
					</EditBox>
			</div>
		);
	},
});


module.exports = PostAward;

