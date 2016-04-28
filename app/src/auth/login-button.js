var React = require('react');
var AuthMixin = require('./mixin');

var LoginButton = React.createClass({
  mixins: [AuthMixin],

  getInitialState: function() {
    return {
      text: 'Log In'
    }
  },

  componentDidMount: function() {
    this.loginStateChanged();
  },

  loginStateChanged: function() {
    this.setState({ text: this.state.loggedIn ? 'Log Out' : 'Log In' });
  },

  click: function() {
    if(this.state.loggedIn) {
      this.doAuthLogout(function() {
        this.setAuthenticationState(false);
      }.bind(this));
    } else {
      this.doAuthLogin(function(token) {
        if(token) {
          this.setAuthenticationState(true);
        } else {
          this.setAuthenticationState(false);
        }
      }.bind(this));
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

module.exports = LoginButton;
