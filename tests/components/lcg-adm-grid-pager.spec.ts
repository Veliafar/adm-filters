import { Component, ElementRef, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BaseSortAndChangePage, LcgAdmGridPagerComponent } from './../../src/components';
import { BaseFilterResult, GridConfigModel, GridPageEvent } from './../../src/models';
import { CustomGridPage } from './../models';
import {
    I18NextModule,
} from 'angular-i18next';

@Component({
    template: `
                <div>
                    <tr>
                        <lcg-adm-grid-pager 
                            [total]="total" 
                            [rowsCount]="rowsCount" 
                            [(page)]="gridConfig.pageNumber"
                            [(row)]="gridConfig.pageSize" 
                            (ngChangePage)="changePage($event)">
                        </lcg-adm-grid-pager>
                    </tr>
                </div>
            `
})
class TestSortComponent extends BaseSortAndChangePage<BaseFilterResult, CustomGridPage>{
    data: CustomGridPage[] = new Array<CustomGridPage>();
    dataUnit: CustomGridPage = new CustomGridPage('1', 1, false, true);
    gridConfig: GridConfigModel = new GridConfigModel();
    rowCount = [100, 200, 300, 400, 500];
    total = 0;

    constructor() {
        super();
    }

    protected getData() {
        this.data = this.data.slice(1, 1);
        this.dataUnit.custom_claim = '2';
        this.data.push(this.dataUnit);
    }
}

export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}

describe('GridPagerComponent', () => {

    let pagerComponent: LcgAdmGridPagerComponent;
    let pagerFixture: ComponentFixture<LcgAdmGridPagerComponent>;
    let pagerCompNativeEl: any;
    let pagerCompDebugEl: DebugElement;

    let component: TestSortComponent;
    let fixture: ComponentFixture<TestSortComponent>;
    let nativeEl: any;
    let debugEl: DebugElement;

    let element: ElementRef = new MockElementRef();
    let mockSortBy: string;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                I18NextModule.forRoot()
            ],
            declarations: [
                TestSortComponent,
                LcgAdmGridPagerComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                TemplateRef,
                ViewContainerRef,
                { provide: ElementRef, useClass: new MockElementRef() },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {

        pagerFixture = TestBed.createComponent(LcgAdmGridPagerComponent);
        pagerComponent = pagerFixture.componentInstance;
        pagerCompNativeEl = pagerFixture.debugElement.nativeElement;
        pagerCompDebugEl = pagerFixture.debugElement;

        fixture = TestBed.createComponent(TestSortComponent);
        component = fixture.componentInstance;
        nativeEl = fixture.debugElement.nativeElement;
        debugEl = fixture.debugElement;

        

        fixture.detectChanges();
        pagerFixture.detectChanges();
    });

    it(`should create instance`, () => {
        expect(pagerComponent).toBeTruthy();
    });

    it(`should test onInit`, () => {
                        
        pagerComponent._total = 1;
        pagerComponent.ngOnInit();

        pagerFixture.detectChanges();

        // console.log(pagerComponent._total);
        // console.log(pagerComponent.pages);
    });

    it(`should test changeRowCount`, () => {
                        
        pagerComponent._total = 100;
        pagerComponent.generatePages();

        pagerFixture.detectChanges();


        console.log(pagerComponent.pages);
    });

    // it(`should check binding data`, () => {
    //     component.total = 1;
    //     fixture.detectChanges();
    //     expect(nativeEl.querySelector('tr')).toBeTruthy();
    // });

    // it(`say minShowItem work & should return 42`, () => {        
    //     pagerComponent.page = 2;
    //     pagerComponent.rowCount = 200;

    //     pagerFixture.detectChanges();

    //     let result: number = pagerComponent.minShowItem;
    //     result = result - 159;
    //     expect(result).toEqual(42);
    // });

    // it(`say maxShowItem work & should return 42`, () => {
    //     pagerComponent.total = 1;
    //     pagerComponent.page = 2;
    //     pagerComponent.rowCount = 200;

    //     pagerFixture.detectChanges();
        
    //     let result: number = pagerComponent.maxShowItem;
    //     result = result + 41;
    //     expect(result).toEqual(42);
    // });
});