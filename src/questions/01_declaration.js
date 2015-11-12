var React = require('react');

var Declaration = React.createClass({
	getInitialState: function() {
		return {
			response: false,
			showTerms: true,
		};
	},
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	updateResponse: function(response_text){
		console.log("updating response!");
		console.log(this.state.response);
		console.log(this.state.showTerms);
		if (response_text == "no") {
			this.setState({showTerms: false});
			console.log('no!');
		}
		else if (response_text == "yes") {
			this.setState({showTerms: true});
		}
		this.setState({response: response_text});
	},
	render: function() {
		return (
			<div>
				<p>These are the standard definitions for agile development terms in alignment with the USDS Playbook. Do you wish to add these definitions to your own document? You can also modify the definitions and add additional terms after they are added.</p>

				<button type="button" className="btn btn-default yes-no" onClick={this.updateResponse.bind("yes")}>Yes</button>
				<button type="button" className="btn btn-default yes-no" onClick={this.updateResponse.bind("no")}>No</button>
				
				{this.state.showTerms? <Terms /> : null}
			</div>
		);
	},
});

var Terms = React.createClass({
	render: function() {
		return (
			<div id="definitions">

				<span className="term">AGILE DEVELOPMENT/AGILE SOFTWARE DEVELOPMENT</span>
				<p>A proven commercial methodology for software development that is characterized by incremental and iterative processes where releases are produced in close collaboration with the customer. This process improves investment manageability, lowers risk of project failure, shortens the time to realize value, and allows agencies to better adapt to changing needs.</p>

				<span className="term">CONTRACTING OFFICER (CO)</span> 
				<p>The Government official responsible for the execution and administration of contracts on behalf of the Government.</p>

				<span className="term">CONTRACTING OFFICER’S REPRESENTATIVE (COR )</span>
				<p>An individual designated by the Contracting Officer to act as his/her representative to assist in managing the contract. The authorities and limitations of a COR appointment are contained in the written letter of appointment.</p>

				<span className="term">DAY</span>
				<p>A calendar day unless stated otherwise. If a deliverable is due on a weekend or holiday, the deliverable shall be considered due the next business day.</p>

				<span className="term">QUARTER</span>
				<p>A quarter will be defined as the first of January through the end of March, first of April through the end of June, first of July through the end of September, and first of October through the end of December.</p>

				<span className="term">BUSINESS DAY</span>
				<p>Any day other than a Saturday, a Sunday, a Federal holiday or other day on which the Federal Government by law or executive order is closed. Note: This includes any weather-related office closures if the place of performance is in a Federal Building.</p>

				<span className="term">MINIMUM FUNCTIONALITY</span>
				<p>The minimum capabilities a product should have to meet the Government’s objectives.</p>

				<span className="term">AGILE ENVIRONMENT</span>
				<p>A team-based setting for IT product development where the Agile development methodology is used.</p>

				<span className="term">ITERATION/SPRINT/RELEASE CYCLE</span>
				<p>Divisions of time within the Agile development framework.  Each iteration is small in scale (i.e., encompasses a single or a few function(s) within a multistep process). Multiple iterations form releases. For more information, see the TechFAR at https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md </p>

				<span className="term">MILESTONES/EPICS</span>
				<p>A necessary step in a process. In this document, used to refer to components of a given project.
				STORY POINT – A measurement of work and effort. Story points are used in an Agile development environment to demonstrate how much work was achieved in a given sprint or iteration. For more information, see the TechFAR at https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md</p>

				<span className="term">THROUGHPUT</span>
				<p>The amount of material or items passing through a system or process; in this document, refers to the work activity of a product development team.</p>

			</div>
		);
	},
});

module.exports = Declaration;