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
    put_data(5, rfqId, data, cb);
  },
	render: function() {
		return (
			<div>
				<div className="sub-heading">Invoicing & Funding</div>
					<div className="sub-text">If you wish to add additional text you may do so in the resulting word document.</div>

					<EditBox
							text={this.state.invoicing}
							editing={this.state.edit === 'invoicing'}
							onStatusChange={this.toggleEdit.bind(this, 'invoicing')}
							onTextChange={this.handleChange.bind(this, 'invoicing')}>
					</EditBox>

					<p>The Contractor shall submit an original invoice for payment to the following office:</p>
					<div className="sub-text">Please include your agency's payment office mailing address, telephone number and fax number.</div>

	    				<textarea rows="4" className="form-control" placeholder="Office Name & Mailing Address" value={this.state.billingAddress} onChange={this.handleChange.bind(this, "billingAddress")}></textarea>

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

