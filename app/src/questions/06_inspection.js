var React = require('react');
var StateMixin = require("../state_mixin");


var Inspection = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		return {
			inspectionOverview: "",
			lateDelivery: "",
		};
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(6, rfqId, function(content){
    	var data = content["data"];
      this.setState({
      	inspectionOverview: data["inspection_overview"],
      	lateDelivery: data["late_delivery"],
      });
    }.bind(this));
  },
	render: function() {
		return (
			<div>
				<div className="main-heading">Inspection and Acceptance</div>
				<div className="sub-heading">Overview</div>

				{this.state.edit === "inspectionOverview"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'inspectionOverview')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.inspectionOverview} onChange={this.handleChange.bind(this, 'inspectionOverview')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'inspectionOverview')}>Edit</div>
					{this.state.inspectionOverview}
				</div>
				}

				<br />


				<div className="sub-heading">Notice Regarding Late Delivery</div>
				{this.state.edit === "lateDelivery"?
				<div><div className="edit" onClick={this.toggleEdit.bind(this, 'lateDelivery')}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.state.lateDelivery} onChange={this.handleChange.bind(this, 'lateDelivery')}></textarea></div>:
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, 'lateDelivery')}>Edit</div>
					{this.state.lateDelivery}
				</div>
				}
				<br />
			</div>

		);
	},
});

// <p>The contractor shall ensure proper control and coordination of all deliverables to ensure they are on time. Unless otherwise stated, the Government will review deliverables and notify the contractor of acceptance or non-acceptance within 5 business days. Representatives of the contractor shall meet with the COR and other members of the Government as necessary to review status of deliverables.</p>
// <p>The Contractor shall notify the COR, or other authorized representative designated in each {DOC_TYPE}, as soon as it becomes apparent to the Contractor that a scheduled delivery will be late. The Contractor shall include in the notification the rationale for late delivery, the expected date for the delivery, and the project impact of the late delivery. Such notification in no way limits any Government contractual rights or remedies, including, but not limited to, termination.</p>

module.exports = Inspection;