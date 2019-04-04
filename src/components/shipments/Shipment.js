import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Shipment extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.customer}</td>
                {window.location.href.indexOf('reminders') === -1 &&
                    <td>{this.props.haulier}</td>
                }
                <td>{this.props.trailer}</td>
                <td>{this.props['loading-address']}</td>
                <td>{this.props['unloading-address']}</td>
                <td>{this.props['delivery-date']}</td>
                <td>{this.props['project-id']}</td>
                <td>{this.props['shipment-id']}</td>
                <td>{this.props['invoice-nr']}</td>
                <td>{this.props['invoice-amount']}</td>
                <td>{this.props['invoice-currency']}</td>
                <td>{this.props['project-resp']}</td>
                <td>{this.props['requested-date']}</td>
                <td>{this.props['status']}</td>
                <td>{this.props['documents-needed'].join(', ')}</td>
                <td>{this.props['received-date']}</td>
                {window.location.href.indexOf('reminders') === -1 &&
                    <td>{this.props._acl.creator}</td>
                }
                <td>{this.props['notes-internal']}</td>
                <td>{this.props['reminder-date']}</td>
                <td>{this.props['invoice-nr-missing-cmr']}</td>
                <td>
                    <Link to={`/shipments/${this.props['shipment-id']}`}>Open</Link>
                </td>
            </tr>
        )
    }
}