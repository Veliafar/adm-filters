import { TableConfigModel, BaseFilterResult } from './../../models';

export abstract class BaseSortAndChangePage<T extends BaseFilterResult, A> {

    tableConfig: TableConfigModel = new TableConfigModel();
    data: Array<A> = [];
    // dataWithFilter: T;

    constructor(
    ) {}

    protected abstract getData();

    public changeSortOrder(event) {
        if (!event) { 
            return;
        }
        this.tableConfig.sortBy = event;
        if (this.data.length) {
            this.getData();
        }
    }

    public changePage(event) {
        if (!event) {
            return;
        }
        this.tableConfig.pageNumber = event.page;
        this.tableConfig.pageSize = event.count;
        this.getData();
    }

    
}
