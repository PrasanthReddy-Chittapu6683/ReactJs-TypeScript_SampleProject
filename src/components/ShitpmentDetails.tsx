import React, { Component } from 'react'
import { IShipmentDivDataInterface } from '../interfaces/IShipmentDivData.Interface'

import { Link } from 'react-router-dom';
import * as BootIcon from 'react-bootstrap-icons';

import '../styles/css/shipmentDetailsBox.css';

class ShitpmentDetails extends React.Component<IShipmentDivDataInterface, {}> {
    getShipmentName = (shipmentName: string) => {
        if (shipmentName.length < 30) {
            return shipmentName;
        }
        return `${shipmentName.slice(0, 30)}...`;
    };

    render() {
        return (
            <div className="shipment-card-container">
                <div className="divcard">
                    <p>
                        Name:{' '}
                        <span className="box-title" title={this.props.name} >
                            {this.getShipmentName(this.props.name)}
                        </span>
                    </p>

                    <p>
                        Origin:{' '}
                        {this.props.origin}
                    </p>
                    <p>
                        Shipment id:{' '}
                        <span >
                            {this.props.id}
                        </span>
                    </p>
                    <p>
                        Number of cargo items:{' '}
                        <span >
                            {this.props.cargoLength}
                        </span>
                    </p>
                    <p>
                        Total:{' '}
                        <span >
                            {this.props.total}
                        </span>
                    </p>
                    <p>
                        Services:{' '}
                        <span >
                            {this.props.services.length}
                        </span>
                    </p>
                    <p>
                        Status:{' '}
                        <span >
                            {this.props.status}
                        </span>
                    </p>
                    <span className="viewDetails">
                        <Link className="viewDetailsLink" title="View more details" to={`/shipments/${this.props.id}`}>
                            <BootIcon.ThreeDots />
                        </Link>
                    </span>
                </div>
            </div>
        )
    }
}

export default ShitpmentDetails
