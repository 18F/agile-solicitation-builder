var React = require('react');
var Definitions = require('./questions/01_definitions.js');
var Services = require('./questions/02_services.js');
var Requirements = require('./questions/04_requirements.js');

var Results = React.createClass({
	getInitialState: function() {
		return {};
	},
  componentDidMount: function() {
  	this.setState({rfqDelete: false});
  	$(".confirm-delete").hide();
  },
  handleDelete: function(value){
  	if (value === "yes"){
  		$(".confirm-delete").show();
	  }
	  else {
	  	$(".confirm-delete").hide();
	  }
  },
  deleteRFQ: function(){
  	var rfqId = getId(window.location.hash);
  	deleteRFQ(rfqId, function(message){
  		console.log(message);
  		alert(message["message"]);
  		window.location.replace("/");
  	});
  },
	render: function() {
		var rfqId = window.location.hash.split("#/rfp/")[1].split("/results")[0];
		var url = "/download/" + rfqId;
		return (
			<div>
				<div className="main-heading">Resulting RFQ</div>
				<a href={url}><button className="btn btn-default">Download</button></a>
				<br />
				<br />
				<button onClick={this.handleDelete.bind(this, "yes")} className="btn btn-default">Delete this RFQ</button>
				<div className="confirm-delete">
					<br />
					<h4>Are you sure you want to delete this RFQ?</h4>
					<button onClick={this.handleDelete.bind(this, "no")} className="btn btn-default yes-no">No</button>
					<button onClick={this.deleteRFQ} className="btn btn-default yes-no">Yes</button>
				</div>
			</div>
		);
	},
});

module.exports = Results;