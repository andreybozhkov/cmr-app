import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Haulier extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.contactEmails.join('; ')}</td>
                <td>
                    <Link to={`/hauliers/${this.props._id}`}>Open</Link>
                </td>
            </tr>
        )
    }
}