import * as React from 'react';
import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import ModalView from '../components/ModalView';
import observer from 'mobx';
import { IShipmentDetailsProps, IShipmentDetailsState } from '../interfaces/IShipmentDetailView.Interface';
import '../styles/css/ShipmentDetails.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as BootIcon from 'react-bootstrap-icons';


class ShipmentDetailsView extends React.Component<IShipmentDetailsProps, IShipmentDetailsState> {
    constructor(props: IShipmentDetailsProps) {
        super(props)

        this.state = {
            isShowing: false,
            shipmentName: '',
            isFetching: true
        }
    }
    closeModalHandler = () => {
        this.setState({
            isShowing: false,
        });
    };

    handleSave = () => {
        const shipmentId = this.props.match.params.shipmentId;
        this.props.store.updateshipmentName(this.state.shipmentName, shipmentId);
        this.setState({
            isFetching: true,
            isShowing: false,
            shipmentName: '',
        });
        // const shipmentId = this.props.match.params.shipmentId;
        this.loadDetailView(shipmentId);
    };
    loadDetailView = (shipmentId: string) => {
        this.props.store.getShipmentDetails(shipmentId);
        setTimeout(
            () => this.setState({ isFetching: false }),
            3000
        );
    }
    openModalHandler = () => {
        console.log("Open Model")
        this.setState({
            isShowing: true,
        });
    };

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            shipmentName: evt.target.value,
        });
        // setTimeout(
        //     () => this.setState({ shipmentName: evt.target.value, }),
        //     100
        // );
    };

    render() {
        // console.log("DetailsView::" + JSON.stringify(this.props.store.shipment))
        const [shipment] = this.props.store.shipment;
        if (this.state.isFetching) {
            return <div><h1 className="loading"> Loading <BootIcon.ArrowClockwise /></h1></div>
        }
        if (!this.state.isFetching) {
            return (
                <React.Fragment>

                    <ModalView
                        show={this.state.isShowing}
                        handleClose={this.closeModalHandler}
                        handleSave={this.handleSave}
                        showSaveButton={Boolean(this.state.shipmentName)} >
                        <h3>Shipment name: {this.props.store.shipmentName}</h3>
                        <input type="text" name="name" id="name" className="shipmentName" value={this.state.shipmentName}
                            onChange={this.handleChange}
                            placeholder="Enter new shipment name"
                        />
                    </ModalView>

                    <table className="table">
                        <thead>
                            <tr>
                                <th className="headerTd" colSpan={2}>
                                    <h2>
                                        {this.props.store.shipmentName}{' '}
                                        <span title="Click to edit Shipment Name" className="edit">
                                            <BootIcon.PencilSquare onClick={this.openModalHandler} />
                                            {/* <button >Edit</button> */}

                                            {/* <i className="fa fa-edit" /> */}
                                        </span>
                                    </h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td className="detailsTd">
                                    <p className="shipment-detail-info-container__name">Shipment id</p>
                                    <p className="shipment-detail-info-container__value">{shipment.id}</p>
                                </td>
                                <td className="detailsTd">
                                    <p className="shipment-detail-info-container__name">Mode of transport</p>
                                    <p className="shipment-detail-info-container__value">
                                    <BootIcon.Truck className="geo" />{shipment.mode}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="shipment-detail-info-container__name">Type of shipment</p>
                                    <p className="shipment-detail-info-container__value">{shipment.type}</p>
                                </td>
                                <td>
                                    <p className="shipment-detail-info-container__name">Shipment destination</p>
                                    <p className="shipment-detail-info-container__value"> 
                                    <BootIcon.GeoAlt className="geo" />{shipment.destination}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="shipment-detail-info-container__name">Shipment origin</p>
                                    
                                    <p className="shipment-detail-info-container__value"><BootIcon.PersonBoundingBox className="geo" />{shipment.origin}</p>
                                </td>
                                <td>
                                    <p className="shipment-detail-info-container__name">Status</p>
                                    <p className="shipment-detail-info-container__value">{shipment.status}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="shipment-detail-info-container__name">User ID</p>
                                    <p className="shipment-detail-info-container__value">{shipment.userId}</p>
                                </td>
                                <td>
                                    <p className="shipment-detail-info-container__name">Service Type</p>
                                    <p className="shipment-detail-info-container__value">{shipment.services[0].type}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <table className="table small-table">
                                    <thead>
                                        <tr>
                                            <th className="headerTd" colSpan={2}>
                                                <h6 className="shipment-info-name">Cargo</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            shipment.cargo.map(val => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <p className="shipment-detail-info-container__name">  {val.type}</p>
                                                        </td>
                                                        <td>
                                                            <p className="shipment-detail-info-container__value">{val.description}</p>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>

                            </Col>
                            <Col xs={6}>
                                <table className="table small-table">
                                    <thead>
                                        <tr>
                                            <th className="headerTd " colSpan={2}>
                                                <h6 className="shipment-info-name">Service Type</h6>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>   {
                                        shipment.services.map(val => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <p className="shipment-detail-info-container__name">  {val.type}</p>
                                                    </td>
                                                    <td>
                                                        <p className="shipment-detail-info-container__value">{val.type}</p>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Container>

                    <Link to="/" className="back" title="Go back to Home">
                        <BootIcon.ArrowLeftSquareFill />
                    </Link>

                </React.Fragment>
            )
        }
    }
    componentDidMount() {
        const shipmentId = this.props.match.params.shipmentId;
        this.loadDetailView(shipmentId);

    }
}

export default ShipmentDetailsView
