var React = require('react');

var Inspection = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Inspection and Acceptance</div>
				<div className="sub-heading">Overview</div>
				<p>The contractor shall ensure proper control and coordination of all deliverables to ensure they are on time. Unless otherwise stated, the Government will review deliverables and notify the contractor of acceptance or non-acceptance within 5 business days. Representatives of the contractor shall meet with the COR and other members of the Government as necessary to review status of deliverables.</p>

				<div className="sub-heading">Notice Regarding Late Delivery</div>
				<p>The Contractor shall notify the COR, or other authorized representative designated in each Task Order, as soon as it becomes apparent to the Contractor that a scheduled delivery will be late. The Contractor shall include in the notification the rationale for late delivery, the expected date for the delivery, and the project impact of the late delivery. Such notification in no way limits any Government contractual rights or remedies, including, but not limited to, termination.</p>
			</div>
		);
	},
});


module.exports = Inspection;