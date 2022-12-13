
import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.auth = props.auth
  }
  handleGoogle = () => {
    this.auth.google()
  }

  handleLogin = event => {
    event.preventDefault()
    var email = event.target.elements['email'].value
    var password = event.target.elements['password'].value
    this.auth.login(email, password)
  }

  componentDidMount() {
    this.auth.checkLogin()
  }
  render() {
    return (
      <>
        <div>
          <form onSubmit={this.handleLogin}>
            <input type="text" name="email" placeholder="Email" id='email' />
            <input type="password" name="pass" id='password' />
            <button type="submit">
              Login
            </button>
            <button onClick={this.handleGoogle} type="button">
              Login With Google
            </button>
            <a href='/signup'>Create an Account</a>
          </form>
        </div>
      </>
    )
  }
}