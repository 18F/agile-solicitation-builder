var React = require('react');

var Requirement = React.createClass({
	save: function(cb) {
		// TODO: save data
		setTimeout(cb, 500);
	},
	render: function() {
		return (
			<div>
				Yay requirements!
			</div>
		);
	},
});

module.exports = Requirement;