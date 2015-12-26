var React = require('react');
var StateMixin = require("../state_mixin");


var PostAward = React.createClass({
	mixins: [StateMixin],
	getInitialState: function() {
		return {
			invoicing: "",
		};
	},
	componentDidMount: function() {
		var rfqId = getId(window.location.hash);
    get_data(5, rfqId, function(content){
    	var data = content["data"];
      this.setState({
      	invoicing: data["invoicing"],
      });
    }.bind(this));
  },
	render: function() {
		return (
			<div>
				<div className="sub-heading">Invoicing & Funding</div>
				<p>{this.state.invoicing}</p>
			</div>
		);
	},
});


module.exports = PostAward;