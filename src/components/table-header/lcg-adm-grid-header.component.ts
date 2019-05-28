import { Component, Input } from '@angular/core';

@Component({
    selector: 'lcg-adm-grid-header',
    // templateUrl: './lcg-adm-grid-header.component.html',
    template: `
                    <div class="row">
                        <div class="col-xs-4 col-xs-offset-4" *ngIf="total">      
                            <p class="text-center form-control-static"  
                                [textContent]=" 'common:pager.currentFilter' | i18nextCap: { min: minShowItem, max: maxShowItem, all: total }">
                            </p>                  
                        </div>
                    </div>
                `
    // styleUrls: ['./lcg-adm-grid-header.component.css']
    
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
