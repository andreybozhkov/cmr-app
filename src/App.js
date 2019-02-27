import React, { Component } from 'react';
import './App.css';
import config from './Config';
import { getUserDetails } from './GraphService';

import * as Msal from 'msal';

class App extends Component {
  constructor(props) {
    super(props);

    this.userAgentApplication = new Msal.UserAgentApplication(config.clientID, config.authority, null, config.additionalConfig);

    let user = this.userAgentApplication.getUser();

    this.state = {
      isAuthenticated: (user !== null),
      user: {},
      error: null
    }

    if(user) {
      this.getUserProfile();
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login() {
    try {
      await this.userAgentApplication.loginPopup(config.scopes);
      await this.getUserProfile();
    }
    catch (err) {
      let errParts = err.split('|');
      this.setState({
        isAuthenticated: false,
        user: {},
        error: { message: errParts[1], debug: errParts[0] }
      });
    }
  }

  logout() {
    this.userAgentApplication.logout();
  }

  async getUserProfile() {
    try {
      let accessToken = await this.userAgentApplication.acquireTokenSilent(config.scopes);

      if (accessToken) {
        let user = await getUserDetails(accessToken);
        this.setState({
          isAuthenticated: true,
          user: {
            displayName: user.displayName,
            email: user.mail || user.userPrincipalName
          },
          error: null
        });
      }
    } catch (err) {
      let error = {};
      if (typeof(err) === 'string') {
        let errParts = err.split('|');
        error = errParts.length > 1 ?
          { message: errParts[1], debug: errParts[0] } :
          { message: err };
      } else {
        error = {
          message: err.message,
          debug: JSON.stringify(err)
        };
      }

      this.setState({
        isAuthenticated: false,
        user: {},
        error: error
      });
    }
  }

  render() {
    return (
      <div className="App"
        onClick={this.state.isAuthenticated ? this.logout : this.login}
        //isAuthenticated={this.state.isAuthenticated}
        //authbuttonmethod={this.state.isAuthenticated ? this.logout : this.login}
        user={this.state.user}>
        <header className="App-header" >
          CMR-App. Welcome {this.state.user.displayName}!
        </header>
      </div>
    );
  }
}

export default App;
