var React = require('react');

var Requirement = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	getInitialState: function() {
		return {
			docType: localStorage.getItem("docType"),
			agency: localStorage.getItem("agency"),
			maxBudget: 0,
		};
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Contract Requirements</div>
				<p>This section has 7 components.</p>
				<p><b>@TODO RECONCILE THE TWO VERSIONS OF THE TEXT BELOW</b></p>
				<div className="sub-heading">Key Personnel</div>
				<p>The vendor shall provide talented people who have experience creating modern digital services. This includes bringing in seasoned product managers, engineers, and designers.</p>
				<p>What level of traffic/usage do you anticipate for your digital service?</p>
				<p>Will you need a native mobile app?</p>

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
							<li>At a minimum, a Project Manager must be identified and designated as Key Personnel. There may be more than one Project Manager. The Project Manager must be a senior staff member and is responsible for the supervision and management of the Contractor’s personnel, technical assistance, and interface and compliance with instructions from {this.state.agency}’s COR. Desired skills/experience for the Project Manager include:</li>
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
				<div className="sub-heading">Transition Plan</div>
				<p><b>CAN WE REWRITE THIS???</b></p>
				<p>The Contractor shall:</p>
				<ol>
					<li>Ensure that all deliverables, products, licenses, designs, data, documentation, tests, user research notes, source code, configuration settings and files, and materials developed throughout this Task Order will be the property of the U.S. Government.
					</li>
					<li>Reference section that talks about documents.
					All documentation shall be viewable at all times by all parties. 
					includes code, monitoring systems, 
					in support of an eventual transition reference sections X, Y, that talk about viewability, monitoring, code, user research. 
					</li>
					<li>Coordinate with the COR and potentially another vendor, and implement the Transition Plan according to the COR’s direction.
					</li>
					<li>Provide assistance to the COR and potentially another vendor to stand-up and ensure the applications, systems, databases, platform, and environments are tested and fully operational.
					</li>
					<li>Ensure the transition plan includes a detailed inventory of all files, materials, etc. that will be submitted along with detailed instructions to seamlessly set up the websites, applications, databases, systems, platform, etc. At that time, all files, materials, boxes, etc. shall be clearly labeled, packaged, and indexed according to the inventory.
					</li>
				</ol>

				<p>@TODO standard for code</p>

				<div className="sub-heading">Transition Activities</div>

				<ol>
					<li>During the transition to the Government and/or a new contractor, the Contractor shall perform all necessary transition activities, including, but not limited to, continued full services to {this.state.agency} and other customers; participation, at discretion of COR in five or more meetings with the Government or new contractor to effect a smooth transition and provide detailed information on the operation of all deliverables; training of new personnel (contractor or Government) during transition period, in all system operation and maintenance functions; appropriate close-out of outstanding technical and related work.
					</li>
					<li>Final report should include list of accomplishments, documentation, and customized code developed for {this.state.agency}. Should the Contractor be terminated prior to the end of the scheduled base period, the Contractor shall transfer all project materials to the COR within two weeks of the COR’s request.
					</li>
				</ol>
				<div className="sub-heading">Controlled Facilities and Information Systems Security</div>
				<p>The contractor must adhere to the IT security requirements described in the Appendix, including all security requirements related to deliverables under this Task Order.</p>
				<p>@TODO lookup agency specific security guidelines</p>
				
			<div className="sub-heading">Section 508 Accessibility Standards Notice (September 2009)</div>
			<p>All deliverables (including, but not limited to, electronic and information technology (EIT)) procured through this Task Order must meet the applicable accessibility standards at 36 CFR § 1194, U.S. Architectural and Transportation Barriers Compliance Board (Access Board) under the authority of Section 508 of the Rehabilitation Act Amendment of 1998, unless an agency exception to this requirement exists. 36 CFR § 1194, U.S. Architectural and Transportation Barriers Compliance Board (Access Board) is viewable at http://www.section508.gov.  The Contractor shall indicate for each line item in the schedule whether each product or service is compliant or noncompliant with the accessibility standards at 36 CFR § 1194.  Further, the proposal must indicate where full details of compliance can be found (e.g., vendor’s website or other exact location).</p>

			<div className="sub-heading">Non-Disclosure Policies</div>
			<p>The work to be performed by and the data released to the Contractor’s personnel shall be treated as sensitive and confidential in nature and is not to be discussed with or released to anyone except {this.state.agency} employees assigned to work with the Contractor and other Contractor personnel working on the Task Order.
			</p>
			<p>The Contractor is responsible for requiring all of its employees working under this Task Order, who have access to privileged information under this Task Order, to execute all Certifications required by the {this.state.agency}. The {this.state.agency}, as it deems appropriate, may require additional certifications be completed by the contractor at any time during Task Order performance.
			</p>

			<div className="sub-heading">Potential Organizational Conflicts of Interest</div>
			<p>Offerors shall provide a signed statement which describes concisely all relevant facts concerning any past, present, or planned interest (financial, contractual, organizational, or otherwise) relating to the work to be performed under the proposed contract or task order and bearing on whether the Offeror has a possible organizational or personnel conflict of interest with respect to:
			</p>
			<ol>
				<li>Being able to render impartial, technically sound, and objective assistance or advice, or
				</li>
				<li>Being given an unfair competitive advantage.
				</li>
			</ol>
			<p>The Offeror may also provide relevant facts that show how its organizational structure and/or management systems limit its knowledge of possible organizational conflicts of interest relating to other divisions or sections of the organization and how that structure or system would avoid or mitigate such organizational conflict.
			</p>
			<p>No task order award shall be made until any potential conflict of interest has been neutralized or mitigated to the satisfaction of the Contracting Officer. The vendor will notify the Contracting Officer in writing as soon as any conflict of interest is identified and will propose steps for mitigating the conflict.</p>
			<p>Refusal to provide the requested information or the willful misrepresentation of any relevant information by an Offeror shall disqualify the Offeror from further consideration for award of a task order under this solicitation.</p>
			<p>If the Contracting Officer determines that a potential conflict can be avoided, effectively mitigated, or otherwise resolved through the inclusion of a special contract clause, the terms of the clause will be subject to negotiation.</p>


			<div className="sub-heading">Contractor Use of Commercial Computer Software, Including Open Source Software</div>
			<p>Open source software is often licensed under terms that require a user to make user’s modifications to the open source software or any software that the user combines with the open source software freely available in source code form pursuant to distribution obligations in the license. In cases where the Contractor proposes to use the open source software while performing under this Task Order, regardless of whether the open source software is delivered, the Contractor shall not create, or purport to create, any Government distribution obligation with respect to Government computer software deliverables. Prior to using any commercial computer software, including open source software which is considered commercial computer software, the Contractor shall evaluate each license for commercial computer software, and confirm that each of the following requirements is satisfied:
			</p>
			<ol>
				<li>A license for a particular commercial computer software shall be compatible with all licenses for other commercial computer software that are or will be linked to, adapted to, integrated, combined or merged with the particular commercial computer software, including when the particular commercial computer software and the other commercial computer software are used with another computer program
				</li>
				<li>A license for commercial computer software shall not impose a future Government obligation that is foreseeable by the Contractor
				</li>
				<li>A license for commercial computer software shall not be terminated by the Contractor’s use of the commercial computer software in performing under the contract
				</li>
				<li>Contractor’s cost to comply with this requirement presents no additional costs to the Government
				</li>
			</ol>
			<p>If, as a result of the Contractor’s evaluation, the Contractor satisfies all of the requirements in the paragraphs above, then the Contractor shall provide a written summary report of the above findings to the Contracting Officer stating that the Contractor has evaluated the commercial computer software use and the commercial computer software license, and made each determination required in the paragraphs above. The Contractor shall request permission from the Contracting Officer to use the proposed commercial computer software. This notification shall include all information regarding the identification and proposed use(s) of the commercial computer software.
			</p>
			<p>If the Contractor is unable to satisfy all of the requirements in the paragraphs above for a particular commercial computer software license, then the Contractor may not use the commercial computer software covered by the particular license without prior written approval of the Contracting Officer. If the Contractor wants to use the commercial computer software for which the requirements in the paragraphs above within this section are not satisfied, the Contractor shall request approval to use the otherwise prohibited subject commercial computer software from the Contracting Officer by providing written notification addressing the following:
			</p>
			<ol>
				<li>The name and version number of the software;</li>
				<li>The name of applicable license(s);</li>
				<li>A brief description of the technical use and implementing approach</li>
				<li>A “yes/no” indication as to whether the Contractor has made, or will make, any modifications to the source code;</li>
				<li>The software website; and,</li>
				<li>An identification of the reason(s) that the Contractor was unable to make the determination in the paragraphs above.
				</li>
			</ol>

			<div className="sub-heading"></div>
				<p></p>								
			</div>

		);
	},
});

module.exports = Requirement;