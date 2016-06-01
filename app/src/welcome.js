var React = require('react');

// Bootstrap
var Button = require('react-bootstrap').Button;

// Router stuff
var IndexLink = require('react-router').IndexLink;

// Auth stuff
var AuthMixin = require('./auth/mixin');
var LoginButton = require('./auth/login-button');
var RegisterButton = require('./auth/register-button');

var Welcome = React.createClass({
	mixins: [AuthMixin],

	getInitialState: function() {
		// This component could be loaded sometime
		// after the initial page load, in which
		// case it won't get an event for the initial
		// login status check.  So, to mitigate that,
		// pretend we got the event after a short
		// delay.  The delay is to allow React time
		// to setup the component state.
		setTimeout(this.loginStateChanged, 50);
		return {
			rfqs: "",
		};
	},

	loginStateChanged: function() {
		if(this.state.loggedIn) {
			getRFQs(function(content){
	      this.setState({
	        rfqs: content['data'],
	      });
	    }.bind(this));
		} else {
			this.setState({ rfqs: "" });
		}
	},

	render: function() {
		var rfqs = [];
		for (var i=0; i < this.state.rfqs.length; i++) {
			var this_rfq = this.state.rfqs[i];
			var agency = this_rfq['agency'];
			var doctype = this_rfq['doc_type'];
			var url = '#/rfp/' + this_rfq['id'] + '/question/1';
			rfqs.push(
				<li key={this_rfq['id']}>
					<a href={url} >
						#{this_rfq['id']}, {this_rfq['doc_type']} for <b>{this_rfq['program_name']}</b> with {this_rfq['agency']}
					</a>
				</li>
			);
		}
		return (
      <div className="usa-grid">
        <div className="usa-width-two-thirds">
          <h4>Welcome to the Agile Solicitation Builder, formerly the Playbook in Action! Before you begin, please consider the following:</h4>
          <div>
            <ul>
              <li>The intent of this tool is to assist in the creation of requirements documents
              for agile software development using best practices from the USDS
              Playbook and TechFAR.</li>

              <li>The PM and the CO should use this tool jointly in partnership. Certain pages will only be applicable to only the CO or the PM.</li>

              <li>V1 is for firm fixed price contracts only. The firm fixed price will be per iteration. </li>
              <li>This tool is not built to support waterfall development requirements documents.</li>

              <li>All documents should be approved by a warranted contracting officer and in consultation with your legal counsel as required.</li>
            </ul>
            <h4>Also please note that this product is only in alpha, therefore any of the following may occur:</h4>
              <ul>
                <li>Content may unexpectedly change</li>
                <li>Documents you have created may be deleted without warning</li>
                <li>Certain pages may not always be functioning. We recommend you refresh the page if this happens</li>
              </ul>
          </div>
          {(rfqs.length > 0)? <div><div className="sub-heading">Resume RFQ</div>
            <ul>
              {rfqs}
            </ul></div> : null}

          <br />
					<LoginButton hideIfLoggedIn={true} />
					<RegisterButton />
					{(this.state.loggedIn) ?
          <IndexLink to="/rfp">
						<Button bsStyle="primary">
            	Start	New RFQ
          	</Button>
          </IndexLink> : null}
        </div>
      </div>
		);
	},
});

module.exports = Welcome;
