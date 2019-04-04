import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HaulierMissing extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.shipments.length}</td>
                <td>
                    <Link to={{
                        pathname: `/reminders/${this.props.id}`,
                        state: { currentHaulierIndex: this.props.id }
                    }} >List</Link>
                </td>
            </tr>
        )
    }
}