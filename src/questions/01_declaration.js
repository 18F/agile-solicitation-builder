var React = require('react');

var Declaration = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>
				<div>Declaration questions...</div>
			</div>
		);
	},
});

module.exports = Declaration;