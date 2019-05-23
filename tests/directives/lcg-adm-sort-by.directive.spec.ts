import { Component, ElementRef, Input, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef } from '@angular/core';
import { Directive, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LcgAdmSortByDirective } from './../../src/directives';
import * as $ from 'jquery';


@Component({
    template: `
                <div>
                    <tr>
                        <th 
                            lcgAdmSortBy="ModifiedOn"
                            [lcgAdmSortByText]="'SmsAndEmailsDate'"
                            
                        >
                            content
                        </th>
                    </tr>
                </div>
            `
            // (changeOrder)="changeSortOrder($event)"
})
class TestSortComponent {
    // @Input() prop = '';
}

export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}



describe('LcgAdmSortByDirective', () => {
    let directive: LcgAdmSortByDirective;
    let nativeEl: any;
    // let name: string = '';
    // let text: string = '';
    let element: ElementRef = new MockElementRef();
    let component: TestSortComponent;
    let fixture: ComponentFixture<TestSortComponent>;

    // const authServiceStub: Partial<AuthService<User>> = {
    //     authorize: function (claim: string | string[] = null) {
    //         return !!claim;
    //     }
    // };

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
                {provide: ElementRef, useClass: new MockElementRef()},
                // {
                //     provide: AUTH_SERVICE,
                //     useValue: authServiceStub
                // }
            ]
        });
        fixture = TestBed.createComponent(TestSortComponent);
        component = fixture.componentInstance;
        nativeEl = fixture.debugElement.nativeElement;
        directive = new LcgAdmSortByDirective(element);

        
        
    });

    it(`should create instance`, () => {
        expect(directive).toBeTruthy();
    });

    it('should show content initially', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.children.length).not.toBe(0);
    });

    it('should directive content initially', () => {
        fixture.detectChanges();
        const sort = nativeEl.querySelector('.sort-by-text');
        expect(sort).toBeTruthy();
        const sortText = nativeEl.querySelector('.sort-by-text').innerHTML;
        expect(sortText).toEqual('SmsAndEmailsDate');
        
    });

    it(`should change sotr attr type from '' to asc`, () => {
        fixture.detectChanges();
        // directive.ngOnInit();
        // fixture.detectChanges();        
        
        // directive.ngOnInit();
        directive.onClick();
        fixture.detectChanges();
        // const sortText = nativeEl.querySelector('.sort-by-text').innerHTML;
        // expect(sortText).toEqual('SmsAndEmailsDate');
        // expect(sort.).toEqual('SmsAndEmailsDate');
        // const sortByArrow = $(nativeEl).find('.sort-by-arrow-position').attr('sort');
        // expect(sortByArrow).toEqual('asc');
    });

    // it('should show/hide content dynamically', () => {
    //     component.prop = 'value';
    //     fixture.detectChanges();
    //     expect(fixture.nativeElement.innerHTML).not.toBe('');
    //     component.prop = '';
    //     fixture.detectChanges();
    //     expect(fixture.nativeElement.children.length).toBe(0);
    // });

});
