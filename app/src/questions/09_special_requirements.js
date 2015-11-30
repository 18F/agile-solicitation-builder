var React = require('react');

var SpecialRequirements = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function() {
		return (
			<div>
				<div className="main-heading">Special Contract Requirements</div>
	
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