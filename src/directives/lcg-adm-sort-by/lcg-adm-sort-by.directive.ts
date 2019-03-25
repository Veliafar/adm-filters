import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[lcgAdmSortBy]'
})
export class LcgAdmSortByDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('lcgAdmSortBy') name: string;
  // tslint:disable-next-line:no-input-rename
  @Input('lcgAdmSortByText') text: string;

  @Output() changeOrder: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('style.cursor') get getCursor() {
    return 'pointer';
  }

  @HostListener('click') onClick() {
    const arrowPosition = $(this.element.nativeElement).find('.sort-by-arrow-position');
    let attr = $(arrowPosition).attr('sort');
    if (!attr) {
      $(this.element.nativeElement.parentElement).find('[sort]').attr('sort', '');
      attr = 'asc';
    } else {
      attr = attr === 'asc' ? 'desc' : '';
    }
    $(arrowPosition).attr('sort', attr);
    this.changeOrder.emit(attr ? (`${this.name} ${attr}`) : undefined);
  }

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    if (this.text) {
      $(this.element.nativeElement).append(`<div class='sort-by-container'>
                <div class="sort-by-text">${this.text}</div>
                <div class="sort-by-arrow-position"></div>
            </div>`);
    } else {
      const container = $(`<div class='sort-by-container'>
                <div class="sort-by-text"></div>
                <div class="sort-by-arrow-position"></div>
            </div>`);
      container.find('.sort-by-text').append($($(this.element.nativeElement)[0].children));
      $(this.element.nativeElement).append(container);
    }
  }
}
