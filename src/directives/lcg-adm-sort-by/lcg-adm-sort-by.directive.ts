import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';

// tslint:disable-next-line:no-duplicate-imports
// import * as $ from 'jquery';


@Directive({
  selector: '[lcgAdmSortBy]'
})
export class LcgAdmSortByDirective implements OnInit {
  natElem = this.refElem.nativeElement;

  // tslint:disable-next-line:no-input-rename
  @Input('lcgAdmSortBy') name: string;
  // tslint:disable-next-line:no-input-rename
  @Input('lcgAdmSortByText') text: string;

  @Output() changeOrder: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('style.cursor') get getCursor() {
    return 'pointer';
  }

  @HostListener('click') onClick() {
    
    const arrowPosition = this.natElem.querySelector('.sort-by-arrow-position');
    let attr = $(arrowPosition).attr('sort');
    if (!attr && this.natElem) {
      $(this.natElem.parentElement).find('[sort]').attr('sort', '');
      attr = 'asc';
    } else {
      attr = attr === 'asc' ? 'desc' : '';
    }
    $(arrowPosition).attr('sort', attr);
    this.changeOrder.emit(attr ? (`${this.name} ${attr}`) : undefined);
  }

  constructor(private refElem: ElementRef) { }

  ngOnInit(): void {
    if (this.text) {
      $(this.natElem).append(`<div class='sort-by-container'>
                <div class="sort-by-text">${this.text}</div>
                <div class="sort-by-arrow-position"></div>
            </div>`);
    } else {
      const container = $(`<div class='sort-by-container'>
                <div class="sort-by-text"></div>
                <div class="sort-by-arrow-position"></div>
            </div>`);
      container.find('.sort-by-text').append($($(this.natElem)[0].children));
      $(this.natElem).append(container);
    }
  }
}
