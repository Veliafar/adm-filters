import { Component, Input } from '@angular/core';

@Component({
    selector: 'lcg-adm-grid-header',
    templateUrl: './lcg-adm-grid-header.component.html'
})
export class LcgAdmGridHeaderComponent {

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
