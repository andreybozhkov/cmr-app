import React, { Component } from 'react';
import '../styles/bootstrap.min.css';
import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import SocialLogIn from './SocialLogIn';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">CMR-App. Welcome!</Link>
          <div className="my-2 my-sm-0">
            <Link className="btn btn-secondary my-2 my-sm-0" to="/signup">Sign Up</Link>
            <Link className="btn btn-secondary my-2 my-sm-0" to="/login">Log In</Link>
            {sessionStorage.authtoken &&
              <Link className="btn btn-secondary my-2 my-sm-0" to="/social-login">Log In With Social Identity</Link>
            }
          </div>
        </nav>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/social-login" render={ (props) => <SocialLogIn {...props} userId={sessionStorage.userId}/> } />
      </div>
    );
  }
}

export default App;
