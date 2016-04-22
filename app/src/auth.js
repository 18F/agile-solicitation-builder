var React = require('react');

function getToken(callback) {
  $.ajax({
    type: "GET",
		url: "/api/token",
		dataType: 'json',
		success: function(data) {
      if(typeof callback === 'function') {
        callback(data.token);
      }
    },
    error: function() {
      if(typeof callback === 'function') {
        callback(null);
      }
    }
  });
}

function login(callback) {
  getToken(function(token) {
		$.ajax({
			type: "GET",
			url: "/api/token",
			username: token,
			password: 'none',
			success: function() {
        if(typeof callback === 'function') {
          callback(token);
        }
      }
		});
	});
}

function logout(callback) {
	$.ajax({
		type: "GET",
		url: "/api/authtest",
		username: "--invalid--",
		password: "--invalid--",
    complete: callback
	});
}

var AuthButton = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      text: 'Log In'
    }
  },

  componentDidMount: function() {
    getToken(function(token) {
      if(token) {
        this.setState({ loggedIn: true, text: 'Log Out' });
      } else {
        this.setState({ loggedIn: false, text: 'Log In' });
      }
    }.bind(this));
  },

  click: function() {
    if(this.state.loggedIn) {
      logout(function() {
        this.setState({ loggedIn: false, text: 'Log In' });
      }.bind(this));
    } else {
      login(function() {
        this.setState({ loggedIn: true, text: 'Log Out' });
      }.bind(this));
    }
  },

  render: function() {
    return(
      <button onClick={this.click}>{this.state.text}</button>
    );
  }
});

module.exports = AuthButton;
