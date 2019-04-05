import React, { Component } from 'react';
import ReminderShipmentsTable from './ReminderShipmentsTable';
import ReactDOMServer from 'react-dom/server';

export default class ShipmentsReminders extends Component {
    constructor(props) {
        super(props);

        this.sendReminder = this.sendReminder.bind(this);
    }

    sendReminder() {
        let body = document.getElementById("tableShipments");
        console.log(body.toString());

        /*fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
            method: 'POST',
            headers: {
                'Authorization': sessionStorage.getItem('access_token_graph'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'message': {
                    'subject': 'Missing CMRs Reminder',
                    'body': {
                        'contentType': 'HTML',
                        'content': `Hello,<br/>Please see below list of missing documents:<br/>${body}`
                    },
                    'toRecipients': [
                        {
                            'emailAddress': {
                                'address': 'abo@ntgcontinent.se'
                            }
                        }
                    ]
                }
            })
        }).then((res) => console.log(res)).catch((err) => console.log(err));*/
    }

    render() {
        return(
            <div>
                {!this.props.haulierData.shipments.length === 0 &&
                    <h3>There are no shipments to work with!</h3>
                }
                {this.props.haulierData.shipments.length > 0 &&
                    <div>
                        <h4>Missing Documents for Haulier: {this.props.haulierData.name}</h4>
                        {sessionStorage.getItem('access_token_graph') &&
                            <button type="button" className="btn btn-primary" onClick={this.sendReminder}>Send Reminder</button>
                        }
                        <ReminderShipmentsTable haulierData={this.props.haulierData} />
                    </div>
                }
            </div>
        )
    }
}
