import React, { Component } from 'react';
import '../styles/bootstrap.min.css';
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import SocialLogIn from './SocialLogIn';
import Navbar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/social-login" render={ (props) => <SocialLogIn {...props} userId={sessionStorage.userId}/> } />
      </div>
    );
  }
}

export default App;
