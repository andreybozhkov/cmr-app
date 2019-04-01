import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HaulierMissing extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.nrShipmentsMissing}</td>
                <td>
                    <Link to={`/remindersList/${this.props._id}`}>List</Link>
                </td>
            </tr>
        )
    }
}