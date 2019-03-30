import React, { Component } from 'react';
import config from '../../config/Config';

export default class CreateHaulier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            haulierData: {
                name: '',
                contactEmails: []
            },
            addEmail: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.removeEmail = this.removeEmail.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;

        if (name === 'addEmail') {
            this.setState((prevState) => {
                let newHaulierData = prevState;
                newHaulierData.addEmail = value;
                return newHaulierData;
            });
        } else {
            this.setState((prevState) => {
                let newHaulierData = prevState.haulierData;
                newHaulierData[name] = value;
                return {haulierData: newHaulierData};
            });
        }
    }

    handleSubmit(event) {
        this.createHaulier();
        event.preventDefault();
    }

    createHaulier() {
        fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers`, {
            method: 'POST',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.haulierData)
        }).then(() => {
            this.props.history.push("/shipments");
        }).catch((err) => console.log(err));
    }

    addEmail(event) {
        let currentEmailField = this.state.addEmail.trim();
        if (currentEmailField.length === 0) {
            console.log('No email!');
        } else {
            this.setState((prevState) => {
                let newHaulierData = prevState.haulierData;
                newHaulierData.contactEmails.push(currentEmailField);
                return {
                    haulierData: newHaulierData,
                    addEmail: ''
                };
            });
        }
        event.preventDefault();
    }

    removeEmail(email, event) {
        this.setState((prevState) => {
            let newHaulierData = prevState.haulierData;
            newHaulierData.contactEmails.splice(newHaulierData.contactEmails.indexOf(email), 1);
            return {
                haulierData: newHaulierData,
                addEmail: ''
            };
        });
        event.preventDefault();
    }

    render() {
        return(
            <div className="container">
                <h1>Create Haulier</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="form-group">
                            <label>
                                <h6>Haulier Name</h6>
                                <input type="text" className="form-control" name="name" placeholder="Enter haulier company name" value={this.state.haulierData.name} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Enter Contact Email</h6>
                                <input type="email" className="form-control" id="addEmail" name="addEmail" placeholder="Enter haulier contact e-mail" value={this.state.addEmail} onChange={this.handleInputChange} />
                                <button className="btn btn-secondary" onClick={this.addEmail}>Add email</button>
                            </label>
                        </div>
                        <h6>Haulier Contact Emails List</h6>
                            <ul>
                                {
                                    this.state.haulierData.contactEmails.map(email =>
                                        <li key={email}>{email} <button className="btn btn-primary btn-sm" onClick={this.removeEmail.bind(this, email)}>Remove Email</button></li>
                                    )
                                }
                            </ul>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}
