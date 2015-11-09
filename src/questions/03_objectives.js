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
				<p>Please provide several paragraphs about your project's history, mission, and current state.</p>

				<textarea className="form-control" rows="9"></textarea>

				<h4>3.2 Current Structure</h4>
				<p>If you have any information about the current vendors and specific technology being used please provide it here.</p>

				<textarea className="form-control" rows="10"></textarea>

				<h4>3.3 Objectives</h4>
				<p>Note: The Statement of Objectives will be removed at time of award and replaced with the Offeror’s Performance Work Statement. All listed objectives and requirements shall be included as part of the Offeror’s Performance Work Statement.</p>

				<h4>3.3.1 Overview </h4>
				<p>Who is your user(s)? Has anyone working on this project done any user research? [learn more here!]</p>

				<p>What are your top five goals for this project? </p>
				<ol>
					<li>
						<input type="text" className="form-control" placeholder="objective"></input>
					</li>
				</ol>

			</div>
		);
	},
});

module.exports = Objective;