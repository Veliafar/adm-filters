import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';

import { TablePagerComponent } from './components/table-pager/table-pager.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { SortDirectivesModule } from './directives/directives';

@NgModule({
  declarations: [TablePagerComponent, TableHeaderComponent],
  imports     : [CommonModule, I18NextModule, SortDirectivesModule],
  exports     : [TablePagerComponent, TableHeaderComponent, SortDirectivesModule],
})

export class AdmFiltersModule {}
