import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';
import * as $ from 'jquery';

import { LcgAdmGridPagerComponent } from './components/table-pager/lcg-adm-grid-pager.component';
import { LcgAdmGridHeaderComponent } from './components/table-header/lcg-adm-grid-header.component';
import { LcgAdmSortByDirective } from './directives/lcg-adm-sort-by/lcg-adm-sort-by.directive';

@NgModule({
  declarations: [LcgAdmGridPagerComponent, LcgAdmGridHeaderComponent, LcgAdmSortByDirective],
  imports     : [CommonModule, I18NextModule],
  exports     : [LcgAdmGridPagerComponent, LcgAdmGridHeaderComponent],
})

export class LcgAdmGridModule {}
