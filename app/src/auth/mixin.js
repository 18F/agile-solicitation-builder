var _components = [ ];
var _currentState = false;

function updateComponents() {
  _components.forEach(function(c) {
    c.setState({ loggedIn: _currentState });
    if(typeof c.loginStateChanged === 'function') {
      c.loginStateChanged();
    }
  });
}


function login(username, password, callback) {
  if(typeof username === 'function') {
    callback = username;
    username = undefined;
    password = undefined;
  }
  if(typeof callback !== 'function') {
    callback = function() { };
  }

  var failed = true;
  var opts = {
    type: 'GET',
    url: '/api/token',
    dataType: 'json',
    success: function(data) {
      var token = data.token;
      failed = false;
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
    complete: function() {
      if(failed) {
        callback(false);
      }
    }
  };

  if(username && password) {
    opts.username = username;
    opts.password = password;
  }

  $.ajax(opts);
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

$.ajax({
  type: 'GET',
  url: '/api/isLoggedIn',
  dataType: 'json',
  success: function(data) {
    if(typeof data === 'object') {
      _currentState = !!data.loggedIn;
      updateComponents();
    }
  }
});

module.exports = {
  componentWillMount: function() {
    _components.push(this);
    this.setState({ loggedIn: _currentState });
  },

  componentWillUnmount: function() {
    var index = _components.indexOf(this);
    if(index >= 0) {
      _components.splice(index, 1);
    }
  },

  setAuthenticationState: function(loggedIn) {
    _currentState = loggedIn;
    updateComponents();
  },

  doAuthLogin: login,
  doAuthLogout: logout
}
