var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = ["invoicing"];

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
		var data = {};
		
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}

		var rfqId = getId(window.location.hash);
    put_data(5, rfqId, data, cb);
  },
	render: function() {
		return (
			<div>
				<div className="sub-heading">Invoicing & Funding</div>
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

