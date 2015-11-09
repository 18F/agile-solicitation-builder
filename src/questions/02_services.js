var React = require('react');

var Services = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>
				<div>Services questions...</div>
			</div>
		);
	},
});

module.exports = Services;