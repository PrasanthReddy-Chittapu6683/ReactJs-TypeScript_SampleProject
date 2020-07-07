import { GetShipmentstrore } from "../store/GetShipment.strore";
import { GetShipmentDetails } from "../store/GetShipment.Details";

export interface IService {
    type: string;
    value?: string;

}
export interface ICargo {
    type: string;
    description: string;
    volume: string;
}
export interface IShipment {
    id: string;
    name: string;
    cargo: ICargo[];
    mode: string;
    type: string;
    destination: string;
    origin: string;
    services: IService[];
    total: number;
    status: string;
    userId: string;
}
export interface IShipmentsProps {
    store: GetShipmentstrore;
}
export interface IShipmentDetailsProps {
    store: GetShipmentDetails;
    match: {
        isExact: boolean;
        params: {
            shipmentId: string;
        };
        path: string;
        url: string;
    };
}

export interface IShipmentDetailsState {
    isShowing: boolean;
    shipmentName: string;
    isFetching: boolean;
}