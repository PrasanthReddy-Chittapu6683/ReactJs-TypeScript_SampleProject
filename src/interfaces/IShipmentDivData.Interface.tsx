import { IService } from "./IShipmentDetailView.Interface";

export interface IShipmentDivDataInterface {
    id: string;
    name: string;
    cargoLength: number;
    total: number;
    origin: string;
    boxType: string;
    services: IService[];
    status: string

}