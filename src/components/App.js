import React, { Component } from 'react';
import '../styles/bootstrap.min.css';
import { Route } from 'react-router-dom';
import SignUp from './user/SignUp';
import LogIn from './user/LogIn';
import SocialLogIn from './SocialLogIn';
import Navbar from './common/Navbar';
import Shipments from './shipments/Shipments';
import PrivateRoute from './common/PrivateRoute';
import CreateShipment from './shipments/CreateShipment';
import auth from '../utils/auth';
import config from '../config/Config';
import ShipmentDetail from './shipments/ShipmentDetail';
import CreateHaulier from './hauliers/CreateHaulier';
import HaulierDetail from './hauliers/HaulierDetail';
import Hauliers from './hauliers/Hauliers';
import Reminders from './reminders/Reminders';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        firstName: '',
        roles: []
      }
    };

    this.getLoggedInUser = this.getLoggedInUser.bind(this);
  }

  getLoggedInUser() {
    fetch(`https://baas.kinvey.com/user/${config.kinveyAppKey}/_me`, {
      method: 'GET',
      headers: {
      'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
      }
    }).then((res) => {
        res.json().then((resJSON) => {
          this.setState({
            userData: {
              firstName: resJSON.firstName,
              roles: resJSON.roles
            }
          });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));   
  }

  render() {
    if (sessionStorage.getItem('authtoken') && this.state.userData.firstName.length === 0) {
      this.getLoggedInUser();
    }

    return (
      <div>
        <Navbar firstName={this.state.userData.firstName} />
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
        <PrivateRoute exact path="/createShipment" component={CreateShipment} />
        <PrivateRoute exact path="/shipments/:id" component={ShipmentDetail} userData={this.state.userData} />
        <PrivateRoute exact path="/hauliers" component={Hauliers} />
        <PrivateRoute exact path="/createHaulier" component={CreateHaulier} />
        <PrivateRoute exact path="/hauliers/:id" component={HaulierDetail} userData={this.state.userData} />
        <PrivateRoute path="/reminders" component={Reminders} />
        <Route path="/social-login" render={ (props) => <SocialLogIn {...props} userId={sessionStorage.userId}/> } />
      </div>
    );
  }
}

export default App;
