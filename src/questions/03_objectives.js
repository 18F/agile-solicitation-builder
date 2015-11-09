var React = require('react');

var Objective = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>
				<h3>Statement of Objectives</h3>
				<h4>3.1 Background</h4>
				<p>Instructions</p>

				<textarea class="form-control" rows="10"></textarea>

				<h4>3.2 Current Structure</h4>
				<p>If you have any information about the current vendors and technology being used please provide it here.</p>

				<textarea class="form-control" rows="10"></textarea>

				<h4>3.3 Objectives</h4>

				<p>Note: The Statement of Objectives will be removed at time of award and replaced with the Offeror’s Performance Work Statement. All listed objectives and requirements shall be included as part of the Offeror’s Performance Work Statement.</p>

				<h4>3.3.1 Overview </h4>

				who is your user? 

				have you done user research? [learn more here!]
			</div>
		);
	},
});

module.exports = Objective;