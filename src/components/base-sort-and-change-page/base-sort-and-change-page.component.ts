import { GridConfigModel, BaseFilterResult } from './../../models';

export abstract class BaseSortAndChangePage<T extends BaseFilterResult, A> {

    gridConfig: GridConfigModel = new GridConfigModel();
    data: Array<A> = [];
    // dataWithFilter: T;

    constructor(
    ) {}

    protected abstract getData();

    public changeSortOrder(event) {
        if (!event) { 
            return;
        }
        this.gridConfig.sortBy = event;
        if (this.data.length) {
            this.getData();
        }
    }

    public changePage(event) {
        if (!event) {
            return;
        }
        this.gridConfig.pageNumber = event.page;
        this.gridConfig.pageSize = event.count;
        this.getData();
    }    
}
