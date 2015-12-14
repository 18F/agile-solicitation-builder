var React = require('react');

var Definition = React.createClass({
    // Custom logic
    handleChange: function(event) {
        this.setState({
            text: event.target.value,
        });
        // TODO: add auto-save at some point
    },
    // Every question must implement a save() method
    save: function(cb) {      
      put_data("definitions", this.state.text);
    },
    // React functions
    getInitialState: function(){
      return {
        text: "",
      };
    },

    componentDidMount: function() {
      get_data("definitions", function(content){ 
        this.setState({
          text: content,
        });
      }.bind(this));
    },

    render: function() {
        return (
            <div>
                <div className="main-heading">Definitions</div>
                <p>These are the standard definitions for agile development terms in alignment with the USDS Playbook. You can also modify the definitions and add additional terms. When you are done click the "Next" button at the bottom of the page.</p>
                <textarea className="form-control" rows="10" value={this.state.text} onChange={this.handleChange}></textarea>
            </div>
        );
    },
});

module.exports = Definition;