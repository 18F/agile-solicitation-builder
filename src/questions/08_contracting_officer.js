var React = require('react');

var ContractingOfficer = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Contracting Officer</div>
				
				<div className="sub-heading">Contracting Officer’s Authority</div>
				<p>The Contracting Officer is the only individual who can legally commit or obligate the Government for the expenditure of public funds. The technical administration of this Task Order shall not be construed to authorize the revision of the terms and conditions of this Task Order. Only the Contracting Officer can authorize any such revision in writing. The Contracting Officer shall promptly countermand any action that exceeds the authority of the COR.</p>

				<div className="sub-heading">Contracting Officer’s Representative (COR) Authority</div>
				<p>The Contracting Officer may designate additional technical personnel to serve in monitoring the work under this Task Order. The COR will coordinate and manage the activities under the Task Order.</p>

			</div>
		);
	},
});


module.exports = ContractingOfficer;