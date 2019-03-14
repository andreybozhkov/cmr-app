import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render () {
        console.log(this.state);
        return (
            <div className="container">
                <h1>Sign Up</h1>
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
                        <div className="form-group">
                            <label>
                                <h5>First Name</h5>
                                <input type="text" className="form-control-lg" name="firstName" placeholder="Enter your first name" value={this.state.firstName} onChange={this.handleInputChange}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Last Name</h5>
                                <input type="text" className="form-control-lg" name="lastName" placeholder="Enter your last name" value={this.state.lastName} onChange={this.handleInputChange}/>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default SignUp;