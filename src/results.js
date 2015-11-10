var React = require('react');

var Results = React.createClass({
	getInitialState: function() {
		return {
			definitions01: "",
			services02: "",
			objectives03: "",
			requirements04: "",
			instructions05: "",
			inspection06: "",
			performance07: "",
			contracting_officer08: "",
			special_requirements09: "",
			clauses10: "",
			documents11: "",
			conditions12: "",
			evaluation13: "",
			appendix: "",
		};
	},
	render: function() {
		return (
			<div>
				<div>Yay results for RFP/RFQ {this.props.params.id}!</div>
			</div>
		);
	},
});

module.exports = Results;