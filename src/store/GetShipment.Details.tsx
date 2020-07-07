import { action, computed, observable } from 'mobx';

import _UrlInstance from '../config/ServiceConfigURL';
import { IShipment } from '../interfaces/IShipmentDetailView.Interface';

export class GetShipmentDetails {
    @observable isLoading: boolean = true;
    @observable shipment: IShipment[] = [];
    @observable shipmentName: string = '';

    @action
    async getShipmentDetails(shipmentId: string) {
        const response = await _UrlInstance.get(`/shipments/${shipmentId}`);
        this.setShipment([response.data]);
        this.setShipmentName(response.data.name);
        this.setLoading(false);
    }

    @action
    setLoading(loading: boolean) {
        this.isLoading = loading;
    }

    @action
    setShipment(shipment: IShipment[]) {
        this.shipment = shipment;
    }

    @action
    async updateshipmentName(name: string, shipmentId: string) {
        const response = await _UrlInstance.patch(`/shipments/${shipmentId}`, { name });
        this.setShipmentName(response.data.name);
    }

    @action
    setShipmentName(name: string) {
        this.shipmentName = name;
    }
}

export const getShipmentDetails = new GetShipmentDetails();
