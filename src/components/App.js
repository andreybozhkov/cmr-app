import React, { Component } from 'react';
import '../styles/bootstrap.min.css';
import { Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import LogIn from './user/LogIn';
import SocialLogIn from './SocialLogIn';
import Navbar from './common/Navbar';
import Shipments from './shipments/Shipments';
import PrivateRoute from './common/PrivateRoute';
import auth from '../utils/auth';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {!auth.isLoggedIn() &&
          <h1 className="text-center">
            Welcome to the CMR App!
            <br/>
            <small className="text-muted">Please Sign Up or Log In</small>
          </h1>
        }
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <PrivateRoute exact path="/shipments" component={Shipments} />
        <Route path="/social-login" render={ (props) => <SocialLogIn {...props} userId={sessionStorage.userId}/> } />
      </div>
    );
  }
}

export default App;
