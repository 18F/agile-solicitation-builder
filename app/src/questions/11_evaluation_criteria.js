var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"evaluationCriteria"
];

var page_number = 11;

var EvaluationCriteria= React.createClass({
	// include mixins
	mixins: [StateMixin],

	getInitialState: function() {
		var initialStates = getStates(STATES);
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);

    get_data(page_number, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
  },
  save: function(cb) {
		var data = {};


		var rfqId = getId(window.location.hash);

		// get the most recent state data for each STATE that will be saved
		for (i=0; i < STATES.length; i++){
			var stateName = STATES[i];
			data[stateName] = this.state[stateName];
		}
		// you can save content_components using the get_content API (the custom_component API is also an option)
    put_data(page_number, 'get_content', rfqId, data, cb);

	},
  render: function() {
      return (
          <div>
              <div className="page-heading">Evaluation Criteria</div>
              <div className="responder-instructions">The content in this section can be decided upon by either the PM or the CO.</div>

              <textarea rows="9" className="form-control" value={this.state.evaluationCriteria} onChange={this.handleChange.bind(this, 'evaluationCriteria')}></textarea>
          </div>
      );
  },
});


module.exports = EvaluationCriteria;
