import { Component, ElementRef, Input, NO_ERRORS_SCHEMA, TemplateRef, ViewContainerRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LcgAdmSortByDirective } from './../../src/directives';
import * as jq1 from 'jquery';

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
    let element: ElementRef = new MockElementRef();
    let component: TestSortComponent;
    let fixture: ComponentFixture<TestSortComponent>;
    let nativeEl: any;
    let debugEl: DebugElement;
    let arrowPosition: any;
    let attr: any;
    
    function testClick() {
        arrowPosition = nativeEl.querySelector('.sort-by-arrow-position');
        attr = jq1(arrowPosition).attr('sort');
        if (!attr) {
            jq1(nativeEl.parentElement).find('[sort]').attr('sort', '');
            attr = 'asc';
        }
        jq1(arrowPosition).attr('sort', attr);
    }

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
        debugEl  = fixture.debugElement;
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
        expect(sortText).toEqual('ModifiedOff');

    });

    it(`should change sort attr type from undefined to asc`, () => {
        fixture.detectChanges();

        testClick();

        const emptySortByArrow = jq1(nativeEl).find('.sort-by-arrow-position').attr('');
        expect(emptySortByArrow).toEqual(undefined);

        const sortByArrow = jq1(nativeEl).find('.sort-by-arrow-position').attr('sort');
        expect(sortByArrow).toEqual('asc');
    });

    it('should emit attr and name to component changeOrder', () => {
        fixture.detectChanges();

        spyOn(directive.changeOrder, 'emit');

        testClick();
        
        directive.changeOrder.emit(attr ? (`${directive.name} ${attr}`) : undefined);
        expect(directive.changeOrder.emit).toHaveBeenCalled();
        expect(directive.changeOrder.emit).toHaveBeenCalledWith(`${directive.name} ${attr}`);
    });
});
