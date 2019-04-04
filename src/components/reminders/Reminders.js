import React, { Component } from 'react';
import config from '../../config/Config';
import HaulierMissing from './HaulierMissing';
import PrivateRoute from '../common/PrivateRoute';
import ShipmentsReminders from '../reminders/ShipmentsReminders';

export default class Reminders extends Component {
    constructor(props){
        super(props);
        this.state = {
            hauliersMissingDocs: []
        };
    }

    componentDidMount() {
        fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/shipments?query={"status":"Need%20Documents"}`, {
            method: 'GET',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }).then((res) => {
            res.json().then((resJSON) => {
                let shipmentsMissingDocs = resJSON;

                let hauliersMissingDocs = [];
                let promisesHauliers = [];
                for (let shipment of shipmentsMissingDocs) {
                    if (hauliersMissingDocs.findIndex((element) => {
                        return element.id === shipment.haulier;
                    }) === -1) {
                        let singleHaulier = {
                            id: shipment.haulier,
                            name: '',
                            shipments: [{ ...shipment }]
                        };
                        hauliersMissingDocs.push(singleHaulier);
                        
                        let singleFetch = fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers/${shipment.haulier}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
                            }
                        })
                        promisesHauliers.push(singleFetch);

                    } else if (hauliersMissingDocs.findIndex((element) => {
                        return element.id === shipment.haulier;
                    }) >= 0) {
                        hauliersMissingDocs[hauliersMissingDocs.findIndex((element) => {
                            return element.id === shipment.haulier;
                        })].shipments.push({ ...shipment });
                    }
                }

                Promise.all(promisesHauliers).then((res) => {
                    let resPromises = res.map((r) => r.json());
                    Promise.all(resPromises).then((res) => {
                        for (let haulier of hauliersMissingDocs) {
                            haulier.name = res.find((e) => {
                                return e._id === haulier.id
                            }).name;
                        }

                        this.setState({ hauliersMissingDocs: hauliersMissingDocs });
                    }).catch((err) => console.log(err));
                }).catch((err) => console.log(err));
            }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
    }

    render() {
        return(
            <div>
                {this.state.hauliersMissingDocs.length === 0 &&
                    <h3>There are no missing documents!</h3>
                }
                {this.state.hauliersMissingDocs.length > 0 &&
                <div>
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Haulier Name</th>
                                <th scope="col">Nr of Shipments with Missing Documents</th>
                                <th scope="col">List Shipments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.hauliersMissingDocs.map((haulierMissing) => 
                                    <HaulierMissing key={haulierMissing.id} {...haulierMissing} />
                                )
                            }
                        </tbody>
                    </table>
                    {this.props.location.state &&
                        <PrivateRoute exact path={"/reminders/:id"} component={ShipmentsReminders} haulierData={this.state.hauliersMissingDocs.find(haulier => haulier.id === this.props.location.state.currentHaulierIndex)} />
                    }
                </div>
                }
            </div>
        )
    }
}
