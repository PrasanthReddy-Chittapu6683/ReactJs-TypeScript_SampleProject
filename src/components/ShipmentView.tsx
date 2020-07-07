import React, { Component } from 'react'
import { GetShipmentstrore } from '../store/GetShipment.strore'
import ShitpmentDetails from './ShitpmentDetails'
import '../styles/css/ShipmentView.css';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { IPaginationData } from '../interfaces/IPagination.Interface';
import PaginationItems from './PaginationItems';
import { Total_Items } from '../ConstantValues';
import { Limit_No } from '../ConstantValues';
import { IShipmentProps, IShipmentState } from '../interfaces/IShipmentView.Interface';
import * as BootIcon from 'react-bootstrap-icons';

class ShipmentView extends React.Component<IShipmentProps, IShipmentState> {
    constructor(props: IShipmentProps) {
        super(props)

        this.state = {
            currentPage: 1,
            isFetching: true,
            colorGridFalg: true,
            colorGridName: "gridButtonBorderTwo_active",
            colorListFalg: false,
            colorListName: "",
            boxType: "boxGrid",
            shipmentID: '',
            services: [],
            status: ''
        }

    }
    onPageChanged = (paginationData: IPaginationData) => {
        this.setState({
            currentPage: paginationData.currentPage,
            isFetching: true,
        }, () =>
            this.props.store.getShipments(paginationData.currentPage),
        );
        setTimeout(
            () => this.setState({ isFetching: false }), 5000
        );
    };


    loadShipmentDetails = () => {
        if (this.props.store.filteredShipments.length > 0) {
            return (
                <div className={this.state.boxType}>
                    {this.props.store.filteredShipments.map((data, index) => {

                        return (
                            <Alert>
                                <ShitpmentDetails key={index} id={data.id} name={data.name} cargoLength={data.cargo.length}
                                    total={data.total} boxType={this.state.boxType} services={data.services}
                                    status={data.status}
                                    origin={data.origin}
                                />

                            </Alert>
                        );
                    }
                    )}
                </div>
            );
        }
        if (this.props.store.shipments.length > 0) {
            return (
                <div className={this.state.boxType}>
                    {this.props.store.shipments.map((data, index) => {
                        return (
                            <Alert>
                                <ShitpmentDetails key={index} id={data.id} name={data.name} cargoLength={data.cargo.length}
                                    total={data.total} boxType={this.state.boxType} services={data.services}
                                    status={data.status}
                                    origin={data.origin}
                                />

                            </Alert>
                        );
                    })
                    }
                </div>
            );
        }
    }
    onChangeSearchTxt = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        debugger;

        const query = evt.target.value;
        this.setState({
            colorGridFalg: true,
            colorGridName: "gridButtonBorderTwo_active",
            colorListFalg: false,
            colorListName: "",
            boxType: "boxGrid",
            isFetching: true,
            shipmentID: query
        });
        this.props.store.searchShipments(query);
        setTimeout(
            () => this.setState({
                isFetching: false,
                shipmentID: query,
                colorGridFalg: true,
                colorGridName: "gridButtonBorderTwo_active",
                colorListFalg: false,
                colorListName: "",
                boxType: "boxGrid",
            }), 100
        );


    };
    onChangeSorting = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        if (evt.target.value) {
            this.setState({
                isFetching: true
            });
            this.props.store.sortShipments(evt.target.value);
            setTimeout(
                () => this.setState({ isFetching: false })
            );
        }
    };
    btnGridView = () => {

        this.setState({
            colorGridFalg: true,
            colorGridName: this.state.colorGridFalg ? "gridButtonBorderTwo_active" : "",
            colorListFalg: false,
            colorListName: "gridButtonBorderOne",
            boxType: "boxGrid"
        });

    }
    btnListView = () => {
        this.setState({
            colorListFalg: true,
            colorListName: this.state.colorListFalg ? "gridButtonBorderOne_active" : "",
            colorGridFalg: false,
            colorGridName: "gridButtonBorderTwo",
            boxType: "boxList"
        });

    }
    render() {
        const { store } = this.props;

        if (this.state.isFetching) {
            return <div><h1 className="loading"> Loading  <BootIcon.ArrowClockwise /></h1></div>
        }
        if (!this.state.isFetching) {
            return (
                <React.Fragment>
                    <div>

                        <select className="drp" onChange={this.onChangeSorting} defaultValue="">
                            <option value="">Select value to Sort</option>
                            <option value="name">name</option>
                            <option value="id">Shipment id</option>
                            <option value="total">Total</option>
                        </select>
                        <input
                            type="text"
                            name="text"
                            id="text" value={this.state.shipmentID}
                            placeholder="Search by Shipment id"
                            onChange={this.onChangeSearchTxt}
                        />
                        <p className="floatLeft">Total Items: {Total_Items}</p>
                        <div>
                            <button className={`${this.state.colorListName} gridButtonBorderOne btnClass`} onClick={this.btnListView}>
                                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet"
                                    height="1em" width="1em" viewBox="0 0 16 16"
                                    className="imageAlign">
                                    <title>List</title><g>
                                        <path d="M0,3 L0,1 L2,1 L2,3 L0,3 Z M0,7 L0,5 L2,5 L2,7 L0,7 Z M0,11 L0,9 L2,9 L2,11 L0,11 Z M0,15 L0,13 L2,13 L2,15 L0,15 Z M4,3 L4,1 L16,1 L16,3 L4,3 Z M4,7 L4,5 L16,5 L16,7 L4,7 Z M4,11 L4,9 L16,9 L16,11 L4,11 Z M4,15 L4,13 L16,13 L16,15 L4,15 Z">
                                        </path></g></svg>
                            </button>
                        </div>
                        <div >
                            <button className={`${this.state.colorGridName} gridButtonBorderTwo btnClass`} onClick={this.btnGridView}>
                                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 16 16" className="imageAlign" ><title>Grid</title>
                                    <g><path d="M1,3.80447821 L1,1 L3.80447821,1 L3.80447821,3.80447821 L1,3.80447821 Z M6.5977609,3.80447821 L6.5977609,1 L9.4022391,1 L9.4022391,3.80447821 L6.5977609,3.80447821 Z M12.1955218,3.80447821 L12.1955218,1 L15,1 L15,3.80447821 L12.1955218,3.80447821 Z M1,9.4022391 L1,6.59706118 L3.80447821,6.59706118 L3.80447821,9.4022391 L1,9.4022391 Z M6.5977609,9.4022391 L6.5977609,6.5977609 L9.4022391,6.5977609 L9.4022391,9.4022391 L6.5977609,9.4022391 Z M12.1955218,9.4022391 L12.1955218,6.59706118 L15,6.59706118 L15,9.4022391 L12.1955218,9.4022391 Z M1,14.9993003 L1,12.1948221 L3.80447821,12.1948221 L3.80447821,14.9993003 L1,14.9993003 Z M6.5977609,14.9993003 L6.5977609,12.1948221 L9.4022391,12.1948221 L9.4022391,14.9993003 L6.5977609,14.9993003 Z M12.1955218,14.9993003 L12.1955218,12.1948221 L15,12.1948221 L15,14.9993003 L12.1955218,14.9993003 Z">
                                    </path></g></svg>
                            </button>
                        </div>
                    </div>
                    <PaginationItems
                        totalRecords={Total_Items}
                        pageSize={Limit_No}
                        onPageChanged={this.onPageChanged}
                        currentPage={this.state.currentPage}
                        store={this.props.store}
                    />
                    {this.loadShipmentDetails()}
                    {
                        <PaginationItems
                            totalRecords={Total_Items}
                            pageSize={Limit_No}
                            onPageChanged={this.onPageChanged}
                            currentPage={this.state.currentPage}
                            store={this.props.store}
                        />
                    }
                </React.Fragment>
            )
        }
    }

    componentDidMount() {
        this.props.store.getShipments();
        setTimeout(
            () => this.setState({ isFetching: false }),
            5000
        );
    }
}

export default ShipmentView
