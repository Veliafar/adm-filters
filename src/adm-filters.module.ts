import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';

import { TablePagerComponent } from './components/table-pager/table-pager.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { AdmFilterDirectivesModule } from './directives/adm-filter.directive';

@NgModule({
  declarations: [TablePagerComponent, TableHeaderComponent],
  imports     : [CommonModule, I18NextModule, AdmFilterDirectivesModule],
  exports     : [TablePagerComponent, TableHeaderComponent, AdmFilterDirectivesModule],
})

export class AdmFiltersModule {}
