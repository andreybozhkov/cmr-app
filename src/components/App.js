import React, { Component } from 'react';
import '../styles/bootstrap.min.css';
import { Route, Link } from 'react-router-dom';
import config from '../config/Config';
import SignUp from './SignUp';

class App extends Component {
  constructor(props){
    super(props);

    this.handleSignUpAuth = this.handleSignUpAuth.bind(this);
    this.handleSignUpToken = this.handleSignUpToken.bind(this);
  }

  handleSignUpAuth() {
    window.open(`https://auth.kinvey.com/v2/oauth/auth?client_id=${config.kinveyAppKey}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code`);
  }

  handleSignUpToken(code) {
    let encodedAuth = window.btoa(`${config.kinveyAppKey}:${config.kinveyAppSecret}`);
    fetch(`https://auth.kinvey.com/v2/oauth/token`, {
      method: `POST`,
      headers: {
        'Authorization': `Basic ${encodedAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `client_id=${config.kinveyAppKey}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code=${code}`
    }).then((res) => {
      res.json().then((resJSON) => {
        fetch(`https://baas.kinvey.com/user/${config.kinveyAppKey}/`, {
          method: `POST`,
          headers: {
            'Authorization': `Basic ${encodedAuth}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            '_socialIdentity': {
              'kinveyAuth': {
                'access_token': resJSON.access_token
              }
            },
            'username': 'testUserName',
            'password': 'testPassword',
            'firstName': 'testFirstName',
            'lastName': 'testLastName'
          })
        }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    let parsedUrl = new URL(window.location.href);
    let codeQuery = parsedUrl.searchParams.get('code');
    if (codeQuery != null) {
      this.handleSignUpToken(codeQuery);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">CMR-App. Welcome!</Link>
          <div className="my-2 my-sm-0">
            <Link className="btn btn-secondary my-2 my-sm-0" to="/signup">Sign Up</Link>
            <Link className="btn btn-secondary my-2 my-sm-0" to="/signin">Log In</Link>
          </div>
        </nav>
        <Route path="/signup" component={SignUp}/>
      </div>
    );
  }
}

export default App;
