import { Component, ElementRef, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LcgAdmSortByDirective } from './../../src/directives';
import { BaseSortAndChangePage, LcgAdmGridHeaderComponent } from './../../src/components';
import { BaseFilterResult, GridConfigModel, GridPageEvent } from './../../src/models';
import { CustomGridPage } from './../models';
import { CommonModule } from '@angular/common';
// import {
//     I18NextModule,
//     I18NextTitle,
//     ITranslationService,
//     I18NEXT_SERVICE
// } from 'angular-i18next';
// import { I18NextErrorInterceptorModule } from 'angular-i18next-error-interceptor';
// import { API_SERIALIZER, SimplyApiModule } from 'angular-simply-api';
// import { ValidationMessageModule } from 'angular-validation-message';
// import { I18NextValidationMessageModule } from 'angular-validation-message-i18next';


// import { I18NextModule } from 'angular-i18next';
// import * as I18nextProvider from '../providers/i18next.provider';

// @Component({
//     selector: 'lcg-adm-grid-header',
//     templateUrl: './lcg-adm-grid-header.component.html'
// })
// class LcgAdmGridHeaderComponent {
//     // data: CustomGridPage[] = new Array<CustomGridPage>();
//     gridConfig: GridConfigModel = new GridConfigModel();
//     // dataUnit: CustomGridPage = new CustomGridPage('1', 1, false, true);

//     total: number = 0;
//     rowsCount = [100, 200, 300, 400, 500];

//     constructor() {
//     }
// }

export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}

describe('LcgAdmGridHeaderComponent', () => {

    let headerComponent: LcgAdmGridHeaderComponent;
    let headerFixture: ComponentFixture<LcgAdmGridHeaderComponent>;

    // let component: TestSortComponent;
    // let fixture: ComponentFixture<TestSortComponent>;


    // let compNativeEl: any;
    // let compDebugEl: DebugElement;

    let headerCompNativeEl: any;
    let headerCompDebugEl: DebugElement;



    let element: ElementRef = new MockElementRef();
    let mockSortBy: string;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
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
        headerComponent.rowCount = [100, 200, 300, 400, 500];
        headerComponent.total = 0;
    });


    // beforeEach( async (() => {
    //     TestBed.configureTestingModule({
    //         declarations: [
    //             TestSortComponent,
    //             LcgAdmGridHeaderComponent
    //         ],
    //         schemas: [NO_ERRORS_SCHEMA],
    //         providers: [
    //             TemplateRef,
    //             ViewContainerRef,
    //             { provide: ElementRef, useClass: new MockElementRef() },
    //         ]
    //     }).compileComponents();
    // }));

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(TestSortComponent);
    //     component = fixture.componentInstance;
    //     compNativeEl = fixture.debugElement.nativeElement;
    //     compDebugEl = fixture.debugElement;

    //     headerFixture = TestBed.createComponent(LcgAdmGridHeaderComponent);
    //     headerComponent = headerFixture.componentInstance;
    //     headerCompNativeEl = fixture.debugElement.nativeElement;
    //     headerCompDebugEl = fixture.debugElement;

    //     component.dataUnit.custom_claim = '1';
    //     component.data.push(component.dataUnit);
    // });

    it(`should create instance`, () => {
        expect(headerComponent).toBeTruthy();
        // expect(headerComponent).toBeTruthy();
    });

    // it('should show content initially', () => {
    //     fixture.detectChanges();
    //     expect(fixture.nativeElement.children.length).not.toBe(0);
    // });

    // it('should run changeOrder', () => {

    //     directive.name = 'ModifiedOn';
    //     mockSortBy = `${directive.name} asc`;

    //     component.changeSortOrder(mockSortBy);
    //     expect(component.gridConfig.sortBy).toEqual(mockSortBy);
    //     // check getData work in changeSortOrder method
    //     expect(component.data[0].custom_claim).toEqual('2');
    // });

    // it('should run changePage', () => {

    //     const mockGridConfig: GridPageEvent = new GridPageEvent(1, 100);
    //     mockGridConfig.page = 2, mockGridConfig.count = 200;

    //     component.changePage(mockGridConfig);
    //     expect(component.gridConfig.pageNumber).toEqual(mockGridConfig.page);
    //     // check getData work in changePage method
    //     expect(component.data[0].custom_claim).toEqual('2');
    // });
});



// import { Component, Input } from '@angular/core';

// @Component({
//     selector: 'lcg-adm-grid-header',
//     templateUrl: './lcg-adm-grid-header.component.html'
// })
// export class LcgAdmGridHeaderComponent {

//     @Input() total: number;
//     @Input() rowCount;
//     @Input() page;

//     get minShowItem(): number {
//         return this.rowCount * (this.page - 1) + 1;
//     }

//     get maxShowItem(): number {
//         return this.rowCount * this.page < this.total ?
//             (this.rowCount * this.page) :
//             this.total;
//     }
// }
