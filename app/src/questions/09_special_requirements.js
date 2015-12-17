var React = require('react');

var SpecialRequirements = React.createClass({
	getInitialState: function() {
		return {};
	},
	toggleEdit: function(key, event) {
		console.log(key);
		if (this.state.edit === key){
			this.setState({
      	edit: null,
	    });
		}
		else {
			this.setState({
	      edit: key,
	    });
		}
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Special Contract Requirements</div>
				<br />
				<button>Add Special Requirement</button>
				<br />

				<div className="sub-heading">Controlled Facilities and Information Systems Security</div>
				<p>The contractor must adhere to the IT security requirements described in the Appendix, including all security requirements related to deliverables under this Task Order.</p>
				<p>@TODO lookup agency specific security guidelines</p>
				
			<div className="sub-heading">Section 508 Accessibility Standards Notice (September 2009)</div>
			<p>All deliverables (including, but not limited to, electronic and information technology (EIT)) procured through this Task Order must meet the applicable accessibility standards at 36 CFR § 1194, U.S. Architectural and Transportation Barriers Compliance Board (Access Board) under the authority of Section 508 of the Rehabilitation Act Amendment of 1998, unless an agency exception to this requirement exists. 36 CFR § 1194, U.S. Architectural and Transportation Barriers Compliance Board (Access Board) is viewable at http://www.section508.gov.  The Contractor shall indicate for each line item in the schedule whether each product or service is compliant or noncompliant with the accessibility standards at 36 CFR § 1194.  Further, the proposal must indicate where full details of compliance can be found (e.g., vendor’s website or other exact location).</p>

			<div className="sub-heading">Non-Disclosure Policies</div>
			<div className="sub-text"></div>
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

	
				<div className="sub-heading">Title to Materials Shall Vest in the Government</div>
				<p>All hardware, software, materials, products, licenses, source code, data, and information produced and/or furnished to the Government under this Task Order shall become the property of and remain with the Government upon delivery and acceptance by the Government. This shall include but not be limited to the following: plans, systems analysis, design specifications, drawings, completed programs and documentation thereof, reports and listings, all tapes, disk files, and other items pertaining to the work and services to be performed pursuant to the Task Order. The Government shall have unlimited rights to use, disclose, reproduce, prepare derivative works, and distribute copies to the public of such hardware, software, materials, products, licenses, source code, data, and information in any manner and for any purpose, and to have or permit others to do so, without compensation to or approval from the Contractor.</p>

				<p>All hardware, software, materials, products, licenses, source code, data, and information produced or acquired with Task Order funds, or under the Contractor’s control as Government Furnished Property or Materials, shall be turned over to the Government (or a new contractor, as applicable) in good condition. All data and supporting documentation shall be submitted or furnished to the Government, including the website, application, data files, analytic data files (with associated instructions and codebook listing and defining all variables), and public use data files with associated documentation. Analytic files (where source files are reduced in volume and tailored to specific analyses), data analytic programs and results produced under auspices of this project shall be property of the Government. All information and materials including data developed under this Task Order are the property of the Government and shall be delivered as part of the transition and turnover at the end of the Task Order.</p>

				<div className="sub-heading">Limited Use of Data</div>
				<p>Performance of this Task Order may require the contractor to access and use data and information proprietary to the Government, which is of such a nature that its dissemination or use, other than in performance of this Task Order, would be adverse to the interests of the Government.</p>
				<p>The Contractor and/or contractor personnel shall not divulge or release data or information developed or obtained in performance of this Task Order until made public by the Government, except to authorized Government personnel or upon written approval by the Contracting Officer. The Contractor shall not use, disclose, or reproduce data identified as proprietary, other than as required in the performance of this Task Order. Nothing herein shall preclude the use of any data independently acquired by the contractor without such limitations or prohibit an agreement at no cost to the Government between the Contractor and the data owner which provides for greater rights to the Contractor.</p>
				<p>The Contractor shall release all required deliverables and data or other works developed under this Task Order solely in accordance with the terms and conditions of this Task Order. All data collected and remaining in the custody of the Contractor at the close of this Task Order that permits identification of an individual or entity described in the data, or an individual supplying it, must be delivered to the COR or destroyed, in accordance with the terms of the Transition Plan. No copies or parts of data or derivative files (encrypted and/or individually identifiable) may be kept by the contractor.</p>

				<div className="sub-heading">Notice of Size Re-representation at the Task Order Level (will be conditional)</div>
				<p>Offers are solicited only from Alliant Small Business GWAC prime contractors that qualify as small, in accordance with the size standard that corresponds to the North American Industry Classification System (NAICS) code assigned to this Task Order, as of the date that they submit their Stage Two proposals.  An Offeror must be small as of the date that it submits its proposal for Stage Two and its size status does not relate back to its size recertification under the Alliant Small Business GWAC that was required under FAR 52.219-28.</p>
				<p>An Offeror shall represent its small business size status by validating or updating all of its representations in the Representations and Certifications section of the System for Award Management (SAM) and other data in SAM, as necessary, to ensure that these representations reflect the Offeror’s current size status.</p>
				<p>Offerors who misrepresent their small business size status are subject to the penalties contained in 13 C.F.R. 121.108.</p>

				<div className="sub-heading">Order of Precedence</div>
				<p>In the event of an inconsistency between the Special Contract Requirements and the FAR clauses provisions in the RFQ or the Task Order, the inconsistency shall be resolved by giving precedence in the following order:</p>

				<p>1.	Special Contract Requirements (Section 9 of the RFQ)</p>
				<p>2.	FAR Clauses contained in Section 10 of the RFQ</p>

			</div>
		);
	},
});


module.exports = SpecialRequirements;