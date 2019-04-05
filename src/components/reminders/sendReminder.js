import React, { Component } from 'react';
import Shipment from '../shipments/Shipment';
import ReactDOMServer from 'react-dom/server';

class ShipmentsTable extends Component {
    constructor(props) {
        
    }

    render() {
        return(
            <div>
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Trailer</th>
                            <th scope="col">Loading Address</th>
                            <th scope="col">Unloading Address</th>
                            <th scope="col">Delivery Date</th>
                            <th scope="col">Project ID</th>
                            <th scope="col">Shipment ID</th>
                            <th scope="col">Invoice Nr</th>
                            <th scope="col">Invoice Amount</th>
                            <th scope="col">Invoice Currency</th>
                            <th scope="col">Project Resp.</th>
                            <th scope="col">Requested Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Documents Needed</th>
                            <th scope="col">Received Date</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Reminder Date</th>
                            <th scope="col">Invoice Nr Missing CMR</th>
                            <th scope="col">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.haulierData.shipments.sort( (a, b) => Date.parse(b._kmd.ect) - Date.parse(a._kmd.ect))
                                                .map((shipment) => 
                                                <Shipment key={shipment._id} {...shipment} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}