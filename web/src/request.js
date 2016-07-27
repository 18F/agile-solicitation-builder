var React = require('react');

// Dependencies

// Bootstrap
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

// Router stuff
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
var History = require('react-router').History;

// Custom elements
var questionList = require('./question_list');

var Sidebar = React.createClass({
	mixins: [History],

	propTypes: {
		rfpId: React.PropTypes.string.isRequired,
		currentPage: React.PropTypes.string.isRequired,
		width: React.PropTypes.number.isRequired,
	},

	componentDidMount: function() {
		// Make menu affixed
		// $("#sidenav").affix({
		//   offset: {
		//     top: 93,
		//   }
		// });
		$('.menu-btn, .overlay, .sliding-panel-close').on('click touchstart',function (e) {
    $('.sidenav, .overlay').toggleClass('is-visible');
    e.preventDefault();
  });
	},
	handleFollowLink: function(e) {
		e.preventDefault();
		this.props.onChange(function(){
			// @TODO error if page doesn't save
			var link = e.target.getAttribute("href");
			this.history.pushState(null, link, null);
		}.bind(this));
	},
	render: function() {
		var baseURL = "/rfp/" + this.props.rfpId;

		// var prefixLinks = [{link: "/rfp", title: "Overview"}];
		var postfixLinks = [{link: baseURL+"/results", title: "Results"}];

		// Generate subpages
		var questionLinks = questionList.map(function(question) {
			return {
				link: baseURL+"/question/"+question.code,
				title: question.title,
			};
		});
		var subpages = questionLinks.concat(postfixLinks);

		var links = subpages.map(function(subpage, i) {
			var active = (subpage.link == this.props.currentPage);
			return (
				<li key={i} ref={"link-"+i}>
					<a className={active ? "usa-current" : ""} href={subpage.link} onClick={this.handleFollowLink}>{subpage.title}</a>
				</li>
			);
		}.bind(this));

		var style = {
			width: this.props.width,
		};

		return (
			<ul className="usa-sidenav-list" id="sidenav" style={style}>
				{links}
			</ul>
		);
	},
});


var Request = React.createClass({
	loadData: function(cb) {
		cb("Error: no data found");
	},
	updateQuestion: function(questionName, data) {
		var updates = {};
		updates[questionName] = data;
		this.setState(updates);
	},
	componentDidMount: function() {
		this.loadData(function(err, data) {
			if(err) {
				// console.log("Error fetching data for questions: "+err);
				return;
			}

			this.setState(data);
		}.bind(this));
	},

	getInitialState: function() {
		return {
			question1: {},
			question2: {},
		};
	},

	handleSidebarChange: function(callback) {
		// Get child
		var child = React.Children.only(this.props.children);

		// console.log(child);
		if(child.type.displayName == "Question") {
			// If child is question, call save() with the callback
			// console.log("saving the child! it's a question...");
			this._child.save(callback);
		} else {
			// Otherwise, call callback
			// console.log("ignore the child, it's not a question (it's worthless)");
			callback();
		}
	},

	renderChildren: function() {
		return React.Children.map(this.props.children, function(child) {
			return React.cloneElement(child, {
				questionData: this.state,
				updateQuestion: this.updateQuestion,
				ref: function(child) {
					this._child = child;
				}.bind(this),
			});
		}.bind(this));
	},

	render: function() {
		var mainStyle = {
			paddingLeft: 16,
		};
		return (
			<div className="usa-grid">
				<div className="main usa-width-three-fourths" style={mainStyle}>
          {this.renderChildren()}
				</div>
				<div className="overlay"></div>
				<div className="usa-width-one-twelfth"></div>
				<aside className="usa-width-one-sixth side-bar">
					<Sidebar width={200} onChange={this.handleSidebarChange} currentPage={this.props.location.pathname} rfpId={this.props.params.id} />
				</aside>
			</div>
		);
	},
});

// <div className="usa-width-one-twelfth"></div>

module.exports = Request;
