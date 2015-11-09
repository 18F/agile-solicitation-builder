var React = require('react');

// Dependencies
var View = require('react-flexbox');

// Bootstrap
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

// Router stuff
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;

var Request = React.createClass({
	render: function() {
		var mainStyle = {
			paddingLeft: 8,
		};

		var subpages = [
			{id: "", title: "Overview"},
			{id: "/question/1", title: "1. Declarations"},
			{id: "/question/2", title: "2. Services"},
			{id: "/results", title: "Results"},
		];

		var links = subpages.map(function(subpage, i) {
			var link = "/rfp/"+this.props.params.id+subpage.id;
			var active = (link == this.props.location.pathname);
			return (
				<li role="presentation" className={active ? "active" : ""}><IndexLink to={link}>{subpage.title}</IndexLink></li>
			);
		}.bind(this));

		return (
			<View row>
				<View width="256px">
					<Nav stacked style={{width:256}} bsStyle="pills">
						{links}
					</Nav>
				</View>
				<View className="main" style={mainStyle}>
					<div>
						{this.props.children}
					</div>
				</View>
			</View>
		);
	},
});

module.exports = Request;