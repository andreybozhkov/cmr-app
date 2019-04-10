import React, { Component } from 'react';
import ReminderShipmentsTable from './ReminderShipmentsTable';

export default class ShipmentsReminders extends Component {
    constructor(props) {
        super(props);

        this.sendReminder = this.sendReminder.bind(this);
    }

    sendReminder() {
        let tableDoc = document.getElementById("tableShipments");
        let tableHead = '<thead>';
        let tableBody = '<tbody>';
        let columnIndices = [1,2,3,4,5,6,12,13];
        for (let i = 0; i < tableDoc.rows.length; i++) {
            let row = '<tr>';
            for (let a = 0; a < tableDoc.rows[i].cells.length; a++) {
                if (columnIndices.includes(a)) {
                    if (i === 0) {
                        row += `<th>${tableDoc.rows[i].cells[a].innerHTML}</th>`;
                    } else {
                        row += `<td>${tableDoc.rows[i].cells[a].innerHTML}</td>`;    
                    }
                }
                if (a === columnIndices[columnIndices.length - 1]) {
                    if (i === 0) {
                        row += `</tr></thead>`;
                    } else {
                        row += `</tr>`;
                        if (i === tableDoc.rows.length - 1) {
                            row += `</tbody>`;
                        }
                    }
                }
            }
            tableBody += row;
        }

        let mailBody = `<table>${tableHead}${tableBody}</table>`;

        fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
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
                        'content': `Hello,<br/>Please see below list of missing documents:<br/>${mailBody}`
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
        }).then((res) => console.log(res)).catch((err) => console.log(err));
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
