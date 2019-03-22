import React, { Component } from 'react';
import config from '../config/Config';

class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {
                username: "",
                password: ""
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;

        this.setState((prevState) => {
            let newUserData = prevState.userData;
            newUserData[name] = value;
            return {userData: newUserData};
        })
    }

    handleSubmit(event) {
        this.logIn();
        event.preventDefault();
    }

    logIn() {
        let encodedAuth = window.btoa(`${config.kinveyAppKey}:${config.kinveyAppSecret}`);
        let data = JSON.stringify(this.state.userData);
        fetch(`https://baas.kinvey.com/user/${config.kinveyAppKey}/login`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encodedAuth}`,
                'Content-Type': 'application/json'
            },
            body: data
        }).then((res) => {
            res.json().then((resJSON) => {
                sessionStorage.setItem("authtoken", resJSON._kmd.authtoken);
                sessionStorage.setItem("userId", resJSON._id);
                this.props.history.push("/");
            })
        }).catch((err) => {
            console.log(err);
            this.props.history.push("/");
        })
    }

    render () {
        return (
            <div className="container">
                <h1>Log In</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="form-group">
                            <label>
                                <h5>Email Address (Username)</h5>
                                <input type="email" className="form-control-lg" name="username" placeholder="Enter email" value={this.state.username} onChange={this.handleInputChange}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Password</h5>
                                <input type="password" className="form-control-lg" name="password" placeholder="Enter password" value={this.state.password} onChange={this.handleInputChange}/>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default LogIn;