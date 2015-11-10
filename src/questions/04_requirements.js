var React = require('react');

var Requirement = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>
				<h4>4.1	Key Personnel</h4>
				<p>The following requirements related to personnel must be met:</p>
				<ul>
					<li>a) If awarded this Task Order, the Contractor shall assign to perform this Task Order those persons whose résumés are submitted with its proposal and who are identified in the Contractor’s proposal as Key Personnel. Not all contractor employees assigned to perform this Task Order will be Key Personnel.</li>
					<li>b) If an individual proposed as Key Personnel becomes unavailable during the course of the source selection process, the Offeror will notify the Contracting Officer immediately and provide a substitute and their résumé. The proposal of any Key Personnel not currently employed by the Offeror shall be accompanied by letters of intent signed by the proposed Key Personnel indicating their intent to be employed by the Offeror if the Offeror is awarded a Task Order under this RFQ.</li>
					<li>c) The Contractor agrees that during the first six (6) months of Task Order performance, no Key Personnel substitutions will be made unless necessitated by an individual’s sudden illness, death, or termination of employment. In any of these events, the Contractor shall promptly notify the Contracting Officer and provide the information required by paragraph (e) below on the proposed replacement for Government approval. No substitutions of Key Personnel shall be made except in accordance with this provision.</li>
					<li>d) After the initial six-month period of performance, the Contractor must obtain Government approval of any substitution of Key Personnel prior to removing the approved Key Personnel from performance. All proposed substitutions/additions must be submitted, in writing, to the Contracting Officer at least 30 days (60 days if security clearances are involved) in advance of the proposed substitution and provide the information required by paragraph (e) below.</li>
					<li>e) All requests for substitutions/additions of Key Personnel must include a detailed explanation of the circumstances necessitating the proposed substitution or addition, a complete résumé for the proposed substitute or addition including skills, experience, education, training, and security level. As determined by the Contracting Officer, all proposed substitutes/additions must have qualifications that meet or exceed the qualifications of the person to be replaced.</li>
					<li>f) The Contracting Officer or his/her authorized representatives will evaluate the request(s) for substitutions/additions of Key Personnel and the Contracting Officer will notify the Contractor, in writing, of approval or disapproval. Disapproval of the proposed individual(s) shall not provide grounds for nonperformance by the Contractor or form the basis of any claim for monies, delivery schedule extension, or any other equitable adjustment.</li>
					<li>g) The personnel set forth below as proposed by the Contractor for this Task Order, or identified in the Contractor’s proposals as Key Personnel, shall comprise the list of Key Personnel required to perform under this Task Order. The list may be  modified in accordance with the above, to substitute or add personnel:</li>
						<ul>
							<li>@TODO please provide labor category and personnel name</li>
							<li>h)	At a minimum, a Project Manager must be identified and designated as Key Personnel. There may be more than one Project Manager. The Project Manager must be a senior staff member and is responsible for the supervision and management of the Contractor’s personnel, technical assistance, and interface and compliance with instructions from SBA’s COR. Desired skills/experience for the Project Manager include:</li>
							<li>a) Experience in technical leadership.</li>
							<li>b) Ability to rapidly prioritize competing requirements.</li>
							<li>c) Ability to understand and simplify customer requirements.</li>
							<li>d) Ability to communicate end user feedback to technical and design leads.</li>
							<li>e) Computer Science or Engineering degree or equivalent work experience.</li>
							<li>f) Strong communication skills.</li>
							<li>g) Proven knowledge of industry standards.</li>
							<li>h) Proven knowledge of managing Agile Software Development efforts.</li>
						</ul>
				</ul>
				<h4>Transition Plan</h4>
				<p>1)	Ensure that all deliverables, products, licenses, designs, data, documentation, tests, user research notes, source code, configuration settings and files, and materials developed throughout this Task Order will be the property of the U.S. Government.
2)	30 days prior to Task Order base period conclusion, provide a Transition Plan for all deliverables, products, and materials. Should options be exercised, the Transition Plan will be updated 30 days prior to the end of each option period.</p>
				3)	Coordinate with the COR and potentially another vendor, and implement the Transition Plan according to the COR’s direction.
4)	Provide assistance to the COR and potentially another vendor to stand-up and ensure the applications, systems, databases, platform, and environments are tested and fully operational.
5)	Ensure the transition plan includes a detailed inventory of all files, materials, etc. that will be submitted along with detailed instructions to seamlessly set up the websites, applications, databases, systems, platform, etc. At that time, all files, materials, boxes, etc. shall be clearly labeled, packaged, and indexed according to the inventory.
@TODO standard for code, 
				<h4>Transition Activities</h4>
				<p>The Contractor shall:
1)	During the transition to the Government and/or a new contractor, the Contractor shall perform all necessary transition activities, including, but not limited to, continued full services to SBA and other customers; participation, at discretion of COR in five or more meetings with the Government or new contractor to effect a smooth transition and provide detailed information on the operation of all deliverables; training of new personnel (contractor or Government) during transition period, in all system operation and maintenance functions; appropriate close-out of outstanding technical and related work.
2)	Final report should include list of accomplishments, documentation, and customized code developed for SBA. Should the Contractor be terminated prior to the end of the scheduled base period, the Contractor shall transfer all project materials to the COR within two weeks of the COR’s request.
</p>
				<h4>4.3-4.7</h4>
				<p></p>
				<h4>6.1, 6.2</h4>
				<p></p>
				<h4>section 7</h4>
				<p>what is your total period of performance? (suggest not more than 3)
				how many option periods would you like? 
				how long would you like each individual period of performance to be?
				(suggested per FAR 39.1 consider less or= 6 mo per period)
				if they answer it will populate into some kind of paragraph. 
					7.2: place of performance? 
				</p>
				<h4></h4>
				<p></p>
				<h4></h4>
				<p></p>								
			</div>
		);
	},
});

module.exports = Requirement;