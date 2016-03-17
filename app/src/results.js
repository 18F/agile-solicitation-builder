var React = require('react');

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
				<div className="page-heading">Resulting RFQ</div>
				<a href={url}><button>Download</button></a>
				<button onClick={this.handleDelete.bind(this, "yes")}>Delete this RFQ</button>
        <div className="confirm-delete">
          <div className="usa-alert usa-alert-warning">
            <div className="usa-alert-body">
              <h3 className="usa-alert-heading">Are you sure you want to delete this RFQ?</h3>
            </div>
          </div>
          <button onClick={this.handleDelete.bind(this, "no")} className="usa-button-secondary yes-no">No</button>
          <button onClick={this.deleteRFQ} className="usa-button-secondary yes-no">Yes</button>
        </div>
			</div>
		);
	},
});

module.exports = Results;