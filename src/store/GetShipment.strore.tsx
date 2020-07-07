import { action, computed, observable } from 'mobx';
import _UrlInstance from '../config/ServiceConfigURL';
import { IShipment } from '../interfaces/IShipmentDetailView.Interface';

export class GetShipmentstrore {
  @computed get totalNumberOfShipments() {
    return this.shipments.length;
  }

  @observable shipments: IShipment[] = [];
  @observable filteredShipments: IShipment[] = [];
  @observable isDataLoad: boolean = true;
  @observable searchQuery?: string;

  @action
  async getShipments(page: number = 1, limit: number = 20) {
    // this.setLoading(true);
    const response = await _UrlInstance.get(
      `/shipments?_page=${page}&_limit=${limit}`,
    );

    const mappedShipments = response.data.map((details: IShipment) => {
      return {
        ...details,
        total: Number(details.total),
      };
    });
    this.setShipments(mappedShipments);
    // this.setDataLoading(false);
  }

  @action
  setShipments(shipments: IShipment[]) {
    this.shipments = shipments;
  }

  @action
  setDataLoading(loading: boolean) {
    this.isDataLoad = loading;
  }

  @action
  setFilteredShipments(filteredShipments: IShipment[]) {
    this.filteredShipments = filteredShipments;
  }

  @action
  searchShipments(query: string) {
    this.searchQuery = query;
    if (query) {
      const filteredShipments = this.shipments.filter(item => {
        return item.id.toLowerCase().search(query.toLowerCase()) !== -1;
      });
      this.setFilteredShipments(filteredShipments);
    } else {
      this.setFilteredShipments(this.shipments);
    }




    // this.setFilteredShipments(filteredShipments);
  }

  @action
  sortShipments(sortByField: string) {
    let colName = sortByField

    const sortedShipments = this.shipments.slice().sort((a, b) => {
      debugger;

      if (colName === "id") {
        if (a.id > b.id) {
          return -1;
        }
        if (a.id < b.id) {
          return 1;
        }
      } else if (colName === "name") {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
      }
      else if (colName === "total") {
        if (a.total > b.total) {
          return -1;
        }
        if (a.total < b.total) {
          return 1;
        }
      }
      return 0;
    });

    this.setShipments(sortedShipments);
  }
}

export const getShipmentstrore = new GetShipmentstrore();
