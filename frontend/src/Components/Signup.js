import React from "react";

export default class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.auth = props.auth;
  }
  handleSignup = event => {
    event.preventDefault();
    var name = event.target.elements['name'].value
    var email = event.target.elements['email'].value
    var password = event.target.elements['password'].value
    var repassword  = event.target.elements['repassword'].value
    if (password !== repassword) {
      alert('Passwords do not match');
    } else {
      this.auth.signup(email, password, name)
    }
  }

  handleGoogle = () => {
    this.auth.google()
  }
  render() {
    return (
      <>
        <div>
          <form onSubmit={this.handleSignup}>
            <input type="text" name="name" placeholder="Full Name" id='name' />
            <input type="text" name="email" placeholder="Email" id='email' />
            <input type="password" name="pass" id='password' placeholder='Password'/>
            <input type="password" name="pass" id='repassword' placeholder='Re-enter Password' />
            <button type="submit" >
              Signup
            </button>
            <button onClick={this.handleGoogle} type="button" >
              Signup With Google
            </button>
            <a href='/Signin'>Login</a>
          </form>
        </div>
      </>
    )
  }
}