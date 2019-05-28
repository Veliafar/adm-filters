import { Component, ElementRef, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BaseSortAndChangePage, LcgAdmGridHeaderComponent } from './../../src/components';
import { BaseFilterResult, GridConfigModel, GridPageEvent } from './../../src/models';
import { CustomGridPage } from './../models';
import {
    I18NextModule,
} from 'angular-i18next';

@Component({
    template: `
                <div>
                    <tr>
                        <lcg-adm-grid-header 
                            [total]="total"
                            [page]="gridConfig.pageNumber"
                            [rowCount]="gridConfig.pageSize">
                        </lcg-adm-grid-header>
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

describe('GridHeaderComponent', () => {

    let headerComponent: LcgAdmGridHeaderComponent;
    let headerFixture: ComponentFixture<LcgAdmGridHeaderComponent>;
    let headerCompNativeEl: any;
    let headerCompDebugEl: DebugElement;

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
                LcgAdmGridHeaderComponent
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

        headerFixture = TestBed.createComponent(LcgAdmGridHeaderComponent);
        headerComponent = headerFixture.componentInstance;
        headerCompNativeEl = headerFixture.debugElement.nativeElement;
        headerCompDebugEl = headerFixture.debugElement;

        fixture = TestBed.createComponent(TestSortComponent);
        component = fixture.componentInstance;
        nativeEl = fixture.debugElement.nativeElement;
        debugEl = fixture.debugElement;

        

        fixture.detectChanges();
        headerFixture.detectChanges();
    });

    it(`should create instance`, () => {
        expect(headerComponent).toBeTruthy();
    });

    it(`should check binding data`, () => {
        component.total = 1;
        fixture.detectChanges();
        expect(nativeEl.querySelector('tr')).toBeTruthy();
    });

    it(`say minShowItem work & should return 42`, () => {        
        headerComponent.page = 2;
        headerComponent.rowCount = 200;

        headerFixture.detectChanges();

        let result: number = headerComponent.minShowItem;
        result = result - 159;
        expect(result).toEqual(42);
    });

    it(`say maxShowItem work & should return 42`, () => {
        headerComponent.total = 1;
        headerComponent.page = 2;
        headerComponent.rowCount = 200;

        headerFixture.detectChanges();
        
        let result: number = headerComponent.maxShowItem;
        result = result + 41;
        expect(result).toEqual(42);
    });
});