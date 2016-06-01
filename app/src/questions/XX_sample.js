var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

// states data is defined in seeds.py, and must be listed here to be accessed and saved in the database
var STATES = [
	"sampleState1",
	"sampleState2",
];

// page_number would be replaced by the number of this page, the data associated with this section would be established in seed.py
var page_number = 0;

var Sample= React.createClass({
	// include mixins
	mixins: [StateMixin],

	// for a state to be accessible with this.state.stateName you must include it here
	getInitialState: function() {
		// you may also want to establish temporary states for this page that will not be saved
		var initialStates = getStates(STATES);
		return initialStates;
	},
	// componentDidMount is where you pull the latest data from the database to populate the states
	componentDidMount: function() {
		// this identifies the section number identifying the data
		var rfqId = getId(window.location.hash);

		// this calls a helpers.js function which calls server.py to access this RFQs data for this section number (XX)
		// the names the states are established with in seed.py should correspond to the state names used on this page
    get_data(page_number, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
  },
  customFuction: function() {
  	// you can also create functions that will only be used by this page
  	alert('custom function called!');
  },
  save: function(cb) {
		var data = {};

		// this identifies the section number identifying the data
		var rfqId = getId(window.location.hash);

		// get the most recent state data for each STATE that will be saved
		for (i=1; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}
		// you can save content_components using the get_content API (the custom_component API is also an option)
    put_data(page_number, 'get_content', rfqId, data, cb);

	},
  render: function() {
      return (
          <div>
              <div className="page-heading">Sample</div>
              <div className="responder-instructions">The content in this section can be decided upon by either the PM or the CO.</div>
              <EditBox
                  text={this.state.sampleState1}
                  editing={this.state.edit === 'sampleState1'}
                  onStatusChange={this.toggleEdit.bind(this, 'sampleState1')}
                  onTextChange={this.handleChange.bind(this, 'sampleState1')}>
              </EditBox>
              <div>sampleState2 is updated in this textbox</div>
              <textarea rows="9" className="form-control" value={this.state.sampleState2} onChange={this.handleChange.bind(this, 'sampleState2')}></textarea>
          </div>
      );
  },
});


module.exports = Sample;
