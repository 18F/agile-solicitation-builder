var React = require('react');
var StateMixin = require("../state_mixin");
var EditBox = require("../edit_box");

var STATES = [
	"invoicing",
	"billingAddress",
	"duplicateInvoice",
];

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
    put_data(5, "get_content", rfqId, data, cb);
  },
	render: function() {
		var placeholderText = "Mailing Address                                          Phone Number                                                 Fax Number";
		return (
			<div>
				<div className="page-heading">Invoicing &amp; Funding</div>
        <div className="responder-instructions">The content in this section is typically decided on by the CO.</div>
        <p>If you wish to add additional text you may do so in the resulting word document.</p>

        <div className="sub-heading">Contractor Instructions</div>

        <EditBox
            text={this.state.invoicing}
            editing={this.state.edit === 'invoicing'}
            onStatusChange={this.toggleEdit.bind(this, 'invoicing')}
            onTextChange={this.handleChange.bind(this, 'invoicing')}>
        </EditBox>

        <div>The Contractor shall submit an original invoice for payment to the following office:</div>

        <textarea rows="5" className="medium-response" placeholder={placeholderText} value={this.state.billingAddress} onChange={this.handleChange.bind(this, "billingAddress")}></textarea>

        <EditBox
            text={this.state.duplicateInvoice}
            editing={this.state.edit === 'duplicateInvoice'}
            onStatusChange={this.toggleEdit.bind(this, 'duplicateInvoice')}
            onTextChange={this.handleChange.bind(this, 'duplicateInvoice')}>
        </EditBox>
			</div>
		);
	},
});


module.exports = PostAward;

