var React = require('react');

// Dependencies
var View = require('react-flexbox');

// Bootstrap
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

// Router stuff
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;

// Custom elements
var questionList = require('./question_list');

var Sidebar = React.createClass({
	propTypes: {
		rfpId: React.PropTypes.string.isRequired,
		currentPage: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
	},
	render: function() {
		var baseURL = "/rfp/" + this.props.rfpId;

		var prefixLinks = [{link: baseURL, title: "Overview"}];
		var postfixLinks = [{link: baseURL+"/results", title: "Results"}];

		// Generate subpages
		var questionLinks = questionList.map(function(question) {
			return {
				link: baseURL+"/question/"+question.code,
				title: question.title,
			};
		});
		var subpages = prefixLinks.concat(questionLinks).concat(postfixLinks);

		var links = subpages.map(function(subpage, i) {
			var active = (subpage.link == this.props.currentPage);
			return (
				<li className={active ? "active" : ""}>
					<IndexLink to={subpage.link}>{subpage.title}</IndexLink>
				</li>
			);
		}.bind(this));

		var style = {
			width: this.props.width,
		};

		return (
			<Nav stacked style={style} bsStyle="pills">
				{links}
			</Nav>
		);
	},
});


var Request = React.createClass({
	render: function() {
		var mainStyle = {
			paddingLeft: 16,
		};
		return (
			<View row>

				<View className="main col-md-8" style={mainStyle}>
					<div>
						{this.props.children}
					</div>
				</View>
				<View className="col-md-1">					
				</View>
				<View className="col-md-2">
					<Sidebar width={200} currentPage={this.props.location.pathname} rfpId={this.props.params.id} />
				</View>
				<View className="col-md-1">					
				</View>
			</View>
		);
	},
});

module.exports = Request;