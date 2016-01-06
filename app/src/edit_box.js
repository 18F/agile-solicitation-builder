var React = require('react');

var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),

  // Enabled
  sanitize: true, // Sanitize output
  smartLists: true, // Smarter list behavior

  // Disabled
  gfm: false, // Github-flavored markdown
  tables: false, // Github-flavored markdown tables
  breaks: false, // Github-flavored markdown linebreaks (?)
  pedantic: false, // Don't fix original markdown bugs
  smartypants: false // Smart typographic punctuation
});

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
		var renderedMarkdown = {__html: marked(this.props.text)};

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
					<div className="edit-content" dangerouslySetInnerHTML={renderedMarkdown}></div>
				</div>
			);
		}
	},
});

module.exports = EditBox;