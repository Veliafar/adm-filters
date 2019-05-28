import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { GridPageEvent, GridPage } from '../../models';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'lcg-adm-grid-pager',
    template: `
                <div class="col-xs-12">
                <div class="pull-left">
                    <ul class="pagination">
                        <li *ngFor="let count of rowsCount" [ngClass]="{'active': count === currentRow$.getValue()}" (click)="changeRowCount(count)">
                            <a href="javascript:void(0)"> {{ count }}</a>
                        </li>
                    </ul>
                </div>
                <div class="pull-right">
                        <ul class="pagination">
                            <li *ngFor="let page of pages" [ngClass]="{'active': page.active, 'disabled': page.disabled}" (click)="page.disabled || setPage(page.number)">
                                <a href="javascript:void(0)"> {{ page.name }} </a>
                            </li>
                        </ul>
                    </div>
                </div>
            `
})
export class LcgAdmGridPagerComponent implements OnInit, OnDestroy {
    rowsCount$: BehaviorSubject<Array<number>>;
    totalPages$: BehaviorSubject<number>;
    paginationMinBlocks$: BehaviorSubject<number>;
    paginationMaxBlocks$: BehaviorSubject<number>;
    currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    currentRow$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    ngUnsubscribe: Subject<void> = new Subject<void>();
    pages: Array<GridPage> = [];
    _total: number;

    @Output() ngChangePage: EventEmitter<GridPageEvent> = new EventEmitter<GridPageEvent>(true);
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(true);
    @Output() rowChange: EventEmitter<number> = new EventEmitter<number>(true);

    @Input() set paginationMinBlocks(value) {
        this.paginationMinBlocks$.next(value);
    }
    get paginationMinBlocks() {
        return this.paginationMinBlocks$.getValue();
    }

    @Input() set paginationMaxBlocks(value) {
        this.paginationMaxBlocks$.next(value);
    }
    get paginationMaxBlocks() {
        return this.paginationMaxBlocks$.getValue();
    }

    @Input() set rowsCount(value) {
        this.rowsCount$.next(value ? value : [10, 25, 50, 100]);
    }
    get rowsCount() {
        return this.rowsCount$.getValue();
    }

    @Input() set page(value: number) {
        this.currentPage$.next(value ? value : 1);
    }

    @Input() set row(value: number) {
        this.currentRow$.next(value ? value : this.rowsCount$.getValue()[0]);
    }

    @Input() set total(value) {
        this._total = value;
        this.totalPages$.next(Math.ceil(value / this.currentRow$.getValue()));
    }

    constructor() {
        this.rowsCount$ = new BehaviorSubject<Array<number>>([10, 25, 50, 100]);
        this.totalPages$ = new BehaviorSubject<number>(0);
        this.paginationMinBlocks$ = new BehaviorSubject<number>(5);
        this.paginationMaxBlocks$ = new BehaviorSubject<number>(10);
    }

    ngOnInit() {
        const self = this;
        this.rowsCount$.pipe(
          takeUntil(self.ngUnsubscribe)
        ).subscribe(counts => {
                if (counts && counts.length > 0) {
                    self.currentRow$.next(counts[0]);
                    self.currentPage$.next(1);
                }
            });

        this.paginationMinBlocks$.pipe(
          takeUntil(self.ngUnsubscribe)
        ).subscribe(() => self.generatePages());
        this.paginationMaxBlocks$.pipe(
          takeUntil(self.ngUnsubscribe)
        ).subscribe(() => self.generatePages());
        this.totalPages$.pipe(
          takeUntil(self.ngUnsubscribe)
        ).subscribe(() => self.generatePages());

        this.currentPage$.pipe(
          takeUntil(self.ngUnsubscribe)
        ).subscribe((value: number) => {
                this.pageChange.emit(value);
            });

        this.currentRow$.pipe(
          takeUntil(self.ngUnsubscribe)
        ).subscribe((value: number) => {
                this.totalPages$.next(Math.ceil(this._total / value));
                this.rowChange.emit(value);
            });

        this.generatePages();
    }

    changeRowCount(count: number) {
        if (count !== this.currentRow$.getValue()) {
            this.currentRow$.next(count);
            this.currentPage$.next(1);
            this.generatePages();
            this.ngChangePage.emit(new GridPageEvent(
                this.currentPage$.getValue(),
                this.currentRow$.getValue()
            ));
        }
    }

    setPage(page: number) {
        if (page !== this.currentPage$.getValue()) {
            this.currentPage$.next(page);
            this.generatePages();

            this.ngChangePage.emit(new GridPageEvent(
                this.currentPage$.getValue(),
                this.currentRow$.getValue()
            ));
        }
    }

    generatePages() {
        const currentPage = this.currentPage$.getValue();
        const pageSize = this.currentRow$.getValue();
        const totalItems = this.totalPages$.getValue();

        let maxPage, maxPivotPages, minPage, numPages, maxBlocks;
        maxBlocks = this.paginationMaxBlocks;
        maxBlocks = maxBlocks && (maxBlocks < this.paginationMinBlocks) ? this.paginationMinBlocks : maxBlocks;

        numPages = totalItems;
        this.pages = [];
        if (numPages > 1) {
            this.pages.push(new GridPage('<<', Math.max(1, currentPage - 1), currentPage === 1, false));
            this.pages.push(new GridPage('1', 1, false, currentPage === 1));

            maxPivotPages = Math.round((this.paginationMaxBlocks - this.paginationMinBlocks) / 2);
            minPage = Math.max(2, currentPage - maxPivotPages);
            maxPage = Math.min(numPages - 1, currentPage + maxPivotPages * 2 - (currentPage - minPage));
            minPage = Math.max(2, minPage - (maxPivotPages * 2 - (maxPage - minPage)));
            let i = minPage;
            while (i <= maxPage) {
                if ((i === minPage && i !== 2) || (i === maxPage && i !== numPages - 1)) {
                    this.pages.push(new GridPage('...', i, false, false));
                } else {
                    this.pages.push(new GridPage(i, i, currentPage === i, currentPage === i));
                }
                i++;
            }

            this.pages.push(new GridPage(numPages, numPages, currentPage === numPages, currentPage === numPages));
            this.pages.push(new GridPage('>>', Math.min(numPages, currentPage + 1), currentPage === numPages, false));
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
