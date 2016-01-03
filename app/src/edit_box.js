var React = require('react');

var EditBox = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired,
		editing: React.PropTypes.bool.isRequired,
		onStatusChange: React.PropTypes.func.isRequired,
		onTextChange: React.PropTypes.func.isRequired,
	},

	getInitialState: function() {
		return {};
	},
	toggleEdit: function(editing) {
		this.props.onStatusChange(editing);
	},
	handleChange: function(event){
		this.props.onTextChange(event);
	},
	render: function() {
		if(this.props.editing) {
			return (
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, false)}>Done</div>
					<textarea className="form-control" rows="4" defaultValue={this.props.text} onChange={this.handleChange}></textarea>
				</div>
			);
		} else {
			return (
				<div>
					<div className="edit" onClick={this.toggleEdit.bind(this, true)}>Edit</div>
					{this.props.text}
				</div>
			);
		}
	},
});

module.exports = EditBox;