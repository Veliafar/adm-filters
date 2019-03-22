import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-table-header',
    templateUrl: './table-header.component.html'
})
export class TableHeaderComponent {

    @Input() total: number;
    @Input() rowCount;
    @Input() page;

    get minShowItem(): number {
        return this.rowCount * (this.page - 1) + 1;
    }

    get maxShowItem(): number {
        return this.rowCount * this.page < this.total ?
            (this.rowCount * this.page) :
            this.total;
    }
}
