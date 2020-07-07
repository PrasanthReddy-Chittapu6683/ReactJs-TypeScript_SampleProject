import { GetShipmentstrore } from '../store/GetShipment.strore';

export interface IPaginationProps {
    onPageChanged: (paginationData: IPaginationData) => void;
    pageSize: number;
    totalRecords: number;
    currentPage: number;
    store: GetShipmentstrore;
}
export interface IPaginationData {
    totalRecords: number;
    currentPage: number;
    pageLimit: number;
    totalPages: number;
}

export interface IPaginationState {
    pageCount: number;
    currentPage: number;
}


