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
        this.handleImplicitToken = this.handleImplicitToken.bind(this);
        this.testGraphCall = this.testGraphCall.bind(this);
        this.testSendEmail = this.testSendEmail.bind(this);
        this.logout = this.logout.bind(this);
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

        event.preventDefault();
    }

    handleImplicitToken() {
        window.open('https://login.microsoftonline.com/b01aab02-d012-43b9-98de-902903e53920/oauth2/v2.0/authorize?client_id=55647bde-885a-40bc-8744-e9d7630d9302&scope=openid%20profile%20email%20User.Read%20Mail.ReadWrite%20Mail.Send&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsocial-login&response_type=token', '_self');
    }

    testGraphCall() {
        let access_token = sessionStorage.getItem('access_token_graph');
        fetch(`https://graph.microsoft.com/v1.0/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(res => {
            res.json().then((resJSON) => {
                this.setState({ microsoftEmail: resJSON.mail });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    testSendEmail() {
        fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('access_token_graph'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'message': {
                    'subject': 'Test E-mail from my SPA',
                    'body': {
                        'contentType': 'HTML',
                        'content': '<b>HTML</b> body works!'
                    },
                    'toRecipients': [
                        {
                            'emailAddress': {
                                'address': this.state.microsoftEmail
                            }
                        }
                    ]
                }
            })
        }).then((res) => console.log(res)).catch((err) => console.log(err));
    }

    logout() {
        fetch(`https://baas.kinvey.com/user/${config.kinveyAppKey}/_logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }).then(() => {
            sessionStorage.clear();
            this.props.history.push("/");
        }).catch(err => console.log(err));
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
        let access_token = parsedUrl.hash.slice(parsedUrl.hash.indexOf("=") + 1, parsedUrl.hash.indexOf("&"));
        if (access_token != null) {
            sessionStorage.setItem('access_token_graph', access_token);
        }
    }

    render () {
        return (
            <div className="container">
                <h1>Social Log In - Log In With Your Microsoft 365 Account</h1>
                <br/>
                <h4>Hi {this.state.userData.firstName} {this.state.userData.lastName}</h4>
                {this.state.microsoftEmail !== null &&
                    <h5>Your Microsoft 365 e-mail is: {this.state.microsoftEmail}</h5>
                }
                {sessionStorage.getItem('authtoken') &&
                    <button className="btn btn-primary" onClick={this.logout}>Log Out</button>
                }
                <button className="btn btn-primary" onClick={this.handleSignUpAuth}>Social Log In</button>
                <button className="btn btn-primary" onClick={this.handleImplicitToken}>Implicit Log In</button>
                {sessionStorage.getItem('access_token_graph') &&
                    <button className="btn btn-primary" onClick={this.testGraphCall}>Test Graph Call</button>
                }
                {this.state.microsoftEmail &&
                    <button className="btn btn-primary" onClick={this.testSendEmail}>Test Send Email</button>
                }
                <br/>
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
