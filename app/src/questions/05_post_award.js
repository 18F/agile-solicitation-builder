var React = require('react');

var PostAward = React.createClass({
	getInitialState: function() {
		return {};
	},
	toggleEdit: function(key, event) {
		console.log(key);
		if (this.state.edit === key){
			this.setState({
      	edit: null,
	    });
		}
		else {
			this.setState({
	      edit: key,
	    });
		}
	},
	render: function() {
		return (
			<div>
				<div className="sub-heading">Invoicing & Funding</div>
				<p>The Contractor shall bill for the ongoing operations as per the payment schedule documented in PWS and the corresponding cost proposal as associated with specific deliverables. 
The {this.state.agency} will reject all nonconforming invoices.
The Contracting Officer, working with the COR, is responsible for determining minimum requirements for the information to be provided on the invoice. For information on what constitutes a valid invoice, refer to FAR 32.905. The minimum information includes:
•	Date of Invoice
•	Contract # 
•	Requisition #
•	Billing Company name/address - as stated in the award (if this changes in www.SAM.gov at any time during the period of performance, notify the Contracting Officer to process a modification). 
•	Must include a “Remit to” address (which is complete) as stated in the award. If this changes in www.SAM.gov at any time during the period of performance, notify the Contracting Officer to process a modification.
•	Period of performance/services
•	Amount Billed for specified work accomplished
•	Total Contract value	
•	Cumulative Billed
•	Contract Line item number (CLIN) being billed, for each milestone achieved and list of deliverables as identified in the PWS
•	Narrative of performance sufficient to justify the invoice
•	Explanation of incentives/disincentives
•	Point of Contact for invoicing issues and phone number

Invoices shall be mailed to the email address indicated in block 18a on the SF 1449 of the award documents.  
The invoice will contain a statement signed by a responsible official of the Contractor substantially similar if not identical to the following:
“I certify that the items above have been delivered in accordance with the Task Order, and that all charges are true, correct, and have not been previously billed.”

</p>
				<div className="sub-heading">Funding</div>
				<p>Funding for performance will be allocated and obligated for each exercised Contract Line Item (CLIN).</p>
			</div>
		);
	},
});


module.exports = PostAward;