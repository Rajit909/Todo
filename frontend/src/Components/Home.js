import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.auth = props.auth
  }

  signOutUser = () => {
    this.auth.logout()
  }

  render() {
    return (
      <div>
      <h1>
        Welcome
      </h1>
        <br />
        <button onClick={this.signOutUser}>Logout</button>
      </div>
    );
  }
}