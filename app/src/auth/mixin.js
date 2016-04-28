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
  }
}
