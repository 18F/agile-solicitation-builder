var React = require('react');
var Popover = require('react-popover');
var AuthMixin = require('./mixin');

var RegisterButton = React.createClass({
  mixins: [AuthMixin],

  getInitialState: function() {
    return {
      registrationOpen: false,
      username: '',
      password1: '',
      password2: '',
      passwordsMatch: true
    };
  },

  openRegistrationPopover: function() {
    this.setState({ registrationOpen: true });
  },

  closeRegistrationPopover: function() {
    this.setState({ registrationOpen: false });
  },

  setUsername: function(e) {
    this.setState({ username: e.target.value });
  },

  setPassword1: function(e) {
    this.setState({ password1: e.target.value, passwordsMatch: (e.target.value === this.state.password2) });
  },

  setPassword2: function(e) {
    this.setState({ password2: e.target.value, passwordsMatch: (e.target.value === this.state.password1) });
  },

  register: function(e) {
    if(this.state.username && this.state.password1 && this.state.password1 === this.state.password2) {
      $.ajax({
        type: 'POST',
        url: '/api/users',
        contentType: 'application/json',
        data: JSON.stringify({
          username: this.state.username,
          password: this.state.password1
        }),
        success: function(data) {
          this.doAuthLogin(this.state.username, this.state.password1, function(success) {
            this.setAuthenticationState(true);
            this.setState({
              registrationOpen: false,
              username: '',
              password1: '',
              password2: '',
              passwordsMatch: true
            });
          }.bind(this));
        }.bind(this)
      });
    }
    e.preventDefault();
  },

  render: function() {
    return(
      <span className='' style={{ display: this.state.loggedIn ? 'none' : '' }}>
        <Popover refreshIntervalMs={false} isOpen={this.state.registrationOpen} onOuterAction={this.closeRegistrationPopover} body={
          <form>
            <fieldset>
              <legend className='usa-drop_text'>Create Account</legend>

              <label htmlFor='registration_username'>Username</label>
              <input name='registration_username' type='text' autoCapitalize='off' autoCorrect='off' onChange={this.setUsername}/>

              <label htmlFor='registration_password'>Password</label>
              <input name='registration_password' type='password' onChange={this.setPassword1} />

              <div className={this.state.passwordsMatch ? '' : 'usa-input-error'}>
                <label htmlFor='registration_password_retype'>Re-type password</label>
                <span id='registration-error-password-mismatch' className='usa-input-error-message' role='alert'>{this.state.passwordsMatch ? '' : 'Passwords must match'}</span>
                <input name='registration_password_retype' type='password' aria-described-by='registration-error-password-mismatch' onChange={this.setPassword2} />
              </div>

              <input type='submit' value='Register' onClick={this.register}/>
            </fieldset>
          </form>
        }>
          <button onClick={this.openRegistrationPopover}>Register</button>
        </Popover>
      </span>
    );
  }
});

module.exports = RegisterButton;
