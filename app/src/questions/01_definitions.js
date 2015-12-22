var React = require('react');
var StateMixin = require("../state_mixin");

var Definition = React.createClass({
    mixins: [StateMixin],
    // Every question must implement a save() method
    save: function(cb) {
        setTimeout(cb, 500);
      // put_data("definitions", this.state.definitions);
    },
    // React functions
    getInitialState: function(){
      return {
        definitions: "",
      };
    },
    componentDidMount: function() {
      var rfqId = get_id(window.location.hash);
      get_data(1, rfqId, function(data){
        this.setState({
          definitions: data["data"]["definitions"],
        });
      }.bind(this));
    },

    render: function() {
        return (
            <div>
                <div className="main-heading">Definitions</div>
                <p>These are the standard definitions for agile development terms in alignment with the USDS Playbook. You can also modify the definitions and add additional terms. When you are done click the "Next" button at the bottom of the page.</p>
                <textarea className="form-control" rows="15" value={this.state.definitions} onChange={this.handleChange.bind(this, "definitions")}></textarea>
            </div>
        );
    },
});

module.exports = Definition;