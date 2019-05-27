import { Component, ElementRef, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LcgAdmSortByDirective } from './../../src/directives';
import { BaseSortAndChangePage } from './../../src/components';
import { BaseFilterResult, GridConfigModel, GridPageEvent } from './../../src/models';
import { CustomGridPage } from './../models';

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
class TestSortComponent extends BaseSortAndChangePage<BaseFilterResult, CustomGridPage>{
    data: CustomGridPage[] = new Array<CustomGridPage>();
    gridConfig: GridConfigModel = new GridConfigModel();
    dataUnit: CustomGridPage = new CustomGridPage('1', 1, false, true);

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

describe('BaseSortAndChangePage', () => {

    let directive: LcgAdmSortByDirective;
    let element: ElementRef = new MockElementRef();
    let component: TestSortComponent;
    let fixture: ComponentFixture<TestSortComponent>;
    let nativeEl: any;
    let debugEl: DebugElement;
    let mockSortBy: string;


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
        nativeEl = fixture.debugElement.nativeElement;
        debugEl = fixture.debugElement;
        directive = new LcgAdmSortByDirective(element);

        component.dataUnit.custom_claim = '1';
        component.data.push(component.dataUnit);
    });

    it(`should create instance`, () => {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
    });

    it('should show content initially', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.children.length).not.toBe(0);
    });

    it('should run changeOrder', () => {

        directive.name = 'ModifiedOn';
        mockSortBy = `${directive.name} asc`;

        component.changeSortOrder(mockSortBy);
        expect(component.gridConfig.sortBy).toEqual(mockSortBy);
        // check getData work in changeSortOrder method
        expect(component.data[0].custom_claim).toEqual('2');
    });

    it('should run changePage', () => {

        const mockGridConfig: GridPageEvent = new GridPageEvent(1, 100);
        mockGridConfig.page = 2, mockGridConfig.count = 200;

        component.changePage(mockGridConfig);
        expect(component.gridConfig.pageNumber).toEqual(mockGridConfig.page);
        // check getData work in changePage method
        expect(component.data[0].custom_claim).toEqual('2');
    });
});

