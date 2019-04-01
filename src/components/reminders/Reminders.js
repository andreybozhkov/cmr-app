import React, { Component } from 'react';
import config from '../../config/Config';
import HaulierMissing from './HaulierMissing';

export default class Reminders extends Component {
    constructor(props){
        super(props);
        this.state = {
            hauliersMissingDocs: []
        }
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

                let haulierIDs = [];
                for (let shipment of shipmentsMissingDocs) {
                    if (!haulierIDs.includes(shipment.haulier)) {
                        haulierIDs.push(shipment.haulier);
                    }
                }

                /*let promisesHauliers = [];
                for (let haulierID of haulierIDs) {
                    let singleFetch = fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers/${haulierID}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
                        }
                    })
                    promisesHauliers.push(singleFetch);
                }

                let hauliersMissingDocs = [];
                Promise.all(promisesHauliers).then((res) => {
                    let resPromises = res.map((r) => r.json());
                    Promise.all(resPromises).then((res) => {
                        let hauliersRes = res;
                        for (let haulier of hauliersRes) {
                            let singleHaulier = {};
                            singleHaulier.id = haulier._id;
                            singleHaulier.name = haulier.name;
                            singleHaulier.missingDocs = [];
                            for (let shipment of shipmentsMissingDocs) {
                                if 
                            }
                        }
                    }).catch((err) => console.log(err));
                }).catch((err) => console.log(err));*/
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
                                    <HaulierMissing key={haulierMissing._id} {...haulierMissing} />
                                )
                            }
                        </tbody>
                    </table>
                </div>
                }
            </div>
        )
    }
}

/*
{
                                this.state.hauliersMissingDocs.map((haulier) => 
                                                    <HaulierMissing key={haulier._id} {...haulier} />
                                )
                            }
*/