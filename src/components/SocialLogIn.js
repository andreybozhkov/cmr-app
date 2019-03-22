import React, { Component } from 'react';
import config from '../config/Config';

class SocialLogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: {
                username: "",
                password: "",
                firstName: "",
                lastName: ""
            },
            codeQuery: "",
            microsoftEmail: null
        };

        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleSignUpAuth = this.handleSignUpAuth.bind(this);
        this.handleSignUpToken = this.handleSignUpToken.bind(this);
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

    handleSignUpAuth() {
        window.open(`https://auth.kinvey.com/v2/oauth/auth?client_id=${config.kinveyAppKey}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsocial-login&response_type=code`, '_self');
    }

    handleSignUpToken(event) {
        let code = this.state.codeQuery;
        let encodedAuth = window.btoa(`${config.kinveyAppKey}:${config.kinveyAppSecret}`);
        fetch(`https://auth.kinvey.com/v2/oauth/token`, {
            method: `POST`,
            headers: {
                'Authorization': `Basic ${encodedAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `client_id=${config.kinveyAppKey}&grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsocial-login&code=${code}`
        }).then((res) => {
            res.json().then((resJSON) => {
                sessionStorage.setItem("access_token_kinvey", resJSON.access_token);

                fetch(`https://baas.kinvey.com/user/${config.kinveyAppKey}/${this.props.userId}`, {
                    method: `PUT`,
                    headers: {
                        'Authorization': `Kinvey ${sessionStorage.getItem("authtoken")}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'username': this.state.userData.username,
                        'password': this.state.userData.password,
                        '_socialIdentity': {
                            'kinveyAuth': {
                                'access_token': resJSON.access_token
                            }
                        },
                        'firstName': this.state.userData.firstName,
                        'lastName': this.state.userData.lastName
                    })
                }).then((resUpdatedUser) => {
                    resUpdatedUser.json().then((resUpdatedUserJSON) => {
                        sessionStorage.setItem("authtoken", resUpdatedUserJSON._kmd.authtoken);
                    })
                }).catch((errUpdatedUser) => {
                    console.log(errUpdatedUser);
                })
            });
        }).catch((err) => {
            console.log(err);
        });

        fetch(`https://login.microsoftonline.com/b01aab02-d012-43b9-98de-902903e53920/oauth2/v2.0/token`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: ``
        }).then((res) => {
            console.log(res);
            res.json().then((resJSON) => {
                console.log(resJSON);
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));

        event.preventDefault();
    }

    componentDidMount() {
        if(!sessionStorage.getItem('authtoken')) {
            this.props.history.push('/login');
        }

        let parsedUrl = new URL(window.location.href);
        let codeQuery = parsedUrl.searchParams.get('code');
        if (codeQuery != null && this.state.codeQuery.length === 0) {
            this.setState({ codeQuery: codeQuery });
        }

        if (this.state.userData.firstName.length === 0 && this.state.userData.lastName.length === 0) {
            fetch(`https://baas.kinvey.com/user/${config.kinveyAppKey}/_me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
                }
            }).then((res) => {
                res.json().then((resJSON) => {
                    this.setState({
                        userData: {
                            username: resJSON.username,
                            firstName: resJSON.firstName,
                            lastName: resJSON.lastName
                        }
                    })
                });
            }).catch(err => console.log(err));
        }

        /*if (this.state.microsoftEmail === null && sessionStorage.getItem('access_token_kinvey')) {
            //let encodedAccessToken = window.btoa(sessionStorage.getItem('access_token_kinvey'));
            fetch(`https://graph.microsoft.com/v1.0/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token_kinvey')}`
                }
            }).then(res => {
                res.json().then((resJSON) => {
                    console.log(resJSON);
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }*/
    }

    render () {
        return (
            <div className="container">
                <h1>Social Log In - Log In With Your Microsoft 365 Account</h1>
                <br/>
                <h4>Hi {this.state.userData.firstName} {this.state.userData.lastName}</h4>
                <button className="btn btn-primary" onClick={this.handleSignUpAuth}>Social Log In</button>
                <br/>
                {this.state.microsoftEmail !== null &&
                    <h5>Your Microsoft 365 e-mail is: {this.state.microsoftEmail}</h5>
                }
                {this.state.codeQuery.length > 0 &&
                    <form onSubmit={this.handleSignUpToken}>
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
                }
            </div>
        );
    }
}

export default SocialLogIn;
