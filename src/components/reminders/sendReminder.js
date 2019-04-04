import React, { Component } from 'react';
import Shipment from '../shipments/Shipment';
import ReactDOMServer from 'react-dom/server';

export default (shipmentsData) => {
    <ShipmentTable shipmentsData={shipment}/>

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
    }).then((res) => console.log(res)).catch((err) => console.log(err));
}