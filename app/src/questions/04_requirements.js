var React = require('react');
var StateMixin = require("../state_mixin");

var STATES = [];

var Requirement = React.createClass({
	mixins: [StateMixin],
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	getInitialState: function() {
		var initialStates = getStates(STATES);
		return initialStates;
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(4, rfqId, function(content){
    	var componentStates = getComponents(content["data"]);
      this.setState( componentStates );
    }.bind(this));
  },
	render: function() {
		return (
			<div>
				<div className="main-heading">Contractor Personnel</div>
				<p><b>@TODO RECONCILE THE TWO VERSIONS OF THE TEXT BELOW</b></p>
				<div className="sub-heading">Key Personnel</div>
				<p>The vendor shall provide talented people who have experience creating modern digital services. This includes bringing in seasoned product managers, engineers, UX researchers and designers.</p>

				<p>Based on the deliverables described in the SOO, in addition to a project manager, skillsets/personnel needs will include the following:</p>
				<ul>
					<li>UX</li>
					<li>Backend Web Engineer</li>
					<li>Frontend Web Developer</li>
					<li>Devops?</li>
					<li></li>
				</ul>

				<p><b>@TODO How can we shift the focus of this text to performance?</b></p>
				<p>Some key points to include: if government not happy then X happens. There needs to be a POC on contractor side who is responsible. If there will be delays because of things on the government side the contractor needs to communicate this ASAP and come up with new schedule with CO/PM.</p>	

				<p>The following requirements related to personnel must be met:</p>
					<ol>
						<li>If awarded this Task Order, the Contractor shall assign to perform this Task Order those persons whose résumés are submitted with its proposal and who are identified in the Contractor’s proposal as Key Personnel. Not all contractor employees assigned to perform this Task Order will be Key Personnel.</li>
						<li>If an individual proposed as Key Personnel becomes unavailable during the course of the source selection process, the Offeror will notify the Contracting Officer immediately and provide a substitute and their résumé. The proposal of any Key Personnel not currently employed by the Offeror shall be accompanied by letters of intent signed by the proposed Key Personnel indicating their intent to be employed by the Offeror if the Offeror is awarded a Task Order under this RFQ.</li>
						<li>The Contractor agrees that during the first six (6) months of Task Order performance, no Key Personnel substitutions will be made unless necessitated by an individual’s sudden illness, death, or termination of employment. In any of these events, the Contractor shall promptly notify the Contracting Officer and provide the information required by paragraph (e) below on the proposed replacement for Government approval. No substitutions of Key Personnel shall be made except in accordance with this provision.</li>
						<li>After the initial six-month period of performance, the Contractor must obtain Government approval of any substitution of Key Personnel prior to removing the approved Key Personnel from performance. All proposed substitutions/additions must be submitted, in writing, to the Contracting Officer at least 30 days (60 days if security clearances are involved) in advance of the proposed substitution and provide the information required by paragraph (e) below.</li>
						<li>All requests for substitutions/additions of Key Personnel must include a detailed explanation of the circumstances necessitating the proposed substitution or addition, a complete résumé for the proposed substitute or addition including skills, experience, education, training, and security level. As determined by the Contracting Officer, all proposed substitutes/additions must have qualifications that meet or exceed the qualifications of the person to be replaced.</li>
						<li>The Contracting Officer or his/her authorized representatives will evaluate the request(s) for substitutions/additions of Key Personnel and the Contracting Officer will notify the Contractor, in writing, of approval or disapproval. Disapproval of the proposed individual(s) shall not provide grounds for nonperformance by the Contractor or form the basis of any claim for monies, delivery schedule extension, or any other equitable adjustment.</li>
						<li>The personnel set forth below as proposed by the Contractor for this Task Order, or identified in the Contractor’s proposals as Key Personnel, shall comprise the list of Key Personnel required to perform under this Task Order. The list may be  modified in accordance with the above, to substitute or add personnel:</li>
						<input type="text"/>
						<p>2 columns "labor category", "key personnel name", 3 rows, </p>
							<ol>
								<li>Member(s) of the team have experience building popular, high-traffic digital services</li>
								<li>Member(s) of the team have experience building scalable digital services</li>
								<li>Member(s) of the team have experience designing native mobile</li>
								<li>mobile responsive web applications</li>
								<li>Member(s) of the team have experience using automated testing frameworks</li>
								<li>Member(s) of the team have experience with modern development and operations (DevOps) techniques like continuous integration and continuous deployment</li>
								<li>Member(s) of the team have experience securing digital services</li>
							</ol>
							<ol>
								<li><b>@TODO please provide labor category and personnel name</b></li>
								<li>At a minimum, a Project Manager must be identified and designated as Key Personnel. There may be more than one Project Manager. The Project Manager must be a senior staff member and is responsible for the supervision and management of the Contractor’s personnel, technical assistance, and interface and compliance with instructions from AGENCY’s COR. Desired skills/experience for the Project Manager include:</li>
								<li>Experience in technical leadership.</li>
								<li>Ability to rapidly prioritize competing requirements.</li>
								<li>Ability to understand and simplify customer requirements.</li>
								<li>Ability to communicate end user feedback to technical and design leads.</li>
								<li>Computer Science or Engineering degree or equivalent work experience.</li>
								<li>Strong communication skills.</li>
								<li>Proven knowledge of industry standards.</li>
								<li>Proven knowledge of managing Agile Software Development efforts.</li>
							</ol>
					</ol>
				
			</div>

		);
	},
});

module.exports = Requirement;