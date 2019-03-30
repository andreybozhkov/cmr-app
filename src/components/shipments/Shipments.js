import React, { Component } from 'react';
import config from '../../config/Config';
import Shipment from './Shipment';

class Shipments extends Component {
    constructor(props){
        super(props);
        this.state = {
            shipments: []
        }
    }

    componentDidMount() {
        fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/shipments`, {
            method: 'GET',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }).then(res =>
            res.json().then(resJSON => {
                this.setState({
                    shipments: resJSON
                });
            })
        ).catch(err => console.log(err));
    }

    render() {
        return(
            <div>
                {this.state.shipments.length === 0 &&
                    <h3>There are no shipments to work with!</h3>
                }
                {this.state.shipments.length > 0 &&
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Customer</th>
                                <th scope="col">Haulier</th>
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
                                <th scope="col">Resp. Person</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Reminder Date</th>
                                <th scope="col">Invoice Nr Missing CMR</th>
                                <th scope="col">Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.shipments.sort( (a, b) => Date.parse(b._kmd.ect) - Date.parse(a._kmd.ect))
                                                    .map((shipment) => 
                                                    <Shipment key={shipment._id} {...shipment} />
                                )
                            }
                        </tbody>
                </table>
                }
            </div>
        )
    }
}

export default Shipments;