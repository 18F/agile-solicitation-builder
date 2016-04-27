var _components = [ ];
var _currentState = false;

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
    _components.forEach(function(c) {
      c.setState({ loggedIn: loggedIn });
      if(typeof c.loginStateChanged === 'function') {
        c.loginStateChanged();
      }
    });
  }
}
