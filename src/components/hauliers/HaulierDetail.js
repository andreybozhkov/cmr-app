import React, { Component } from 'react';
import config from '../../config/Config';
import auth from '../../utils/auth';

export default class HaulierDetail extends Component {
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

        this.isAdmin = auth.isAdmin.bind(this);
        this.deleteHaulier = this.deleteHaulier.bind(this);
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
        this.editHaulier();
        event.preventDefault();
    }

    editHaulier() {
        fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers/${this.props.match.params.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.haulierData)
        }).then(() => {
            this.props.history.push("/hauliers");
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

    deleteHaulier() {
        if(this.props.userData.roles.includes('Admin')) {
            fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers/${this.props.match.params.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
                }
            }).then((res) => {
                this.props.history.push("/hauliers");
            }).catch(err => console.log(err));
        }
    }

    componentDidMount() {
        fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }).then((res) => {
            res.json().then((resJSON) => {
                this.setState({ haulierData: {...resJSON} });
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }

    render() {
        return(
            <div className="container">
                <h1>Edit Haulier</h1>
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
                        {this.isAdmin(this.props.userData) &&
                            <button type="button" className="btn btn-primary" onClick={this.deleteHaulier}>Delete Haulier</button>
                        }
                    </fieldset>
                </form>
            </div>
        )
    }
}
