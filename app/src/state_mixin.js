module.exports = {
	handleChange: function(key, event) {
		var newState = {};
		newState[key] = event.target.value;
		this.setState(newState);
	},
	toggleEdit: function(key) {
		if(this.state.edit === key) {
			this.setState({
	    	edit: null,
	    });
		} else {
			this.setState({
	      edit: key,
	    });
		}
	},
};