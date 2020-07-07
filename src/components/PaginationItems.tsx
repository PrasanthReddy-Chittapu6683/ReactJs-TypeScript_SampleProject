import * as React from 'react';
import { IPaginationProps, IPaginationState } from '../interfaces/IPagination.Interface';
import { range, uniqueId } from 'lodash';
import "../styles/css/PaginationItems.css";

class PaginationItems extends React.Component<IPaginationProps, IPaginationState> {
    constructor(props: IPaginationProps) {
        super(props)

        this.state = {
            currentPage: 0,
            pageCount: 0,
        }
    }
    componentDidMount() {
        this.setState({
            currentPage: this.props.currentPage,
            pageCount: Math.ceil(this.props.totalRecords / this.props.pageSize),
        });
    }

    handlePageChange = (page: number) => {
        const { onPageChanged } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.state.pageCount));

        const paginationData = {
            currentPage,
            totalPages: this.state.pageCount,
            pageLimit: this.props.pageSize,
            totalRecords: this.props.totalRecords,
        };

        this.setState({ currentPage }, () => onPageChanged(paginationData));
    };

    createControls() {
        const pageCount = this.state.pageCount;
        const numberOfPages = range(1, pageCount + 1);
        return numberOfPages.map(pageNumber => {
            const baseClassName = 'pagetile-controls__button';
            const activeClassName =
                pageNumber === this.state.currentPage ? `${baseClassName}--active` : '';
            return (
                <div
                    key={uniqueId()}
                    className={`${baseClassName} ${activeClassName}`}
                    onClick={() => this.handlePageChange(pageNumber)}>
                    {pageNumber}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="pagination">
                <div className="pagetile-controls">{this.createControls()}</div>
               
            </div>
        );
    }
}
export default PaginationItems;