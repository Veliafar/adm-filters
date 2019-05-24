import { Component, ElementRef, Input, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LcgAdmSortByDirective } from './../../src/directives';
import { BaseSortAndChangePage } from './../../src/components';
import { BaseFilterResult } from './../../src/models';


// tslint:disable-next-line:no-duplicate-imports
declare var $: any;

@Component({
    template: `
                <div>
                    <tr>
                        <th 
                            lcgAdmSortBy="ModifiedOn"
                            [lcgAdmSortByText]="'ModifiedOff'"
                            (changeOrder)="changeSortOrder($event)"
                        >
                            content
                        </th>
                    </tr>
                </div>
            `
})
class TestSortComponent extends BaseSortAndChangePage<BaseFilterResult, []>{
    constructor() {
        super();
    }

    protected getData() {
        console.log(this.gridConfig);
    }
}

function testClick(nativeEl: DebugElement) {
    const arrowPosition = nativeEl.nativeElement.querySelector('.sort-by-arrow-position');
    let attr = $(arrowPosition).attr('sort');

    if (!attr) {
        $(nativeEl.nativeElement.parentElement).find('[sort]').attr('sort', '');
        attr = 'asc';
    }

    $(arrowPosition).attr('sort', attr);
}

export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}

describe('BaseSortAndChangePage', () => {
    let directive: LcgAdmSortByDirective;
    let element: ElementRef = new MockElementRef();
    let component: TestSortComponent;
    let fixture: ComponentFixture<TestSortComponent>;
    let nativeEl: any;
    let debugEl: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LcgAdmSortByDirective,
                TestSortComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                TemplateRef,
                ViewContainerRef,
                { provide: ElementRef, useClass: new MockElementRef() },
            ]
        });
        fixture = TestBed.createComponent(TestSortComponent);
        component = fixture.componentInstance;
        component = fixture.componentInstance;
        nativeEl = fixture.debugElement.nativeElement;
        debugEl = fixture.debugElement;
        directive = new LcgAdmSortByDirective(element);
    });

    it(`should create instance`, () => {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
    });

    it('should show content initially', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.children.length).not.toBe(0);
    });

    // it('should directive content initially', () => {
    //     fixture.detectChanges();
    //     const sort = nativeEl.querySelector('.sort-by-text');
    //     expect(sort).toBeTruthy();
    //     const sortText = nativeEl.querySelector('.sort-by-text').innerHTML;
    //     expect(sortText).toEqual('ModifiedOff');

    // });

    // it(`should change sort attr type from undefined to asc`, () => {
    //     fixture.detectChanges();

    //     testClick(debugEl);

    //     // const arrowPosition = nativeEl.querySelector('.sort-by-arrow-position');
    //     // let attr = $(arrowPosition).attr('sort');

    //     // if (!attr) {
    //     //     $(nativeEl.parentElement).find('[sort]').attr('sort', '');
    //     //     attr = 'asc';
    //     // }

    //     // $(arrowPosition).attr('sort', attr);

    //     const emptySortByArrow = $(nativeEl).find('.sort-by-arrow-position').attr('');
    //     expect(emptySortByArrow).toEqual(undefined);

    //     const sortByArrow = $(nativeEl).find('.sort-by-arrow-position').attr('sort');
    //     expect(sortByArrow).toEqual('asc');
    // });

    // it('should emit attr and name to component changeOrder', () => {
    //     fixture.detectChanges();

    //     spyOn(directive.changeOrder, 'emit');

    //     testClick(debugEl);

    //     // const arrowPosition = nativeEl.querySelector('.sort-by-arrow-position');
    //     // let attr = $(arrowPosition).attr('sort');

    //     // if (!attr) {
    //     //     $(nativeEl.parentElement).find('[sort]').attr('sort', '');
    //     //     attr = 'asc';
    //     // }
    //     // $(arrowPosition).attr('sort', attr);

    //     let attr = $(nativeEl.querySelector('.sort-by-arrow-position')).attr('sort');


    //     directive.changeOrder.emit(attr ? (`${directive.name} ${attr}`) : undefined);
    //     expect(directive.changeOrder.emit).toHaveBeenCalled();
    //     expect(directive.changeOrder.emit).toHaveBeenCalledWith(`${directive.name} ${attr}`);
    // });
});


// // import { GridConfigModel, BaseFilterResult } from './../../models';

// // export abstract class BaseSortAndChangePage<T extends BaseFilterResult, A> {

// //     gridConfig: GridConfigModel = new GridConfigModel();
// //     data: Array<A> = [];
// //     // dataWithFilter: T;

// //     constructor(
// //     ) {}

// //     protected abstract getData();

// //     public changeSortOrder(event) {
// //         if (!event) { 
// //             return;
// //         }
// //         this.gridConfig.sortBy = event;
// //         if (this.data.length) {
// //             this.getData();
// //         }
// //     }

// //     public changePage(event) {
// //         if (!event) {
// //             return;
// //         }
// //         this.gridConfig.pageNumber = event.page;
// //         this.gridConfig.pageSize = event.count;
// //         this.getData();
// //     }


// // }
