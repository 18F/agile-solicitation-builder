var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var IndexLink = require('react-router').IndexLink;

var termsText = "AGILE DEVELOPMENT/AGILE SOFTWARE DEVELOPMENT: A proven commercial methodology for software development that is characterized by incremental and iterative processes where releases are produced in close collaboration with the customer. This process improves investment manageability, lowers risk of project failure, shortens the time to realize value, and allows agencies to better adapt to changing needs.\n\nCONTRACTING OFFICER (CO): The Government official responsible for the execution and administration of contracts on behalf of the Government.\n\nCONTRACTING OFFICER’S REPRESENTATIVE (COR): An individual designated by the Contracting Officer to act as his/her representative to assist in managing the contract. The authorities and limitations of a COR appointment are contained in the written letter of appointment.\n\nDAY: A calendar day unless stated otherwise. If a deliverable is due on a weekend or holiday, the deliverable shall be considered due the next business day.\n\nQUARTER: A quarter will be defined as the first of January through the end of March, first of April through the end of June, first of July through the end of September, and first of October through the end of December.\n\nBUSINESS DAY: Any day other than a Saturday, a Sunday, a Federal holiday or other day on which the Federal Government by law or executive order is closed. Note: This includes any weather-related office closures if the place of performance is in a Federal Building.\n\nMINIMUM FUNCTIONALITY: The minimum capabilities a product should have to meet the Government’s objectives.\n\nAGILE ENVIRONMENT: A team-based setting for IT product development where the Agile development methodology is used.\n\nITERATION/SPRINT/RELEASE CYCLE: Divisions of time within the Agile development framework.  Each iteration is small in scale (i.e., encompasses a single or a few function(s) within a multistep process). Multiple iterations form releases. For more information, see the TechFAR at https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md\n\nMILESTONES/EPICS: A necessary step in a process. In this document, used to refer to components of a given project.\n\nSTORY POINT: A measurement of work and effort. Story points are used in an Agile development environment to demonstrate how much work was achieved in a given sprint or iteration. For more information, see the <a href='https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md' target='_blank'>TechFAR</a>\n\nTHROUGHPUT: The amount of material or items passing through a system or process; in this document, refers to the work activity of a product development team.";


var Welcome = React.createClass({
	getInitialState: function() {
		localStorage.clear();
		localStorage.setItem("definitions", termsText);
		localStorage.setItem("performancePeriod", null);
    localStorage.setItem("periodDuration", null);
    localStorage.setItem("locationRequirement", false);
    localStorage.setItem("locationText", null);
    localStorage.setItem("totalBudget", 0);
    localStorage.setItem("travelBudget", 0);
		return {};
	},
	render: function() {
		return (
			<div className="col-md-8">
				<div>Welcome to Playbook in Action! Before you begin, please consider the following:</div>
				<br />
				<div>
					<ul>
						<li>The intent of this tool is to assist in the creation of requirements documents
						for agile software development using best practices from the USDS
					  Playbook and TechFAR.</li>

						<li>The PM and the CO should be using this in partnership.</li>

						<li>V1 is for firm fixed price contracts only. The firm fixed price will be per iteration. </li>
						<li>This tool is not built to support waterfall development requirements documents.</li>

						<li>All documents should be approved by a warranted contracting officer and in consultation with your legal council as required.</li>
					</ul>
				</div>
				<IndexLink to="/rfp/1">
					<Button bsStyle="primary">
						Start		
					</Button>
				</IndexLink>
			</div>
		);
	},
});

module.exports = Welcome;
