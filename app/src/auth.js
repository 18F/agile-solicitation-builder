var React = require('react');

function login(callback) {
  if(typeof callback !== 'function') {
    callback = function() { };
  }

  $.ajax({
    type: 'GET',
    url: '/api/token',
    dataType: 'json',
    success: function(data) {
      var token = data.token;
      $.ajax({
  			type: "GET",
  			url: "/api/token",
  			username: token,
  			password: 'none',
  			success: function() {
          callback(token);
        }
  		});
    },
    error: function() {
      callback(false);
    }
  });
}

function logout(callback) {
	$.ajax({
		type: "GET",
		url: "/api/token",
		username: "--invalid--",
		password: "--invalid--",
    complete: callback
	});
}

var _all = [ ];
function registerSelf(self) {
  _all.push(self);
}

var _state = { loggedIn: false, text: 'Log In' };
function getGlobalState() {
  return _state;
}

function updateAllAuthComponents(state) {
  _state = state;
  _all.forEach(function(component) {
    component.updateState(state);
  });
}

var AuthButton = React.createClass({
  getInitialState: function() {
    registerSelf(this);
    return {
      loggedIn: false,
      text: 'Log In'
    }
  },

  componentDidMount: function() {
    this.setState(getGlobalState());
  },

  updateState: function(state) {
    this.setState(state);
  },

  click: function() {
    if(this.state.loggedIn) {
      logout(function() {
        updateAllAuthComponents({ loggedIn: false, text: 'Log In' });
      });
    } else {
      login(function(token) {
        if(token) {
          updateAllAuthComponents({ loggedIn: true, text: 'Log Out' });
        } else {
          updateAllAuthComponents({ loggedIn: false, text: 'Log In' })
        }
      });
    }
  },

  hideButton: function() {
    return (
      (this.props.hideIfLoggedIn && this.state.loggedIn) ||
      (this.props.hideIfLoggedOut && !this.state.loggedIn)
    );
  },

  render: function() {
    return(
      <span className={this.props.className}>
        {this.hideButton() ? null : <button onClick={this.click}>{this.state.text}</button>}
      </span>
    );
  }
});

function makeWrapper(className, hideIfLoggedIn) {
  var is = hideIfLoggedIn ? "none" : "";
  var not = hideIfLoggedIn ? "" : "none";

  return React.createClass({
    getInitialState: function() {
      registerSelf(this);
      return { loggedIn: false };
    },

    componentDidMount: function() {
      this.setState(getGlobalState());
    },

    updateState: function(state) {
      this.setState(state);
    },

    render: function() {
      return(
        <span className={className + " " + (this.state.loggedIn ? "is-logged-in" : "is-not-logged-in")} style={{ display: this.state.loggedIn ? is : not }}>
          {this.props.children}
        </span>
      );
    }
  })
}

module.exports = {
  Button: AuthButton,
  HideIfLoggedIn: makeWrapper('hide-if-logged-in', true),
  HideIfLoggedOut: makeWrapper('hide-if-logged-out', false)
};
