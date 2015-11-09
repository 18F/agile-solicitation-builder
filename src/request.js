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

		return (
			<View row>
				<View width="256px">
					<Nav stacked style={{width:256}}>
						<li><IndexLink to="/rfp/1">Overview</IndexLink></li>
						<li><Link to="/rfp/1/question/1">1. Declarations</Link></li>
						<li><Link to="/rfp/1/question/2">2. Services</Link></li>
						<li><Link to="/rfp/1/results">Results</Link></li>
					</Nav>
				</View>
				<View class="main" style={mainStyle}>
					<div>
						{this.props.children}
					</div>
				</View>
			</View>
		);
	},
});

module.exports = Request;