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
	calculateRows: function(text){
		var chars = text.length;
		var rows = Math.ceil(chars / 113);
		var newLines = (text.match(/\n\n/g) || []).length;
		rows += newLines;
		return Math.max(rows, 4);
	},
	render: function() {
		var returnText = [];
		var liRe = /\n\d\./;
		var myArray = liRe.exec(this.props.text);
		var paragraphs = this.props.text.split("\n\n");
		for (i=0; i < paragraphs.length; i++){
			var paragraphText = paragraphs[i];
			returnText.push(
				<p>{paragraphText}</p>
			);
		}

		if(this.props.editing) {
			return (
				<div className="edit-box">
					<div className="edit" onClick={this.toggleEdit.bind(this, false)}>Done</div>
					<textarea className="form-control" rows={this.calculateRows(this.props.text)} defaultValue={this.props.text} onChange={this.handleChange}></textarea>
				</div>
			);
		} else {
			return (
				<div className="edit-box">
					<div className="edit" onClick={this.toggleEdit.bind(this, true)}>Edit</div>
					<div className="edit-content">
						{returnText}
					</div>
				</div>
			);
		}
	},
});

module.exports = EditBox;