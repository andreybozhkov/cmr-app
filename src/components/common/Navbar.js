import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config/Config';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                firstName: ''
            }
        };

        this.getLoggedInUser = this.getLoggedInUser.bind(this);
        this.logout = this.logout.bind(this);
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
                        firstName: resJSON.firstName
                    }
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));   
    }

    logout() {
        fetch(`https://baas.kinvey.com/user/${config.kinveyAppKey}/_logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }).then(() => {
            sessionStorage.clear();
            window.location.href = 'http://localhost:3000';
        }).catch(err => console.log(err));
    }

    render() {
        if (sessionStorage.getItem('authtoken') && this.state.userData.firstName.length === 0) {
            this.getLoggedInUser();
        }

        return (
            <nav className="navbar navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">CMR-App. Welcome!</Link>
            {!sessionStorage.getItem('authtoken') &&
                <div className="my-2 my-sm-0">
                    <Link className="btn btn-secondary my-2 my-sm-0" to="/signup">Sign Up</Link>
                    <Link className="btn btn-secondary my-2 my-sm-0" to="/login">Log In</Link>
                </div>
            }
            {sessionStorage.getItem('authtoken') &&
                <div className="my-2 my-sm-0">
                    <h4>Hello, {this.state.userData.firstName}</h4>
                    <Link className="btn btn-secondary my-2 my-sm-0" to="/shipments">Shipments</Link>
                    <button className="btn btn-secondary my-2 my-sm-0" onClick={this.logout}>Log Out</button>
                </div>
            }
        </nav>
        )
    }
}

export default Navbar;