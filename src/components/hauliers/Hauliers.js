import React, { Component } from 'react';
import config from '../../config/Config';
import Haulier from './Haulier';

export default class Hauliers extends Component {
    constructor(props){
        super(props);
        this.state = {
            hauliers: []
        }
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
            <div>
                {this.state.hauliers.length === 0 &&
                    <h3>There are no hauliers to work with!</h3>
                }
                {this.state.hauliers.length > 0 &&
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Haulier Name</th>
                                <th scope="col">Contact Emails</th>
                                <th scope="col">Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.hauliers.sort( (a, b) => a.name - b.name )
                                                    .map((haulier) => 
                                                    <Haulier key={haulier._id} {...haulier} />
                                )
                            }
                        </tbody>
                </table>
                }
            </div>
        )
    }
}
