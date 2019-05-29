import { Component, ElementRef, Input, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LcgAdmSortByDirective } from './../../src/directives';

import * as _$ from 'jquery';
const $ = (_$ as any).default || _$;

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
class TestSortComponent {
    @Input() changeOrder = '';
    
}
export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}

describe('SortByDirective', () => {
    let directive: LcgAdmSortByDirective;
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
                ViewContainerRef
            ]
        });
        fixture = TestBed.createComponent(TestSortComponent);
        component = fixture.componentInstance;
        nativeEl = fixture.debugElement.nativeElement;
        debugEl  = fixture.debugElement;
        directive = new LcgAdmSortByDirective(fixture.debugElement);

        fixture.detectChanges();
    });

    it(`should create instance`, () => {
        expect(directive).toBeTruthy();
    });

    it('should show content initially', () => {        
        expect(fixture.nativeElement.children.length).not.toBe(0);
    });

    it('should directive content initially', () => {        
        const sort = nativeEl.querySelector('.sort-by-text');
        expect(sort).toBeTruthy();
        const sortText = nativeEl.querySelector('.sort-by-text').innerHTML;
        expect(sortText).toEqual('ModifiedOff');

    });

    it(`should change sort attr type from undefined to asc`, () => {
        

        directive.onClick();
        fixture.detectChanges();    

        const emptySortByArrow = $(nativeEl).find('.sort-by-arrow-position').attr('');
        expect(emptySortByArrow).toEqual(undefined);

        const sortByArrow = $(nativeEl).find('.sort-by-arrow-position').attr('sort');
        expect(sortByArrow).toEqual('asc');
    });

    it(`should emit 'ModifiedOn asc' and name to component changeOrder`, async() => {        

        spyOn(directive.changeOrder, 'emit');

        directive.name = 'ModifiedOn';

        directive.onClick();
        fixture.detectChanges();
        fixture.whenStable().then( () => {
            expect(directive.changeOrder.emit).toHaveBeenCalled();
            expect(directive.changeOrder.emit).toHaveBeenCalledWith(`ModifiedOn asc`);
        });        
    });
});
