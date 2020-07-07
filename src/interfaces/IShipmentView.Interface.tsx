import { GetShipmentstrore } from '../store/GetShipment.strore'

export interface IShipmentState {
    currentPage: number;
    isFetching: boolean;
    colorGridFalg: boolean;
    colorGridName: string;
    colorListFalg: boolean;
    colorListName: string;
    boxType: string;
    shipmentID: string;
    services: [];
    status: string;
}

export interface IShipmentProps {
    store: GetShipmentstrore;
}