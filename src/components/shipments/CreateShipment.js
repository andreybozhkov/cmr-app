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
                'delivery-date': null,
                'project-id': 1,
                'shipment-id': 1,
                'invoice-nr': 1,
                'invoice-amount': 0,
                'invoice-currency': 'EUR',
                'project-resp': '',
                'requested-date': null,
                status: 'Need Documents',
                'documents-needed': ['CMR'],
                'received-date': null,
                'resp-person': this.props.firstName,
                'notes-internal': '',
                'reminder-date': null,
                'invoice-nr-missing-CMR': null
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;

        this.setState((prevState) => {
            let newShipmentData = prevState.shipmentData;
            newShipmentData[name] = value;
            return {shipmentData: newShipmentData};
        })
    }

    handleSubmit(event) {
        this.createShipment();
        event.preventDefault();
    }

    createShipment() {
        console.log(this.state.shipmentData);
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
                                <h5>Customer</h5>
                                <input type="text" className="form-control-lg" name="customer" placeholder="Enter customer company name" value={this.state.shipmentData.customer} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Haulier</h5>
                                <input type="text" className="form-control-lg" name="haulier" placeholder="Enter haulier" value={this.state.shipmentData.haulier} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Trailer</h5>
                                <input type="text" className="form-control-lg" name="trailer" placeholder="Enter trailer nr" value={this.state.shipmentData.trailer} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Loading Address</h5>
                                <input type="text" className="form-control-lg" name="loading-address" placeholder="Enter loading address" value={this.state.shipmentData["loading-address"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Unloading Address</h5>
                                <input type="text" className="form-control-lg" name="unloading-address" placeholder="Enter unloading address" value={this.state.shipmentData["unloading-address"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Delivery Date</h5>
                                <input type="datetime-local" className="form-control-lg" name="delivery-date" value={this.state.shipmentData["delivery-date"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Project ID</h5>
                                <input type="number" className="form-control-lg" name="project-id" value={this.state.shipmentData["project-id"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Shipment ID</h5>
                                <input type="number" className="form-control-lg" name="shipment-id" value={this.state.shipmentData["shipment-id"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Invoice Nr</h5>
                                <input type="number" className="form-control-lg" name="inovice-nr" value={this.state.shipmentData["inovice-nr"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Invoice Amount</h5>
                                <input type="number" className="form-control-lg" name="inovice-amount" value={this.state.shipmentData["inovice-amount"]} onChange={this.handleInputChange} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Invoice Currency</h5>
                                <select className="form-control-lg" name="inovice-currency" value={this.state.shipmentData["inovice-currency"]} onChange={this.handleInputChange}>
                                    <option value='EUR'>EUR</option>
                                    <option value='SEK'>SEK</option>
                                    <option value='NOK'>NOK</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Project Resp. Person</h5>
                                <input type="text" className="form-control-lg" name="project-resp" placeholder="Enter project responsible person" value={this.state.shipmentData["project-resp"]} onChange={this.handleInputChange} required/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Requested Date</h5>
                                <input type="datetime-local" className="form-control-lg" name="requested-date" value={this.state.shipmentData["requested-date"]} onChange={this.handleInputChange} required />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                <h5>Status</h5>
                                <select className="form-control-lg" name="status" multiple={true} value={this.state.shipmentData["documents-needed"]} onChange={this.handleInputChange} >
                                    <option value='Need Documents'>Need Documents</option>
                                    <option value='Other'>Other</option>
                                </select>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}