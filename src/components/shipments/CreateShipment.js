import React, { Component } from 'react';
import config from '../../config/Config';

export default class CreateShipment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shipmentData: {
                customer: '',
                haulier: '',
                trailer: '',
                'loading-address': '',
                'unloading-address': '',
                'delivery-date': '',
                'project-id': 1,
                'shipment-id': 1,
                _id: '',
                'invoice-nr': 1,
                'invoice-amount': 0,
                'invoice-currency': 'EUR',
                'project-resp': '',
                'requested-date': '',
                status: 'Need Documents',
                'documents-needed': [],
                'received-date': '',
                'notes-internal': '',
                'reminder-date': '',
                'invoice-nr-missing-cmr': ''
            },
            hauliers: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;

        if (target.options && name==='documents-needed') {
            let options = target.options;
            let selectedValues = [];
            for (let option of options) {
                if (option.selected) {
                    selectedValues.push(option.value);
                }
            }

            this.setState((prevState) => {
                let newShipmentData = prevState.shipmentData;
                newShipmentData[name].splice(0, newShipmentData[name].length, ...selectedValues);
                return {shipmentData: newShipmentData};
            })
        } else {
            let value = target.value;
            this.setState((prevState) => {
                let newShipmentData = prevState.shipmentData;
                newShipmentData[name] = value;
                if(name === 'shipment-id') {
                    newShipmentData._id = value;
                }
                return {shipmentData: newShipmentData};
            })
        }
    }

    handleSubmit(event) {
        this.createShipment();
        event.preventDefault();
    }

    createShipment() {
        fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/shipments`, {
            method: 'POST',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.shipmentData)
        }).then(() => {
            this.props.history.push("/shipments");
        }).catch((err) => console.log(err));
    }

    componentDidMount() {
        fetch(`https://baas.kinvey.com/appdata/${config.kinveyAppKey}/hauliers`, {
            method: 'GET',
            headers: {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }).then(res =>
            res.json().then(resJSON => {
                this.setState({
                    hauliers: resJSON
                });
            })
        ).catch(err => console.log(err));
    }

    render() {
        return(
            <div className="container">
                <h1>Create Shipment</h1>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="form-group">
                            <label>
                                <h6>Customer</h6>
                                <input type="text" className="form-control" name="customer" placeholder="Enter customer company name" value={this.state.shipmentData.customer} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Haulier</h6>
                                <select className="form-control" name="haulier" value={this.state.shipmentData.haulier} onChange={this.handleInputChange} required >
                                    {
                                        this.state.hauliers.map((haulier) => 
                                            <option key={haulier._id} value={haulier._id}>{haulier.name}</option>
                                        )
                                    }
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Trailer</h6>
                                <input type="text" className="form-control" name="trailer" placeholder="Enter trailer nr" value={this.state.shipmentData.trailer} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Loading Address</h6>
                                <input type="text" className="form-control" name="loading-address" placeholder="Enter loading address" value={this.state.shipmentData["loading-address"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Unloading Address</h6>
                                <input type="text" className="form-control" name="unloading-address" placeholder="Enter unloading address" value={this.state.shipmentData["unloading-address"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Delivery Date</h6>
                                <input type="date" className="form-control" name="delivery-date" value={this.state.shipmentData["delivery-date"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Project ID</h6>
                                <input type="number" className="form-control" name="project-id" value={this.state.shipmentData["project-id"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Shipment ID</h6>
                                <input type="number" className="form-control" name="shipment-id" value={this.state.shipmentData["shipment-id"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Invoice Nr</h6>
                                <input type="number" className="form-control" name="invoice-nr" value={this.state.shipmentData["invoice-nr"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Invoice Amount</h6>
                                <input type="number" className="form-control" name="invoice-amount" value={this.state.shipmentData["invoice-amount"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Invoice Currency</h6>
                                <select className="form-control" name="inovice-currency" value={this.state.shipmentData["inovice-currency"]} onChange={this.handleInputChange}>
                                    <option value='EUR'>EUR</option>
                                    <option value='SEK'>SEK</option>
                                    <option value='NOK'>NOK</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Project Resp. Person</h6>
                                <input type="text" className="form-control" name="project-resp" placeholder="Enter project responsible person" value={this.state.shipmentData["project-resp"]} onChange={this.handleInputChange} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Requested Date</h6>
                                <input type="date" className="form-control" name="requested-date" value={this.state.shipmentData["requested-date"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Status</h6>
                                <select className="form-control" name="status" value={this.state.shipmentData.status} onChange={this.handleInputChange} required >
                                    <option value='Need Documents'>Need Documents</option>
                                    <option value='Need Documents'>Done</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Documents needed</h6>
                                <select className="form-control" name="documents-needed" multiple={true} value={this.state.shipmentData["documents-needed"]} onChange={this.handleInputChange} >
                                    <option value='CMR'>CMR</option>
                                    <option value='Original CMR'>Original CMR</option>
                                    <option value='Delivery Note'>Delivery Note</option>
                                    <option value='Original Delivery Note'>Original Delivery Note</option>
                                    <option value='COP'>COP</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Received Date</h6>
                                <input type="date" className="form-control" name="received-date" value={this.state.shipmentData["received-date"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Notes</h6>
                                <input type="text" className="form-control" name="notes-internal" placeholder="Enter anything special here" value={this.state.shipmentData["notes-internal"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Reminder Date</h6>
                                <input type="date" className="form-control" name="reminder-date" value={this.state.shipmentData["reminder-date"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h6>Invoice Nr for Missing CMR</h6>
                                <input type="text" className="form-control" name="invoice-nr-missing-cmr" value={this.state.shipmentData["invoice-nr-missing-cmr"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}